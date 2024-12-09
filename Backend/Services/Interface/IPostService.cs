using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Services.Interface
{
	public interface IPostService : IService<Post>
	{
		Task<dynamic> GetFriendPostsByUserId(int UserId, int OffSet, int Limit);

	}
}