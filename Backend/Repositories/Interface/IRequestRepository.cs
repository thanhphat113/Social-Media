using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Repositories.Interface
{
	public interface IRequestRepository : IRepository<RequestNotification>
	{
		Task<IEnumerable<Object>> FindByUserId(int id);
	}
}