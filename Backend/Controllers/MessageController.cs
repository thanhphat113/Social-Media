using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class MessageController : ControllerBase
	{
		private readonly MessageService _mess;
		private readonly MainTopicService _main;

		public MessageController(MessageService mess, MainTopicService main)
		{
			_main = main;
			_mess = mess;
		}


		[HttpGet]
		public async Task<IActionResult> Get([FromQuery] int id)
		{
			Console.WriteLine("Đây là: " + id);
			var UserId = GetCookie.GetUserIdFromCookie(Request);
			Console.WriteLine("Đây là: " + UserId);
			var result = await _mess.FindBy2User(UserId, id);
			// result.MainTopicNavigation = await _main.GetById((int)result.MainTopic);
			// Console.WriteLine("Đây là: " + result.MainTopicNavigation.TopicName);
			return Ok(result);
		}

		[HttpPost]
		public void Post([FromBody] string value)
		{
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