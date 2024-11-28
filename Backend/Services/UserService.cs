using Backend.Models;
using Backend.Services.Interface;
using Backend.Authentication;
using Backend.Repositories.Interface;
using Backend.Services;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Identity;
using AutoMapper;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private readonly JwtToken _jwtToken;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unit;

        public UserService(IUnitOfWork unit, JwtToken jwtToken, IMapper mapper)
        {
            _mapper = mapper;
            _unit = unit;
            _jwtToken = jwtToken;
        }
        public async Task<User> Add(User value)
        {
            try
            {
                await _unit.Users.AddAsync(value);
                if (await _unit.CompleteAsync())
                {
                    return value;
                }
                throw new ArgumentException("Thêm vào database không thành công");
            }
            catch (System.Exception ex)
            {
                throw new Exception("Thêm sản phẩm không thành công.", ex);
            }
        }

        public Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<User>> FriendsWithChat(int UserId, IEnumerable<User> friends)
        {
            foreach (var item in friends)
            {
                var predicate = (Expression<Func<Message, bool>>)(m =>
                (m.User1 == item.UserId && m.User2 == UserId) ||
                (m.User1 == UserId && m.User2 == item.UserId));
                var selector = (Expression<Func<Message, IEnumerable<ChatInMessage>>>)
                            (m => m.ChatInMessages);
                var mess = (ICollection<ChatInMessage>)await _unit.Message.FindAsyncMany(predicate, selector);


                item.ChatInMessages = mess;
            }


            return friends;
        }

        public Task<IEnumerable<User>> GetAll()
        {
            return _unit.Users.GetAll();
        }

        public async Task<UserLogin> GetLoginById(int id)
        {
            var item = await _unit.Users.GetByIdAsync(id);
            return _mapper.Map<UserLogin>(item);
        }

        public Task<IEnumerable<User>> GetListById(int id)
        {
            throw new NotImplementedException();
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
                // Console.WriteLine($"existingUser.Email: {existingUser.Email}");
                // Console.WriteLine($"value.Email: {value.Email}");


                // if (!string.Equals(existingUser.Email.Trim(), value.Email.Trim(), StringComparison.OrdinalIgnoreCase)) 
                // {
                //     var isEmailTaken = await _unit.Users.GetByConditionAsync(u => u.Email == value.Email);
                //     Console.WriteLine(isEmailTaken);
                //     if (isEmailTaken != null) 
                //     {
                //         throw new InvalidOperationException("Email này đã được sử dụng.");
                //     }
                // }


                await _unit.Users.UpdateAsync(value); // Gọi phương thức UpdateAsync từ repository
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
        private bool IsValidEmail(string email)
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
                await _unit.Users.UpdateAsync(user);
                await _unit.CompleteAsync();

                return true;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi (log, hoặc throw exception nếu cần)
                throw new Exception("An error occurred while changing password", ex);
            }
        }



        public async Task<IEnumerable<UserPrivate>> GetFriends(int id)
        {
            var predicate = (Expression<Func<Relationship, bool>>)(r =>
            (r.FromUserId == id || r.ToUserId == id) && r.TypeRelationship == 2);
            var selector = (Expression<Func<Relationship, User>>)
                    (r => r.FromUserId == id ? r.ToUser : r.FromUser);

            var users = await _unit.Relationship.FindAsync<User>(predicate, selector);

            foreach (var item in users)
            {
                var UserMedia = await _unit.UserMedia.GetByConditionAsync(u => u.UserId == item.UserId && u.IsProfilePicture == true);
                if (UserMedia == null)
                {
                    continue;
                };

                var profilePicture = await _unit.Media.GetByConditionAsync(m => m.MediaId == UserMedia.MediaId);

                item.ProfilePicture = profilePicture;
            }

            var withChat = await FriendsWithChat(id, users);

            var result = withChat.Select(user => _mapper.Map<UserPrivate>(user));

            return result;
        }
        public async Task<IEnumerable<UserPrivate>> GetFollowers(int id)
        {
            var predicate = (Expression<Func<Relationship, bool>>)(r =>
                r.ToUserId == id && r.TypeRelationship == 1);  // Sửa lại điều kiện để ToUserId là người được theo dõi

            var selector = (Expression<Func<Relationship, User>>)
                (r => r.FromUserId == id ? r.ToUser : r.FromUser);

            var users = await _unit.Relationship.FindAsync<User>(predicate, selector);

            foreach (var item in users)
            {
                var UserMedia = await _unit.UserMedia.GetByConditionAsync(u => u.UserId == item.UserId && u.IsProfilePicture == true);
                if (UserMedia == null)
                {
                    continue;
                };

                var profilePicture = await _unit.Media.GetByConditionAsync(m => m.MediaId == UserMedia.MediaId);

                item.ProfilePicture = profilePicture;
            }

            var withChat = await FriendsWithChat(id, users);

            var result = withChat.Select(user => _mapper.Map<UserPrivate>(user));

            return result;
        }


        public async Task<string> FindToLogin(string email, string password)
        {
            var user = await _unit.Users.GetByConditionAsync(u => u.Email == email);

            if (user == null) return null;

            var passHasher = new PasswordHasher<User>();
            var passwordVerificationResult = passHasher.VerifyHashedPassword(user, user.Password, password);

            if (passwordVerificationResult == PasswordVerificationResult.Success)
            {
                return _jwtToken.GenerateJwtToken(user.UserId.ToString());
            }
            else
            {
                return null;
            }
        }
        public async Task<bool> HasEmail(string email)
        {
            // Kiểm tra xem email đã tồn tại trong hệ thống chưa
            var existingUser = await _unit.Users.FindAsync<User>(u => u.Email == email);
        
            return existingUser.Any(); // Trả về true nếu tìm thấy user với email đã tồn tại
        }

        public async Task<ValidateEmail> IsHasEmail(string email)
        {
            if (!email.EndsWith("@gmail.com") && !email.EndsWith("@gmail.com.vn"))
                return new ValidateEmail("Email phải có đuôi là @gmail.com hoặc @gmail.com.vn", false);
            if (string.IsNullOrEmpty(email))
                return new ValidateEmail("Vui lòng nhập email", false);

            var item = await _unit.Users.GetByConditionAsync(u => u.Email == email);

            if (item != null)
                return new ValidateEmail("Email này đã được đăng ký vui lòng nhập lại", false);

            return new ValidateEmail("Email hợp lệ", true);
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
        public async Task<IEnumerable<UserPrivate>> GetListByName(string name, int UserId)
        {
            var users = await _unit.Users.FindAsync<User>(u => u.UserId != UserId &&
                    (u.LastName.Contains(name) || u.FirstName.Contains(name)));
            var result = _mapper.Map<IEnumerable<UserPrivate>>(users);
            return result;
        }
    }

}