using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories;

namespace Backend.Services.Interface
{
	public interface IUserRepository : IService<User>
	{
		public Task<bool> IsHasEmail(string email);
		public Task<IEnumerable<User>> GetListFriends(int condition);
		public Task<User> FindToLogin(string email, string password);

		public Task<IEnumerable<Object>> GetUsersByName(string name);
		public Task<IEnumerable<User>> GetFriendByName(int userid, string name);
	}
}