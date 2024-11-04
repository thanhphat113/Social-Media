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
		private readonly RequestNotiService _NotiContext;

		public UserController(UserService UserContext, RequestNotiService NotiContext)
		{
			_userContext = UserContext;
			_NotiContext = NotiContext;
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{
			return Ok(await _userContext.GetAll());
		}


		[HttpGet("findbyid")]
		public async Task<IActionResult> FindById()
		{
			var token = Request.Cookies["Security"];

			if (string.IsNullOrEmpty(token))
			{
				return Ok(null);
			}

			var tokenHandler = new JwtSecurityTokenHandler();

			var jwtToken = tokenHandler.ReadJwtToken(token);

			var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
			var information = await _userContext.GetById(int.Parse(userId));
			var friends = await _userContext.GetFriends(int.Parse(userId));
			var requests = await _NotiContext.FindByUserId(int.Parse(userId));
			return Ok(new { information = information, friends = friends, requests = requests });
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