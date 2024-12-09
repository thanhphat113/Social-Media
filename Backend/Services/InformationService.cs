using Backend.Models;
using Backend.Services.Interface;
using Backend.Authentication;
using Backend.Repositories.Interface;
using Backend.Services;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Backend.Data;
using Backend.DTO;
using Microsoft.EntityFrameworkCore;
using System.Linq;



namespace Backend.Services
{
    public class InformationService
    {
        private readonly JwtToken _jwtToken;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unit;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly SocialMediaContext _context;

        public InformationService(IUnitOfWork unit, JwtToken jwtToken, IMapper mapper, IHttpContextAccessor httpContextAccessor,  SocialMediaContext context)
        {
            _mapper = mapper;
            _unit = unit;
            _jwtToken = jwtToken;
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }
        

        public async Task<bool> Update(User value)
        {
            try
            {
                
                if (!string.IsNullOrEmpty(value.Email) && !IsValidEmail(value.Email))
                {
                    throw new InvalidOperationException("Email không đúng định dạng.");
                }

                
                var existingUser = await _unit.Users.GetByIdAsync(value.UserId); 
                if (existingUser == null)
                {
                    throw new KeyNotFoundException("Không tìm thấy người dùng.");
                }
            

                _unit.Users.UpdateAsync(value); // Gọi phương thức UpdateAsync từ repository
                await _unit.CompleteAsync(); // Lưu thay đổi vào cơ sở dữ liệu
                return true; // Trả về true nếu thành công
            }
            catch (Exception ex)
            {
                // Ghi log hoặc xử lý ngoại lệ tại đây nếu cần
                Console.WriteLine($"Đã xảy ra lỗi: {ex.Message}");
                return false; // Trả về false nếu có lỗi
            }
        }



// Hàm kiểm tra định dạng email
public bool IsValidEmail(string email)
        {
            var emailRegex = new System.Text.RegularExpressions.Regex(
                @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
                System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            return emailRegex.IsMatch(email);
        }

        
        public async Task<bool> ChangePassword(int userId, ChangePasswordDto changePasswordDto)
        {
            try
            {
                var user = await _unit.Users.GetByIdAsync(userId);
                if (user == null)
                {
                    throw new Exception("User not found.");
                }

                // Kiểm tra mật khẩu hiện tại
                var passwordHasher = new PasswordHasher<User>();

                // Kiểm tra mật khẩu mới và xác nhận mật khẩu mới có khớp không
                if (changePasswordDto.NewPassword != changePasswordDto.ConfirmPassword)
                {
                    throw new Exception("New password and confirm password do not match.");
                }

                // Hash mật khẩu mới trước khi lưu vào cơ sở dữ liệu
                var result = passwordHasher.VerifyHashedPassword(user, user.Password, changePasswordDto.CurrentPassword);
                if (result == PasswordVerificationResult.Failed)
                {
                    return false; // Mật khẩu hiện tại không chính xác
                }
                user.Password = passwordHasher.HashPassword(user, changePasswordDto.NewPassword);
                // Cập nhật người dùng với mật khẩu mới
                _unit.Users.UpdateAsync(user);
                await _unit.CompleteAsync();

                return true;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi (log, hoặc throw exception nếu cần)
                throw new Exception("An error occurred while changing password", ex);
            }
        }



        

       
        public async Task<bool> HasEmail(string email)
        {
            // Kiểm tra xem email đã tồn tại trong hệ thống chưa
            var existingUser = await _unit.Users.FindAsync<User>(query => query.Where(u => u.Email == email));

        
            return existingUser.Any(); // Trả về true nếu tìm thấy user với email đã tồn tại
        }

        

        public async Task<User> GetById(int id)
        {
            try
            {
                // Gọi phương thức GetByIdAsync từ GenericRepository để lấy thông tin người dùng
                var user = await _unit.Users.GetByIdAsync(id);

                if (user == null)
                {
                    // Nếu không tìm thấy người dùng, trả về null hoặc ném exception tùy theo logic của bạn
                    return null;
                }

                return user;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi, ví dụ log hoặc throw exception nếu cần
                throw new Exception("An error occurred while fetching user", ex);
            }
        }
        
        public async Task<IEnumerable<UserPrivate>> GetFriends(int id)
        {
            // var users = await _unit.Relationship.FindAsync<User>(predicate, selector);
            var users = await _unit.Relationship.FindAsync<UserPrivate>(query =>
                query.Where(r =>
                        (r.FromUserId == id || r.ToUserId == id) &&
                        r.TypeRelationship == 2)
                    .Include(r => r.FromUser)
                    .Include(r => r.ToUser)
                    .Select(r => r.FromUserId == id ? r.ToUser : r.FromUser)
                    .ProjectTo<UserPrivate>(_mapper.ConfigurationProvider));

            foreach (var item in users)
            {
                var MediaIsProfile = await _unit.Post.GetByConditionAsync<Media>(query => query
                    .Where(p => p.CreatedByUserId == item.UserId && p.IsPictureProfile == true)
                    .SelectMany(p => p.Medias));

                if (MediaIsProfile != null)
                {
                    MediaIsProfile.Src = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}/media/{MediaIsProfile.Src}";

                    item.ProfilePicture = MediaIsProfile;
                }
            }

            var withChat = await FriendsWithChat(id, users);

            var result = withChat.Select(user => _mapper.Map<UserPrivate>(user));

            return result;
        }
        
        public async Task<IEnumerable<UserPrivate>> FriendsWithChat(int UserId, IEnumerable<UserPrivate> friends)
        {
            foreach (var item in friends)
            {
                var mess = (ICollection<ChatInMessage>)await _unit.Message.FindAsync(query => query
                    .Where(m =>
                        (m.User1 == item.UserId && m.User2 == UserId) ||
                        (m.User1 == UserId && m.User2 == item.UserId)).Include(m => m.ChatInMessages)
                    .ThenInclude(c => c.Media)
                    .SelectMany(m => m.ChatInMessages));

                foreach (var x in mess)
                {
                    if (x.Media == null) continue;
                    string type = (x.Media.MediaType == 1 || x.Media.MediaType == 2) ? "media" : "file";
                    if (!x.Media.Src.StartsWith($"{_httpContextAccessor.HttpContext.Request.Scheme}://"))
                    {
                        x.Media.Src = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}/{type}/{x.Media.Src}";
                    }
                }

                item.ChatInMessages = mess;
            }
            return friends;
        }
        
        public async Task<IEnumerable<UserPrivate>> GetFollowers(int id)
        {
            // Lấy danh sách người dùng là follower (FromUser)
            var users = await _unit.Relationship.FindAsync<UserPrivate>(query =>
                query.Where(r =>
                        r.ToUserId == id && // Người dùng hiện tại được follow
                        r.TypeRelationship == 1) // Quan hệ kiểu follower
                    .Include(r => r.FromUser) // Chỉ cần FromUser
                    .Select(r => r.FromUser) // Chọn thông tin của FromUser
                    .ProjectTo<UserPrivate>(_mapper.ConfigurationProvider));

            foreach (var item in users)
            {
                var MediaIsProfile = await _unit.Post.GetByConditionAsync<Media>(query => query
                    .Where(p => p.CreatedByUserId == item.UserId && p.IsPictureProfile == true)
                    .SelectMany(p => p.Medias));

                if (MediaIsProfile != null)
                {
                    MediaIsProfile.Src = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}/media/{MediaIsProfile.Src}";

                    item.ProfilePicture = MediaIsProfile;
                }
            }

            var withChat = await FriendsWithChat(id, users);

            var result = withChat.Select(user => _mapper.Map<UserPrivate>(user));

            return result;
        }
        
        public async Task<IEnumerable<Media>> GetAllMediaByUserIdAsync(int userId)
        {
            try
            {
                // Lấy tất cả Media liên quan đến các bài viết của người dùng
                var mediaList = await _unit.Post.FindAsync<Media>(query =>
                    query.Where(post => post.CreatedByUserId == userId) // Lọc bài viết theo userId
                        .SelectMany(post => post.Medias));            // Lấy danh sách Media liên kết

                // Cập nhật đường dẫn đầy đủ cho các Media (nếu cần thiết)
                var baseUrl = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}/media/";
                foreach (var media in mediaList)
                {
                    media.Src = $"{baseUrl}{media.Src}";
                }

                return mediaList;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi, ví dụ log hoặc throw exception nếu cần
                throw new Exception("Đã xảy ra lỗi khi lấy danh sách ảnh của người dùng", ex);
            }
        }
        

        

        

    }

}