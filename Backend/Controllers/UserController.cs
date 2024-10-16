using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Backend.Repositories;
using Backend.Services;

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