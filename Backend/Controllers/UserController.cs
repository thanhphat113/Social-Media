using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Backend.Helper;
using Microsoft.AspNetCore.Authorization;
using Backend.Models;
using Backend.Services;
using Backend.Services.Interface;
using Backend.RealTime;


namespace Backend.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{

		private readonly IUserService _userContext;
		private readonly IPostService _post;

		private readonly MediaService _media;

		private readonly INotificationsService _NotiContext;
		private readonly PostNotiService _PostContext;

		public UserController(IPostService post, MediaService media, IUserService UserContext, INotificationsService NotiContext, PostNotiService PostContext)
		{
			_media = media;
			_post = post;
			_userContext = UserContext;
			_NotiContext = NotiContext;
			_PostContext = PostContext;
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{
			return Ok(await _userContext.GetAll());
		}

		[HttpGet("followers")]
		public async Task<IActionResult> GetFollower()
		{
			var UserId = MiddleWare.GetUserIdFromCookie(Request);
			return Ok(await _userContext.GetFollower(UserId));
		}

		// [HttpGet("friends-by-name")]
		// public async Task<IActionResult> GetFriendsByName([FromQuery] string name)
		// {
		// 	var UserId = MiddleWare.GetUserIdFromCookie(Request);
		// 	try
		// 	{
		// 		var friends = await _userContext.GetFriendsByName(UserId, name);
		// 		foreach (var item in friends)
		// 		{
		// 			item.ChatInMessages = await _detailmess.GetMessage(UserId, item.UserId);
		// 		}
		// 		return Ok(friends);
		// 	}
		// 	catch (System.Exception ex)
		// 	{
		// 		return BadRequest("Lỗi: " + ex);
		// 		throw;
		// 	}
		// }


		[HttpGet("user-login")]
		public async Task<IActionResult?> FindById()
		{
			var userId = MiddleWare.GetUserIdFromCookie(Request);
			if (userId == -1) return null;

			var information = await _userContext.GetLoginById(userId);
			var friends = await _userContext.GetFriends(userId);

			foreach (var item in friends)
			{
				if (OnlineHub.IsOnline(item.UserId)) item.IsOnline = true;
			}

			var requests = await _NotiContext.FindByUserId(userId);
			// var media = await _media.FindProfilePictureByUserId(userId);
			var postrequests = await _PostContext.FindByUserId(userId);
			return Ok(new { information = information, friends = friends, requests = requests, postrequests = postrequests });
		}

		[AllowAnonymous]
		[HttpPost]
		public async Task<IActionResult> Put([FromBody] User user)
		{
			user.GenderId ??= 0;
			return Ok(new { result = await _userContext.Add(user) });
		}

		[HttpGet("users-by-name")]
		public async Task<IActionResult> GetListByName([FromQuery] string name)
		{
			var UserId = MiddleWare.GetUserIdFromCookie(Request);
			var list = await _userContext.GetListByName(name, UserId);
			return Ok(list);
		}


		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}

		// [HttpGet("GetUserProfile/{id}")]
		// public async Task<IActionResult> GetUserProfile(int id)
		// {
		// 	var rs = await _userContext.GetUserProfile(id);
		// 	return Ok(rs);
		// }

		// [HttpPut("UpdateProfilePicture")]
		// public async Task<IActionResult> UpdateProfilePicture([FromForm] RequestUpdatePicture data)
		// {
		// 	var rs = await _userContext.UpdateProfilePicture(data.userId, data.mediaId, data.file);
		// 	return Ok(rs);
		// }

		// [HttpPut("UpdateCoverPicture")]
		// public async Task<IActionResult> UpdateCoverPicture([FromForm] RequestUpdatePicture data)
		// {
		//     var rs = await _userContext.UpdateCoverPicture(data.userId, data.mediaId, data.file);
		//     return Ok(rs);
		// }

		// [HttpPost("AddFriend")]
		// public async Task<IActionResult> AddFriend(int toUserId)
		// {
		// 	var fromUserId = MiddleWare.GetUserIdFromCookie(Request);
		// 	var rs = await _userContext.AddFriend(fromUserId, toUserId);
		// 	return Ok(rs);
		// }

		// [HttpPost("AcceptFriend")]
		// public async Task<IActionResult> AcceptFriend(int fromUserId)
		// {
		// 	var toUserId = MiddleWare.GetUserIdFromCookie(Request);
		// 	var rs = await _userContext.AcceptFriend(fromUserId, toUserId);
		// 	return Ok(rs);
		// }

		// [HttpPost("DeleteFriend")]
		// public async Task<IActionResult> DeleteFriend(int user2)
		// {
		// 	var user1 = MiddleWare.GetUserIdFromCookie(Request);
		// 	var rs = await _userContext.DeleteFriend(user1, user2);
		// 	return Ok(rs);
		// }
	}

	public class RequestUpdatePicture
	{
		public int userId { get; set; }
		public int mediaId { get; set; }
		public IFormFile? file { get; set; }
	}
}