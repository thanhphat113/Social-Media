using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Services.Interface
{
	public interface IHistorySearchService : IService<HistorySearch>
	{
		Task<IEnumerable<Object>> GetHistorySearchByUserId(int userid);
		Task<bool> UpdateTime(int historyid);
	}
}