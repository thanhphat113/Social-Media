using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class HistorySearchController : ControllerBase
	{
		private readonly HistorySearchService _service;
		public HistorySearchController(HistorySearchService service)
		{
			_service = service;
		}

		[HttpGet]
		public async Task<ActionResult> Get([FromQuery] int userid)
		{
			var result = await _service.GetHistorySearchByUserId(userid);
			return Ok(result);
		}


		[HttpPost]
		public async Task<ActionResult> Post([FromBody] HistorySearch value)
		{
			var userId = GetCookie.GetUserIdFromCookie(Request);
			if (await _service.Add(value))
			{
				return await Get(userId);
			}
			return null;
		}

		[HttpPut("{id}")]
		public void Put(int id, [FromBody] string value)
		{
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> Delete(int id)
		{
			var userId = GetCookie.GetUserIdFromCookie(Request);
			if (await _service.Delete(id))
			{
				return await Get(userId);
			}
			return null;
		}
	}
}