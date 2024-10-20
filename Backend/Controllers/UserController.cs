using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Backend.Models;

namespace Backend.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly ILogger<UserController> _logger;
		private readonly UserService _UserContext;

		public UserController(UserService UserContext,ILogger<UserController> logger){
			_UserContext = UserContext;
			_logger = logger;
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{
			return Ok(await _UserContext.GetAll());
		}


		[HttpGet("findbyid")]
		public async Task<IActionResult> FindById()
		{
			var token = Request.Cookies["Security"];
			if (string.IsNullOrEmpty(token))
			{
				return Unauthorized();
			}
			
			var tokenHandler = new JwtSecurityTokenHandler();

			var jwtToken = tokenHandler.ReadJwtToken(token);

			var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
			return Ok(await _UserContext.GetById(int.Parse(userId)));
		}

		[AllowAnonymous]
		[HttpPost] 
		public async Task<IActionResult> Put([FromBody] User user){
			Console.WriteLine(user.FirstName);
			return Ok(new {result = await _UserContext.Add(user)});
		}

		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}