using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.Repository
{
	public class RequestNotiRepository : IRequestRepository
	{
		private readonly SocialMediaContext _context;
		public RequestNotiRepository(SocialMediaContext context)
		{
			_context = context;
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
			return await _context.RequestNotifications
					.Where(u => u.ToUserId == id)
					.Select(u => new
					{
						u.FromUser.UserId,
						u.FromUser.LastName,
						u.FromUser.FirstName,
						u.FromUser.GenderId,
						u.FromUser.ProfilePicture,
						u.IsRead
					})
					.ToListAsync();
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