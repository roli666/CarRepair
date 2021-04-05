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
        public async Task<IActionResult> Get()
        {
            using (_db)
            {
                _logger.LogDebug("Sending cars for user:{0}", User);
                return Ok(await _db.Cars.ToListAsync());
            }
        }

        // GET <CarController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            using (_db)
            {
                _logger.LogDebug("Sending car:{1} for user:{0}", User, id);
                return Ok(await _db.Cars.FindAsync(id));
            }
        }

        // POST <CarController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Car value)
        {
            using (_db)
            {
                _logger.LogDebug("Inserting car:{1} for user:{0}", User, value.LicencePlate);

                await _db.Cars.AddAsync(value);
                await _db.SaveChangesAsync();

                return Ok(value);
            }
        }

        // PUT <CarController>/5
        [HttpPut("{id}")]
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
