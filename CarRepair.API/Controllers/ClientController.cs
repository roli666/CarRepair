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
    public class ClientController : ControllerBase
    {
        private readonly ILogger<ClientController> _logger;
        private readonly CarRepairContext _db;

        public ClientController(ILogger<ClientController> logger, CarRepairContext db)
        {
            _logger = logger;
            _db = db;
        }

        // GET: <ClientController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            using (_db)
            {
                _logger.LogDebug("Sending clients for user:{0}", User);
                return Ok(await _db.Clients.ToListAsync());
            }
        }

        // GET <ClientController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            using (_db)
            {
                _logger.LogDebug("Sending client:{1} for user:{0}", User, id);
                return Ok(await _db.Clients.FirstOrDefaultAsync(client => client.Id == id));
            }
        }

        // POST <ClientController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] string value)
        {
            return Ok();
        }

        // PUT <ClientController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] string value)
        {
            return Ok();
        }

        // DELETE <ClientController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok();
        }
    }
}
