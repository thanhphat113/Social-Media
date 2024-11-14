using Backend.Models;
using Backend.Services.Interface;
using Backend.Authentication;
using Backend.Repositories.Interface;
using Backend.Services;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Identity;
using Backend.AutoMapper;
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

        public async Task<IEnumerable<UserPrivate>> FriendsWithChat(int UserId, IEnumerable<User> friends)
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
            var result = friends.Select(user => _mapper.Map<UserPrivate>(user));
            return result;
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
            var result = users.Select(user => _mapper.Map<UserPrivate>(user));

            var withChat = await FriendsWithChat(id, users);
            return withChat;
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

        public Task<User> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Object>> GetListByName(string name)
        {
            var users = await _unit.Users.FindAsync(u =>
                    u.LastName.Contains(name) || u.FirstName.Contains(name), u => new
                    {
                        u.UserId,
                        u.LastName,
                        u.FirstName,
                        u.ProfilePicture,
                        u.GenderId
                    });
            return users;
        }
    }

}