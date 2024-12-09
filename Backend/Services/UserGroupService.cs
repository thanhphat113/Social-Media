using Backend.Models;
using Backend.DTO;
using Backend.Services.Interface;
using Backend.Authentication;
using Backend.Repositories.Interface;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Backend.Data;

using AutoMapper.QueryableExtensions;


namespace Backend.Services
{
    public class UserGroupService 
    {
        private readonly JwtToken _jwtToken;
        private readonly IHttpContextAccessor _httpContextAccessor;

        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unit;

        private readonly SocialMediaContext _context;

        public UserGroupService(IUnitOfWork unit, JwtToken jwtToken, IMapper mapper, IHttpContextAccessor httpContextAccessor,
            SocialMediaContext context)
        {
            _mapper = mapper;
            _unit = unit;
            _jwtToken = jwtToken;
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }

       
        public async Task<UserGroup> CreateGroup(UserGroup userGroup)
        {
            await _unit.UserGroup.AddAsync(userGroup);
            await _unit.CompleteAsync();
            return userGroup;
        }

        
        public async Task<IEnumerable<UserGroup>> GetAllGroupByUserIdAsync(int userId)
        {
            try
            {
             
                var userGroupList = await _unit.UserInGroup.FindAsync<UserGroup>(query =>
                    query.Where(userInGroup => userInGroup.UserId == userId) 
                        .Select(userInGroup => userInGroup.Group));         

                return userGroupList; 
            }
            catch (Exception ex)
            {
               
                throw new Exception("Đã xảy ra lỗi khi lấy danh sách nhóm của người dùng", ex);
            }
        }
        
        public async Task<IEnumerable<UserGroup>> GetGroupsWithoutUserAsync(int userId, int maxGroups)
        {
            try
            {
                var groupsWithoutUser = await _unit.UserGroup.FindAsync<UserGroup>(query =>
                        query.Where(group =>
                                // Loại bỏ nhóm có liên kết trong UserInGroup với userId
                                !group.UserInGroups.Any(uig => uig.UserId == userId) &&
                                // Loại bỏ nhóm do userId tạo ra
                                group.CreatedByUserId != userId)
                            .Take(maxGroups) // Giới hạn số lượng nhóm trả về
                );

                return groupsWithoutUser;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách nhóm không liên quan đến người dùng", ex);
            }
        }

        
        public async Task<IEnumerable<UserGroup>> GetGroupsCreatedByUserAsync(int userId)
        {
            try
            {
                var groupsCreatedByUser = await _unit.UserGroup.FindAsync<UserGroup>(query =>
                    query.Where(group => group.CreatedByUserId == userId));

                return groupsCreatedByUser;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách nhóm được tạo bởi người dùng", ex);
            }
        }



    }

}