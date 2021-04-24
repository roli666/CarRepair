using CarRepair.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading.Tasks;

namespace CarRepair.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(Policy = "RequireAdmin")]
    public class CarRepairUserController : ControllerBase
    {
        private readonly ILogger<CarController> _logger;
        private readonly CarRepairContext _db;

        public CarRepairUserController(ILogger<CarController> logger, CarRepairContext db)
        {
            _logger = logger;
            _db = db;
        }

        // GET: <CarRepairUserController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            using (_db)
            {
                _logger.LogDebug("Sending users for user:{0}", User);

                var users = await _db.Users.Where(user => !user.IsAdmin).ToListAsync();

                return Ok(users);
            }
        }

        // GET <CarRepairUserController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            using (_db)
            {
                _logger.LogDebug("Sending car:{1} for user:{0}", User, id);

                var user = await _db.Users.FindAsync(id);

                return Ok(user);
            }
        }
    }
}