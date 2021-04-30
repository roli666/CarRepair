using CarRepair.Core.Authorization;
using CarRepair.Core.Models;
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
    public class CarController : ControllerBase
    {
        private readonly ILogger<CarController> _logger;
        private readonly CarRepairContext _db;

        public CarController(ILogger<CarController> logger, CarRepairContext db)
        {
            _logger = logger;
            _db = db;
        }

        // GET: <CarController>
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            using (_db)
            {
                _logger.LogDebug("Sending cars for user:{0}", User);

                var cars = await _db.Cars
                    .Include(car => car.Owner)
                    .ThenInclude(client => client.ContactInfo)
                    .ThenInclude(contactInfo => contactInfo.PhoneContact)
                    .ToListAsync();

                return Ok(cars);
            }
        }

        // GET <CarController>/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> Get(int id)
        {
            using (_db)
            {
                _logger.LogDebug("Sending car:{1} for user:{0}", User, id);

                var car = await _db.Cars
                    .Include(car => car.Owner)
                    .ThenInclude(client => client.ContactInfo)
                    .ThenInclude(contactInfo => contactInfo.PhoneContact)
                    .FirstOrDefaultAsync(car => car.Id == id);

                return Ok(car);
            }
        }

        // POST <CarController>
        [HttpPost]
        [Authorize(Policy = Policies.RequireAdmin)]
        public async Task<IActionResult> Post([FromBody] CarMessage value)
        {
            using (_db)
            {
                _logger.LogDebug("Inserting car:{1} for user:{0}", User, value.LicencePlate);

                var car = new Car
                {
                    LicencePlate = value.LicencePlate,
                    OwnerId = value.OwnerId,
                    Type = value.Type
                };

                await _db.Cars.AddAsync(car);
                await _db.SaveChangesAsync();
                await _db.Entry(car).Reference(c => c.Owner).LoadAsync();

                return Ok(car);
            }
        }

        // PUT <CarController>/5
        [HttpPut("{id}")]
        [Authorize(Policy = Policies.RequireAdmin)]
        public async Task<IActionResult> Put(int id, [FromBody] Car value)
        {
            using (_db)
            {
                _logger.LogDebug("Updating car:{1} for user:{0}", User, id);
                var car = await _db.Cars.FindAsync(id);

                if (car == null)
                {
                    _logger.LogDebug("Car:{1} not found for user:{0}. Redirecting to post.", User, id);
                    RedirectToAction("Post");
                }

                var carToUpdate = _db.Cars.Attach(car);
                carToUpdate.CurrentValues.SetValues(value);
                await _db.SaveChangesAsync();

                return Ok(value);
            }
        }

        // DELETE <CarController>/5
        [HttpDelete("{id}")]
        [Authorize(Policy = Policies.RequireAdmin)]
        public async Task<IActionResult> Delete(int id)
        {
            using (_db)
            {
                _logger.LogDebug("Deleting car:{1} for user:{0}", User, id);
                var carToDelete = await _db.Cars.FindAsync(id);
                _db.Cars.Remove(carToDelete);
                return Ok(await _db.SaveChangesAsync());
            }
        }
    }
}