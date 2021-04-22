using CarRepair.Data;
using CarRepair.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace CarRepair.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    //[Authorize(Roles ="Admin")]
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
        [Authorize(Policy = "RequireAdmin")]
        public async Task<IActionResult> Get()
        {
            using (_db)
            {
                _logger.LogDebug("Sending clients for user:{0}", User);

                var clients = await _db.Clients
                    .Include(client => client.ContactInfo)
                    .ThenInclude(contactInfo => contactInfo.PhoneContact)
                    .ToListAsync();

                return Ok(clients);
            }
        }

        // GET <ClientController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            using (_db)
            {
                _logger.LogDebug("Sending client:{1} for user:{0}", User, id);

                var client = await _db.Clients
                    .Include(client => client.ContactInfo)
                    .ThenInclude(contactInfo => contactInfo.PhoneContact)
                    .FirstOrDefaultAsync(client => client.Id == id);

                return Ok(client);
            }
        }

        // POST <ClientController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Client value)
        {
            using (_db)
            {
                _logger.LogDebug("Inserting client:{1} for user:{0}", User, $"{value.Lastname} {value.Firstname}");

                await _db.Clients.AddAsync(value);
                await _db.SaveChangesAsync();

                return Ok(value);
            }
        }

        // PUT <ClientController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Client value)
        {
            using (_db)
            {
                _logger.LogDebug("Updating client:{1} for user:{0}", User, id);
                var client = await _db.Clients.FindAsync(id);

                if (client == null)
                {
                    _logger.LogDebug("Client:{1} not found for user:{0}. Redirecting to post.", User, id);
                    RedirectToAction("Post");
                }

                var clientToUpdate = _db.Clients.Attach(client);
                clientToUpdate.CurrentValues.SetValues(value);
                await _db.SaveChangesAsync();

                return Ok(value);
            }
        }

        // DELETE <ClientController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            using (_db)
            {
                _logger.LogDebug("Deleting client:{1} for user:{0}", User, id);

                var clientToDelete = await _db.Clients
                    .Include(client => client.ContactInfo)
                    .ThenInclude(contactInfo => contactInfo.PhoneContact)
                    .FirstOrDefaultAsync(client => client.Id == id);

                _db.Clients.Remove(clientToDelete);

                return Ok(await _db.SaveChangesAsync());
            }
        }
    }
}