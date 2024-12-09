using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Helper;
using Backend.Models;
using Backend.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class PostController(IPostService post) : ControllerBase
	{
		private readonly IPostService _post = post;

		[HttpGet("by-friends")]
		public async Task<IActionResult> Get(int OffSet, int Limit)
		{
			var UserId = MiddleWare.GetUserIdFromCookie(Request);
			var result = await _post.GetFriendPostsByUserId(UserId, OffSet, Limit);
			return Ok(result);
		}

		[HttpGet("by-user")]
		public async Task<IActionResult> GetByUser()
		{
			var UserId = MiddleWare.GetUserIdFromCookie(Request);
			var result = await _post.GetListById(UserId);
			return Ok(result);
		}

		[HttpGet("{id}")]
		public ActionResult<string> Get(int id)
		{
			return "value";
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromBody] Post value)
		{
			var UserId = MiddleWare.GetUserIdFromCookie(Request);
			value.CreatedByUserId = UserId;
			return Ok(await _post.Add(value));
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