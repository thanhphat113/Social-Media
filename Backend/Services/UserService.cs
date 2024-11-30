using Backend.Models;
using Backend.DTO;
using Backend.Services.Interface;
using Backend.Authentication;
using Backend.Repositories.Interface;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

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

        public async Task<IEnumerable<User>> FriendsWithChat(int UserId, IEnumerable<User> friends)
        {
            foreach (var item in friends)
            {
                var predicate = (Expression<Func<Message, bool>>)(m =>
                (m.User1 == item.UserId && m.User2 == UserId) ||
                (m.User1 == UserId && m.User2 == item.UserId));
                var selector = (Func<IQueryable<Message>, IQueryable<ChatInMessage>>)(query =>
                    query.Include(m => m.ChatInMessages)
                            .ThenInclude(c => c.Media)
                            .SelectMany(m => m.ChatInMessages));
                var mess = (ICollection<ChatInMessage>)await _unit.Message.FindAsyncMany(predicate, selector);
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
            return _mapper.Map<UserLogin>(item);
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

            var users = await _unit.Relationship.FindAsync<User>(predicate, selector);

            foreach (var item in users)
            {
                var UserMedia = await _unit.UserMedia.GetByConditionAsync<UserMedia>(u => u.UserId == item.UserId && u.IsProfilePicture == true);
                if (UserMedia == null)
                {
                    continue;
                };

                var profilePicture = await _unit.Media.GetByConditionAsync<Media>(m => m.MediaId == UserMedia.MediaId);
                profilePicture.Src = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}/media/{profilePicture.Src}";

                item.ProfilePicture = profilePicture;
            }

            var withChat = await FriendsWithChat(id, users);

            var result = withChat.Select(user => _mapper.Map<UserPrivate>(user));

            return result;
        }

        public async Task<string> FindToLogin(string email, string password)
        {
            var user = await _unit.Users.GetByConditionAsync<User>(u => u.Email == email);

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

            var item = await _unit.Users.GetByConditionAsync<User>(u => u.Email == email);

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
            var users = await _unit.Users.FindAsync<User>(u => u.UserId != UserId &&
                    (u.LastName.Contains(name) || u.FirstName.Contains(name)));
            var result = _mapper.Map<IEnumerable<UserPrivate>>(users);
            return result;
        }
    }

}