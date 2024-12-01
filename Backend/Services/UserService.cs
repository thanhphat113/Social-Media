using Backend.Models;
using Backend.DTO;
using Backend.Services.Interface;
using Backend.Authentication;
using Backend.Repositories.Interface;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private readonly JwtToken _jwtToken;
        private readonly IHttpContextAccessor _httpContextAccessor;

        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unit;

        public UserService(IUnitOfWork unit, JwtToken jwtToken, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _unit = unit;
            _jwtToken = jwtToken;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<User> Add(User value)
        {
            try
            {
                var passHasher = new PasswordHasher<User>();
                value.Password = passHasher.HashPassword(value, value.Password);
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

        public Task<IEnumerable<User>> GetAll()
        {
            return _unit.Users.GetAll();
        }

        public async Task<UserLogin> GetLoginById(int id)
        {
            var item = await _unit.Users.GetByIdAsync(id);

            var result = _mapper.Map<UserLogin>(item);

            var MediaIsProfile = await _unit.Post.GetByConditionAsync<Media>(query => query
                            .Where(p => p.CreatedByUserId == item.UserId && p.IsPictureProfile == true)
                            .SelectMany(p => p.Medias));

            if (MediaIsProfile != null)
            {
                MediaIsProfile.Src = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}/media/{MediaIsProfile.Src}";

                result.ProfilePicture = MediaIsProfile;
            }
            return result;
        }

        public Task<IEnumerable<User>> GetListById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(User value)
        {
            throw new NotImplementedException();
        }


        public async Task<IEnumerable<UserPrivate>> GetFriends(int id)
        {
            var predicate = (Expression<Func<Relationship, bool>>)(r =>
            (r.FromUserId == id || r.ToUserId == id) && r.TypeRelationship == 2);
            var selector = (Expression<Func<Relationship, User>>)
                    (r => r.FromUserId == id ? r.ToUser : r.FromUser);

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

        public async Task<string> FindToLogin(string email, string password)
        {
            var user = await _unit.Users.GetByConditionAsync<User>(query => query.Where(u => u.Email == email));

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

        public async Task<ValidateEmail> IsHasEmail(string email)
        {
            if (!email.EndsWith("@gmail.com") && !email.EndsWith("@gmail.com.vn"))
                return new ValidateEmail("Email phải có đuôi là @gmail.com hoặc @gmail.com.vn", false);
            if (string.IsNullOrEmpty(email))
                return new ValidateEmail("Vui lòng nhập email", false);

            var item = await _unit.Users.GetByConditionAsync<User>(query => query.Where(u => u.Email == email));

            if (item != null)
                return new ValidateEmail("Email này đã được đăng ký vui lòng nhập lại", false);

            return new ValidateEmail("Email hợp lệ", true);
        }

        public Task<User> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<UserPrivate>> GetListByName(string name, int UserId)
        {
            var result = await _unit.Users.FindAsync<UserPrivate>(query => query
                                .Where(u => u.UserId != UserId &&
                                (u.LastName.Contains(name) ||
                                u.FirstName.Contains(name)))
                                .ProjectTo<UserPrivate>(_mapper.ConfigurationProvider));
            return result;
        }
    }

}