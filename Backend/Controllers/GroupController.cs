using Backend.Services.Interface;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class GroupController : Controller
    {
        private readonly IGroupService _services;

        public GroupController(IGroupService service)
        {
            _services = service;
        }

        [HttpGet("GetInforGroup/{id}")]
        public async Task<IActionResult> GetInforGroup(int id)
        {
            var rs = await _services.GetInforGroup(id);
            return Ok(rs);
        }
    }
}
