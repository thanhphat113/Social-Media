using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.Repository
{
	public class HistorySearchRepository : IHistorySearchRepository
	{
		private readonly SocialMediaContext _context;
		public HistorySearchRepository(SocialMediaContext context)
		{
			_context = context;
		}

		public async Task<bool> Add(HistorySearch value)
		{
			await _context.HistorySearches.AddAsync(value);
			var result = await _context.SaveChangesAsync();
			return result > 0;
		}

		public async Task<bool> Delete(int id)
		{
			var item = await _context.HistorySearches
					.FirstOrDefaultAsync(h => h.HistoryId == id);

			if (item == null) return false;
			_context.HistorySearches.Remove(item);

			var result = await _context.SaveChangesAsync();
			return result > 0;

		}

		public Task<IEnumerable<HistorySearch>> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<HistorySearch> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public async Task<IEnumerable<object>> GetHistorySearchByUserId(int userid)
		{
			return await _context.HistorySearches
					.Where(h => h.FromUser == userid)
					.OrderByDescending(h => h.DateSearch)
					.Select(h => new
					{
						h.HistoryId,
						h.OtherUserNavigation.UserId,
						h.OtherUserNavigation.LastName,
						h.OtherUserNavigation.FirstName,
						h.OtherUserNavigation.ProfilePicture,
						h.OtherUserNavigation.GenderId
					})
					.ToListAsync();
		}

		public Task<IEnumerable<HistorySearch>> GetListByType(int condition, string type)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(HistorySearch value)
		{
			throw new NotImplementedException();
		}
	}
}