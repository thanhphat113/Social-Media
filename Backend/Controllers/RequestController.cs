using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[Route("[controller]")]
	[ApiController]
	[Authorize]
	public class RequestController : ControllerBase
	{
		private readonly RequestNotiService _NotiContext;

		public RequestController(RequestNotiService NotiContext)
		{
			_NotiContext = NotiContext;
		}

		[HttpGet]
		public async Task<ActionResult> Get([FromQuery] int id)
		{
			var token = Request.Cookies["Security"];

			if (string.IsNullOrEmpty(token))
			{
				return Ok(null);
			}

			var tokenHandler = new JwtSecurityTokenHandler();
			var jwtToken = tokenHandler.ReadJwtToken(token);
			var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
			var requests = await _NotiContext.FindByUserId(int.Parse(userId));
			return Ok(requests);
		}

	}
}