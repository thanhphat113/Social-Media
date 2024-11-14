using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories;

namespace Backend.Services.Interface
{
	public interface IUserService : IService<User>
	{
		public Task<ValidateEmail> IsHasEmail(string email);
		public Task<IEnumerable<UserPrivate>> GetFriends(int id);
		public Task<string> FindToLogin(string email, string password);
		public Task<UserLogin> GetLoginById(int id);

	}
}