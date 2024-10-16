using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Repositories;
using Backend.Services;

namespace Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class LoginController : ControllerBase
	{
		private readonly UserService _UserContext;

		public LoginController(UserService context){
			_UserContext = context;
		}

		[HttpGet]
		public ActionResult<IEnumerable<string>> Get()
		{
			return new string[] { "value1", "value2" };
		}

		[HttpGet("{id}")]
		public ActionResult<string> Get(int id)
		{
			return "value";
		}

		[HttpPost]
		public async Task<IActionResult> Login([FromBody] Login account)
		{
			var token = await _UserContext.FindToLogin(account.email, account.password);
			if (token == null)
			{
				return Ok(null);
			}

			return Ok(new {token = token});

		}

		// [HttpPost("register")]
		// public async Task<IActionResult> Register([FromBody] User userregister)
		// {

		// }

		[HttpPost("CheckEmail")]
		public async Task<IActionResult> checkEmail(string email)
		{
			return Ok(new {notification = _UserContext.isHasEmail(email)});
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