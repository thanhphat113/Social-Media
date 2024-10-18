using Backend.Models;
using Backend.Repositories;
using Backend.Authentication;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Backend.Services
{
    public class UserService : IService<User>
    {
		private readonly JwtToken _jwtToken;
		private readonly UserRepositories _userRepo;

		public UserService(UserRepositories repo, JwtToken jwtToken){
			_userRepo = repo;
			_jwtToken = jwtToken;
		}
        public async Task<string> Add(User product)
        {
			if (await _userRepo.Add(product)){
				return "Đăng ký tài khoản thành công";
			}
				return "Đăng ký thất bại thất bại";
        }

        public Task<string> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<User>> GetAll()
        {
            return _userRepo.GetAll();
        }

        public async Task<User> GetById(int id)
        {
            return await _userRepo.GetById(id);
        }

        public Task<List<User>> GetListById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<string> Update(User product)
        {
            throw new NotImplementedException();
        }

		public async Task<string> FindToLogin(string email, string password){
			var user = await _userRepo.FindToLogin(email, password);
			if (user != null){
				return _jwtToken.GenerateJwtToken(user.UserId.ToString());
			}
			return null;
		}

		public async Task<ValidateEmail> isHasEmail(string email){
            if (!email.EndsWith("@gmail.com") && !email.EndsWith("@gmail.com.vn"))
            return new ValidateEmail("Email phải có đuôi là @gmail.com hoặc @gmail.com.vn", false );
			if (string.IsNullOrEmpty(email)) 
			return new ValidateEmail("Vui lòng nhập email", false );
			if (await _userRepo.isHasEmail(email))
			return new ValidateEmail("Email này đã được đăng ký vui lòng nhập lại", false );
			
			return new ValidateEmail("Email hợp lệ", true );
		}
    }

}