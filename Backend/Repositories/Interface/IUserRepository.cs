using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories;

namespace Backend.Repositories.Interface
{
	public interface IUserRepository : IRepository<User>
	{
		public Task<bool> IsHasEmail(string email);
		public Task<IEnumerable<User>> GetListFriends(int condition);
		public Task<User> FindToLogin(string email, string password);
		public Task<IEnumerable<UserPrivate>> GetUsersByName(string name);
	}
}