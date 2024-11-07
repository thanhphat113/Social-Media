using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Backend.Models;
using Backend.Services;

namespace Backend.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{

		private readonly UserService _userContext;
		private readonly HistorySearchService _historySearchContext;
		private readonly RequestNotiService _NotiContext;
		private readonly PostNotiService _PostContext;

		public UserController(UserService UserContext, HistorySearchService historySearchContext, RequestNotiService NotiContext, PostNotiService PostContext)
		{
			_userContext = UserContext;
			_NotiContext = NotiContext;
			_PostContext = PostContext;
			_historySearchContext = historySearchContext;
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{
			return Ok(await _userContext.GetAll());
		}


		[HttpGet("findbyid")]
		public async Task<IActionResult> FindById()
		{
			var userId = GetCookie.GetUserIdFromCookie(Request);
			if (userId == -1) return null;

			var information = await _userContext.GetById(userId);
			var friends = await _userContext.GetFriends(userId);
			var requests = await _NotiContext.FindByUserId(userId);
			var postrequests = await _PostContext.FindByUserId(userId);
			var historysearch = await _historySearchContext.GetHistorySearchByUserId(userId);
			return Ok(new { information = information, friends = friends, requests = requests, postrequests = postrequests, historysearch = historysearch });
		}

		[AllowAnonymous]
		[HttpPost]
		public async Task<IActionResult> Put([FromBody] User user)
		{
			user.GenderId ??= 0;
			return Ok(new { result = await _userContext.Add(user) });
		}

		[HttpGet("findbyname")]
		public async Task<IActionResult> GetListByName([FromQuery] string name)
		{
			return Ok(await _userContext.GetListByName(name));
		}


		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}