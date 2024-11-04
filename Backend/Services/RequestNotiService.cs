using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;

namespace Backend.Services
{
	public class RequestNotiService : IRequestRepository
	{
		private readonly IRequestRepository _Repo;
		public RequestNotiService(IRequestRepository Repo)
		{
			_Repo = Repo;
		}

		public Task<bool> Add(RequestNotification product)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Delete(int id)
		{
			throw new NotImplementedException();
		}

		public async Task<IEnumerable<Object>> FindByUserId(int id)
		{
			try
			{
				return await _Repo.FindByUserId(id);
			}
			catch
			{
				return null;
			}
		}

		public Task<IEnumerable<RequestNotification>> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<RequestNotification> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<RequestNotification>> GetListByType(int condition, string type)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(RequestNotification product)
		{
			throw new NotImplementedException();
		}
	}
}