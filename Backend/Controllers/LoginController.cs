using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Repositories;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class LoginController : ControllerBase
	{
		private readonly IWebHostEnvironment _env;
		private readonly UserService _UserContext;

		public LoginController(UserService context, IWebHostEnvironment env){
			_UserContext = context;
			_env = env;
		}


		[HttpPost]
		public async Task<IActionResult> Login([FromBody] Login account)
		{
			var token = await _UserContext.FindToLogin(account.email, account.password);
			Console.WriteLine("Đây là trong login: "+ token);
			
			if (token == null)
			{
				return Unauthorized(new { message = "Invalid login credentials." });
			}
			Response.Cookies.Append("Security", token, new CookieOptions
			{
				HttpOnly = true,
				Secure = false,
				SameSite = SameSiteMode.Strict,
				Expires = DateTimeOffset.Now.AddMinutes(30)
			});

			return Ok(new { message = "Logged in successfully"});
		}

		[HttpGet("gettoken")]
		[Authorize]
		public IActionResult CheckAuth()
		{
			// Kiểm tra cookie 'Security'
			var token = Request.Cookies["Security"];
			if (!string.IsNullOrEmpty(token))
			{
				return Ok(new { isAuthenticated = true });
			}

			return Ok(new { isAuthenticated = false });
		}

		[HttpGet("logout")]
		[Authorize]
		public IActionResult Logout()
		{
			Response.Cookies.Delete("Security");
			return Ok(new { message = "Logged out successfully." });
		}


		[HttpPost("CheckEmail")]
		public async Task<IActionResult> checkEmail(string email)
		{
			return Ok(new {notification = _UserContext.isHasEmail(email)});
		}

	}
}