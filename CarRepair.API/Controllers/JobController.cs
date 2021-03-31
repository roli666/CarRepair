using CarRepair.Data;
using CarRepair.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace CarRepair.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly ILogger<JobController> _logger;
        private readonly CarRepairContext _db;

        public JobController(ILogger<JobController> logger, CarRepairContext db)
        {
            _logger = logger;
            _db = db;
        }

        // GET: api/<JobController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            using (_db)
            {
                _logger.LogDebug("Sending jobs for user:{0}", User);
                return Ok(await _db.Jobs.ToListAsync());
            }
        }

        // GET api/<JobController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            using (_db)
            {
                return Ok(await _db.Jobs.FindAsync(id));
            }
        }

        // POST api/<JobController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Job job)
        {
            using (_db)
            {
                await _db.Jobs.AddAsync(job);
                var rows = await _db.SaveChangesAsync();
                return Ok();
            }
        }

        // PUT api/<JobController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] string value)
        {
            return Ok();
        }

        // DELETE api/<JobController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            using (_db)
            {
                var job = await _db.Jobs.FindAsync(id);
                _db.Jobs.Remove(job);
                return Ok();
            }
        }
    }
}
