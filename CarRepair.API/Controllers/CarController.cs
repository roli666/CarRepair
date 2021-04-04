using CarRepair.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarRepair.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ILogger<CarController> _logger;
        private readonly CarRepairContext _db;

        public CarController(ILogger<CarController> logger, CarRepairContext db)
        {
            _logger = logger;
            _db = db;
        }

        // GET: api/<CarController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            using (_db)
            {
                _logger.LogDebug("Sending clients for user:{0}", User);
                return Ok(await _db.Cars.ToListAsync());
            }
        }

        // GET api/<CarController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            using (_db)
            {
                _logger.LogDebug("Sending client:{1} for user:{0}", User, id);
                return Ok(await _db.Cars.FirstOrDefaultAsync(car => car.Id == id));
            }
        }

        // POST api/<CarController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] string value)
        {
            return Ok();
        }

        // PUT api/<CarController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] string value)
        {
            return Ok();
        }

        // DELETE api/<CarController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok();
        }
    }
}
