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
	public class UserGroupController : ControllerBase
	{

		// private readonly UserService _userContext;

		
		private readonly MediaService _media;

		private readonly RequestNotiService _NotiContext;
		private readonly PostNotiService _PostContext;
		
		private readonly UserGroupService _userGroupService;

		public UserGroupController(MediaService media, RequestNotiService NotiContext, PostNotiService PostContext, UserGroupService userGroupService)
		{
			_media = media;
			_NotiContext = NotiContext;
			_PostContext = PostContext;
			_userGroupService = userGroupService;
		}
		
		[AllowAnonymous]
		[HttpPost("create_group")]
		public async Task<IActionResult> CreateGroup([FromBody] UserGroupDTO userGroupDTO)
		{
			if (string.IsNullOrWhiteSpace(userGroupDTO.GroupName))
			{
				return BadRequest(new { message = "Tên nhóm không được để trống." });
			}

			try
			{
				var createdGroup = await _userGroupService.CreateGroup(new UserGroup
				{
					GroupName = userGroupDTO.GroupName,
					Bio = userGroupDTO.Bio,
					CreatedByUserId = userGroupDTO.CreatedByUserId,
					PrivacyId = userGroupDTO.PrivacyId,
					DateCreated = DateTime.UtcNow,
					DateUpdated = DateTime.UtcNow
				});

				return Ok(new
				{
					message = "Tạo nhóm thành công.",
					group = createdGroup
				});
			}
			catch (Exception ex)
			{
			
				return StatusCode(500, new { message = "Đã xảy ra lỗi khi tạo nhóm." });
			}
		}


		
		[HttpGet("groups_in")]
		public async Task<IActionResult> GetUserGroups()
		{
			try
			{
				var userId = MiddleWare.GetUserIdFromCookie(Request); 
				if (userId == -1)
				{
					return Unauthorized(new { message = "User is not authenticated." });
				}

				var groups = await _userGroupService.GetAllGroupByUserIdAsync(userId);

				return Ok(groups);
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
			}
		}
		
		[HttpGet("groups_suggest")]
		public async Task<IActionResult> GetGroupsNotIn()
		{
			try
			{
				var userId = MiddleWare.GetUserIdFromCookie(Request); // Lấy ID người dùng từ cookie
				if (userId == -1)
				{
					return Unauthorized(new { message = "User is not authenticated." });
				}

				var groups = await _userGroupService.GetGroupsWithoutUserAsync(userId, 3); // Lấy tối đa 3 nhóm

				return Ok(groups);
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
			}
		}
		
		
		[HttpGet("groups_created_by_user")]
		public async Task<IActionResult> GetGroupsCreatedByUser()
		{
			try
			{
				var userId = MiddleWare.GetUserIdFromCookie(Request);
				if (userId == -1)
				{
					return Unauthorized(new { message = "User is not authenticated." });
				}

				var groups = await _userGroupService.GetGroupsCreatedByUserAsync(userId);
				return Ok(groups);
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
			}
		}
		
		



		

		
	}
}