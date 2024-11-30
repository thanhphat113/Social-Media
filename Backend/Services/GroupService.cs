using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public interface IGroupService
    {
        Task<UserGroup?> GetInforGroup(int idGroup);
    }

    public class GroupService: IGroupService
    {
        private readonly SocialMediaContext _context;

        public GroupService(SocialMediaContext context) 
        {
            _context = context;
        }

        public async Task<UserGroup?> GetInforGroup(int idGroup)
        {
            var rs = await _context.UserGroups
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.GroupId == idGroup);

            return rs;
        }
    }
}
