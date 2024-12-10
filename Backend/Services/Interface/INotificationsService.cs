using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Services.Interface
{
	public interface INotificationsService : IService<RequestNotification>
	{
		Task<IEnumerable<Object>> FindByUserId(int userid);
		Task<dynamic> Accept(int user1, int user2);
		Task<bool> DenyRequest(int UserId, int OtherUserId);


	}
}