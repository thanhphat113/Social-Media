﻿using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Backend.DTO;
using Backend.Helper;
using Backend.Models;
using Backend.RealTime;
using Backend.Services.Interface;
using Castle.Components.DictionaryAdapter.Xml;

namespace Backend.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class InformationController : ControllerBase
	{

		// private readonly UserService _userContext;


		private readonly MediaService _media;

		private readonly INotificationsService _NotiContext;
		private readonly PostNotiService _PostContext;

		private readonly InformationService _informationContext;

		public InformationController(MediaService media, INotificationsService NotiContext, PostNotiService PostContext, InformationService informationContext)
		{

			_media = media;
			// _userContext = UserContext;
			_NotiContext = NotiContext;
			_PostContext = PostContext;
			_informationContext = informationContext;
		}

		[AllowAnonymous]
		[HttpPut]
		public async Task<IActionResult> UpdateInformation([FromBody] UserUpdateDto userDto)
		{
			var userId = MiddleWare.GetUserIdFromCookie(Request);

			if (userId == null)
			{
				return Unauthorized("User is not authenticated.");
			}

			try
			{
				// Lấy thông tin người dùng từ cơ sở dữ liệu theo userId
				var existingUser = await _informationContext.GetById(userId);

				if (existingUser == null)
				{
					return NotFound("User not found.");
				}

				// Kiểm tra email nếu người dùng có thay đổi email
				if (!string.Equals(existingUser.Email, userDto.Email, StringComparison.OrdinalIgnoreCase))
				{
					var isEmailTaken = await _informationContext.HasEmail(userDto.Email);
					if (isEmailTaken)
					{
						return BadRequest(new { message = "Email này đã được sử dụng hoặc sai định dạng." });
					}
				}

				// Cập nhật thông tin từ DTO
				existingUser.FirstName = userDto.FirstName ?? existingUser.FirstName;
				existingUser.LastName = userDto.LastName ?? existingUser.LastName;
				existingUser.Email = userDto.Email ?? existingUser.Email;
				existingUser.Location = userDto.Location ?? existingUser.Location;
				existingUser.Bio = userDto.Bio ?? existingUser.Bio;

				// Gọi phương thức Update trong service
				var updateResult = await _informationContext.Update(existingUser);

				if (updateResult)
				{
					return Ok("Cập nhật thông tin người dùng thành công.");
				}
				else
				{
					return StatusCode(500, "Đã xảy ra lỗi trong quá trình cập nhật thông tin.");
				}
			}
			catch (InvalidOperationException ex)
			{
				return BadRequest(ex.Message);
			}
			catch (KeyNotFoundException ex)
			{
				return NotFound(ex.Message);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal server error: {ex.Message}");
			}
		}




		[AllowAnonymous]
		[HttpPut("change-password")]
		public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto model)
		{
			if (model.NewPassword != model.ConfirmPassword)
			{
				return BadRequest(new { message = "Mật khẩu mới và xác nhận mật khẩu không khớp!" });
			}

			var result = await _informationContext.ChangePassword(MiddleWare.GetUserIdFromCookie(Request), model);
			if (result)
			{
				return Ok(new { message = "Mật khẩu đã được thay đổi thành công!" });
			}

			return BadRequest(new { message = "Mật khẩu hiện tại không đúng!" });
		}

		[HttpGet("friends")]
		public async Task<IActionResult> GetFriendsList()
		{
			var userId = MiddleWare.GetUserIdFromCookie(Request);
			if (userId == -1)
			{
				return Unauthorized(new { message = "User is not authenticated." });
			}

			try
			{
				var friends = await _informationContext.GetFriends(userId);

				// Đánh dấu trạng thái online
				foreach (var friend in friends)
				{
					friend.IsOnline = OnlineHub.IsOnline(friend.UserId);
				}

				return Ok(friends);
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
			}
		}

		[HttpGet("followers")]
		public async Task<IActionResult> GetFollowersList()
		{
			var userId = MiddleWare.GetUserIdFromCookie(Request);
			if (userId == -1)
			{
				return Unauthorized(new { message = "User is not authenticated." });
			}

			try
			{
				var follows = await _informationContext.GetFollowers(userId);

				foreach (var follower in follows)
				{
					follower.IsOnline = OnlineHub.IsOnline(follower.UserId);
				}


				return Ok(follows);
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
			}
		}
		[HttpGet("user-media")]
		public async Task<IActionResult> GetUserMedia()
		{
			// Lấy ID của người dùng hiện tại từ cookie
			var userId = MiddleWare.GetUserIdFromCookie(Request);
			if (userId == -1)
			{
				return Unauthorized(new { message = "User is not authenticated." });
			}

			try
			{
				// Gọi service để lấy danh sách ảnh
				var mediaList = await _informationContext.GetAllMediaByUserIdAsync(userId);

				if (!mediaList.Any())
				{
					return NotFound(new { message = "Không tìm thấy ảnh nào của người dùng này." });
				}

				// Trả về danh sách ảnh
				return Ok(mediaList);
			}
			catch (Exception ex)
			{
				// Trả về lỗi server
				return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
			}
		}
















	}
}