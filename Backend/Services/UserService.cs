using Backend.Models;
using Backend.Repositories;
using Backend.Authentication;

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

		public async Task<string> isHasEmail(string email){
			if (string.IsNullOrEmpty(email)) return "Vui lòng nhập email";
			if (await _userRepo.isHasEmail(email)){
				return "Email này đã được đăng ký vui lòng nhập lại";
			}
			
			return "Email hợp lệ";
		}
    }
}