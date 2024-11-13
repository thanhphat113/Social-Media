using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;
using Backend.Services.Interface;


namespace Backend.Services
{
	public class HistorySearchService : IHistorySearchService
	{
		private readonly IUnitOfWork _unit;

		public HistorySearchService(IUnitOfWork unit)
		{
			_unit = unit;
		}
		public async Task<HistorySearch> Add(HistorySearch value)
		{
			try
			{
				var item = await _unit.HistorySearch.AddAsync(value);
				await _unit.CompleteAsync();
				return item;
			}
			catch (System.Exception ex)
			{
				Console.WriteLine("Lỗi: " + ex.Message);
				throw;
			}
		}

		public async Task<bool> Delete(int id)
		{
			try
			{
				_unit.HistorySearch.DeleteAsync(h => h.HistoryId == id);
				return await _unit.CompleteAsync();
			}
			catch (System.Exception ex)
			{
				Console.WriteLine("Lỗi: " + ex.Message);
				throw;
			}
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
			try
			{
				var items = await _unit.HistorySearch.FindAsync(h => h.FromUser == userid, h => new
				{
					h.HistoryId,
					h.OtherUserNavigation.UserId,
					h.OtherUserNavigation.LastName,
					h.OtherUserNavigation.FirstName,
					h.OtherUserNavigation.ProfilePicture,
					h.OtherUserNavigation.GenderId
				});
				return items;
			}
			catch (System.Exception)
			{
				throw;
			}
		}

		public Task<IEnumerable<HistorySearch>> GetListById(int userid)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(HistorySearch value)
		{
			throw new NotImplementedException();
		}

		public async Task<bool> UpdateTime(int historyid)
		{
			try
			{
				var item = await _unit.HistorySearch.GetByIdAsync(historyid);
				var vietnamTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
				var vietnamTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, vietnamTimeZone);

				item.DateSearch = vietnamTime;

				return await _unit.CompleteAsync();
			}
			catch (System.Exception ex)
			{
				Console.WriteLine("Lỗi: " + ex.Message);
				throw;
			}
		}
	}
}