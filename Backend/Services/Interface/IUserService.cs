using Backend.DTO;
using Backend.Models;

namespace Backend.Services.Interface
{
	public interface IUserService : IService<User>
	{
		Task<ValidateEmail> IsHasEmail(string email);
		Task<IEnumerable<UserPrivate>> GetFriends(int id);
		Task<string> FindToLogin(string email, string password);
		Task<UserLogin> GetLoginById(int id);
		Task<IEnumerable<UserPrivate>> GetListByName(string name, int UserId);
	}
}