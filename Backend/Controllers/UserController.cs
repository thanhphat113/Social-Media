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
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly UserService _UserContext;

		public UserController(UserService UserContext){
			_UserContext = UserContext;
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{
			return Ok(await _UserContext.GetAll());
		}

		[Authorize]
		[HttpGet("findbyid")]
		public async Task<IActionResult> FindById()
		{
			var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
			var tokenHandler = new JwtSecurityTokenHandler();

			var jwtToken = tokenHandler.ReadJwtToken(token);

			var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
			Console.WriteLine("đây là:" + userId);
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