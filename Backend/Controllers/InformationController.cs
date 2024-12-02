using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Backend.Models;
using Castle.Components.DictionaryAdapter.Xml;

namespace Backend.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class InformationController : ControllerBase
	{

		// private readonly UserService _userContext;

		private readonly GroupChatService _group;
		private readonly MediaService _media;

		private readonly RequestNotiService _NotiContext;
		private readonly PostNotiService _PostContext;
		
		private readonly InformationService _informationContext;

		public InformationController(MediaService media, GroupChatService group, MessageService mess, RequestNotiService NotiContext, PostNotiService PostContext, InformationService informationContext )
		{
			_group = group;
			_media = media;
			// _userContext = UserContext;
			_NotiContext = NotiContext;
			_PostContext = PostContext;
			_informationContext = informationContext;
		}
		
		[AllowAnonymous]
[HttpPut]
public async Task<IActionResult> UpdateInformation([FromBody] User user)
{
    var userId = GetCookie.GetUserIdFromCookie(Request);

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
        Console.WriteLine($"existingUser.Email: {existingUser.Email}");
        Console.WriteLine($"user.Email: {user.Email}");

        // Kiểm tra email nếu người dùng có thay đổi email
        if (!string.Equals(existingUser.Email, user.Email, StringComparison.OrdinalIgnoreCase))
        {
	       
            var isEmailTaken = await _informationContext.HasEmail(user.Email);
            if (isEmailTaken)
            {
                // return BadRequest("Email này đã được sử dụng hoặc sai định dạng.");
				return BadRequest(new { message = "Email này đã được sử dụng hoặc sai định dạng." });
            }
        }

        // Cập nhật thông tin người dùng từ dữ liệu gửi lên
        existingUser.FirstName = user.FirstName ?? existingUser.FirstName;
        existingUser.LastName = user.LastName ?? existingUser.LastName;
        existingUser.Email = user.Email ?? existingUser.Email;
        existingUser.Location = user.Location ?? existingUser.Location;
        existingUser.Bio = user.Bio ?? existingUser.Bio;

        // Gọi phương thức Update trong UserService để lưu thay đổi
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
        // Xử lý lỗi email không hợp lệ hoặc đã được sử dụng
        return BadRequest(ex.Message);
    }
    catch (KeyNotFoundException ex)
    {
        // Xử lý lỗi người dùng không tồn tại
        return NotFound(ex.Message);
    }
    catch (Exception ex)
    {
        // Xử lý lỗi không xác định
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

			var result = await _informationContext.ChangePassword(GetCookie.GetUserIdFromCookie(Request), model);
			if (result)
			{
				return Ok(new { message = "Mật khẩu đã được thay đổi thành công!" });
			}

			return BadRequest(new { message = "Mật khẩu hiện tại không đúng!" });
		}




		
		
		
		
		


		

		
	}
}