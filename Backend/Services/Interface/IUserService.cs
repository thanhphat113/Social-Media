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
		Task<UserPrivate> FindById(int id);

		Task<IEnumerable<UserPrivate>> GetListByName(string name, int UserId);
		// Task<dynamic> GetUserProfile(int userId);
		// Task<dynamic> UpdateProfilePicture(int userId, int mediaId, IFormFile? file);
		// Task<dynamic> UpdateCoverPicture(int userId, int mediaId, IFormFile? file);
		Task<dynamic> AddFriend(int fromUserId, int toUserId);
		Task<dynamic> AcceptFriend(int fromUserId, int toUserId);
		Task<dynamic> DeleteFriend(int userId1, int userId2);
	}
}