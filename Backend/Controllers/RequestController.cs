using Backend.Services;
using Backend.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Backend.Services.Interface;
using Backend.RealTime;
using Microsoft.AspNetCore.SignalR;

namespace Backend.Controllers
{
	[Route("[controller]")]
	[ApiController]
	[Authorize]
	public class RequestController(IHubContext<OnlineHub> hub, INotificationsService NotiContext, IRelationshipService rela, IUserService user) : ControllerBase
	{
		private readonly INotificationsService _NotiContext = NotiContext;
		private readonly IRelationshipService _rela = rela;
		private readonly IUserService _user = user;
		private readonly IHubContext<OnlineHub> _hub = hub;


		[HttpPut]
		public async Task<ActionResult> Accept([FromQuery] int otheruser)
		{
			var userId = MiddleWare.GetUserIdFromCookie(Request);
			var sendFriend = await _user.GetUserById(userId);
			sendFriend.IsOnline = true;

			var newFriend = await _user.GetUserById(otheruser);



			var result = await _NotiContext.Accept(userId, otheruser);

			if (OnlineHub.IsOnline(otheruser))
			{
				newFriend.IsOnline = true;
				var connectionId = OnlineHub.GetConnectionId(otheruser);
				await _hub.Clients.Client(connectionId).SendAsync("NewFriend", sendFriend);
			}

			return Ok(new { NewFriend = newFriend, newRequest = result });
		}

		[HttpGet]
		public async Task<ActionResult> Get()
		{
			var userId = MiddleWare.GetUserIdFromCookie(Request);
			if (userId == -1) return Unauthorized("Bạn không có quyền truy cập");

			var requests = await _NotiContext.FindByUserId(userId);
			return Ok(requests);
		}

		[HttpDelete("delete")]
		public async Task<ActionResult> Delete([FromQuery] int id)
		{
			var userId = MiddleWare.GetUserIdFromCookie(Request);
			if (userId == -1) return Unauthorized("Bạn không có quyền truy cập");
			try
			{
				if (await _NotiContext.Delete(id)) return await Get();
				return BadRequest("Xoá không thành công");
			}
			catch (Exception e)
			{
				return BadRequest("Không thể chấp nhận yêu cầu, lỗi: " + e.Data);
			}
		}


		[HttpDelete("Deny")]
		public async Task<ActionResult> Deny(int OtherUserId)
		{
			var userId = MiddleWare.GetUserIdFromCookie(Request);
			// var relationship = await
			if (userId == -1) return Unauthorized("Bạn không có quyền truy cập");
			try
			{
				if (await _NotiContext.DenyRequest(userId, OtherUserId)) return await Get();
				return BadRequest("Xoá không thành công");
			}
			catch (Exception e)
			{
				return BadRequest("Không thể chấp nhận yêu cầu, lỗi: " + e.Data);
			}
		}
	}
}