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

		public UserController(UserService UserContext)
		{
			_userContext = UserContext;
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
			return Ok(new { information = information, friends = friends });
		}

		[AllowAnonymous]
		[HttpPost]
		public async Task<IActionResult> Put([FromBody] User user)
		{
			if (user.GenderId == null)
			{
				user.GenderId = 0;
			}
			Console.WriteLine(user.GenderId);
			return Ok(new { result = await _userContext.Add(user) });
		}


		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}