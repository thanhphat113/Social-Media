using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;

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

			var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
			return Ok(await _UserContext.GetById(int.Parse(userId)));
		}


		[HttpPut("{id}")]
		public void Put(int id, [FromBody] string value)
		{
		}

		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}