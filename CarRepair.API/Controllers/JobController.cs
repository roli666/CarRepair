﻿using CarRepair.Core.Authorization;
using CarRepair.Core.Models;
using CarRepair.Data;
using CarRepair.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace CarRepair.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class JobController : ControllerBase
    {
        private readonly ILogger<JobController> _logger;
        private readonly CarRepairContext _db;
        private readonly UserManager<CarRepairUser> _userManager;

        public JobController(ILogger<JobController> logger, CarRepairContext db, UserManager<CarRepairUser> userManager)
        {
            _logger = logger;
            _db = db;
            _userManager = userManager;
        }

        // GET: <JobController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            using (_db)
            {
                _logger.LogDebug("Sending jobs for user:{0}", User);

                var jobs = await _db.Jobs
                    .Include(j => j.AssignedTo)
                    .Include(j => j.Car)
                    .ThenInclude(car => car.Owner)
                    .ThenInclude(c => c.ContactInfo)
                    .ToListAsync();

                return Ok(jobs);
            }
        }

        // GET <JobController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            using (_db)
            {
                _logger.LogDebug("Sending job:{1} for user:{0}", User, id);

                var job = await _db.Jobs
                    .Include(j => j.AssignedTo)
                    .Include(j => j.Car)
                    .ThenInclude(car => car.Owner)
                    .ThenInclude(c => c.ContactInfo)
                    .FirstOrDefaultAsync(job => job.Id == id);

                return Ok(await _db.Jobs.FindAsync(job));
            }
        }

        // PUT <JobController>/start/5
        [HttpPut("start/{id}")]
        public async Task<IActionResult> StartJob(int id)
        {
            using (_db)
            {
                _logger.LogDebug("Starting job:{1} for user:{0}", User, id);

                var job = await _db.Jobs
                    .Include(j => j.AssignedTo)
                    .Include(j => j.Car)
                    .ThenInclude(car => car.Owner)
                    .ThenInclude(c => c.ContactInfo)
                    .FirstOrDefaultAsync(job => job.Id == id);

                var jobToUpdate = _db.Jobs.Attach(job);
                var user = await _userManager.GetUserAsync(User);

                if(!string.IsNullOrEmpty(job.AssignedToId))
                {
                    if(user.Id != job.AssignedToId)
                        return Forbid();
                }

                if (job.Status == JobStatus.Awaiting)
                {
                    job.Started = DateTime.Now;
                    job.Status = JobStatus.InProgress;
                    if (job.AssignedTo == null)
                    {
                        job.AssignedTo = user;
                        job.AssignedToId = user.Id;
                    }
                    await _db.SaveChangesAsync();
                    return Ok(job);
                }
                return Ok();
            }
        }

        // PUT <JobController>/start/5
        [HttpPut("finish/{id}")]
        public async Task<IActionResult> FinishJob(int id)
        {
            using (_db)
            {
                _logger.LogDebug("Finishing job:{1} for user:{0}", User, id);

                var job = await _db.Jobs
                    .Include(j => j.AssignedTo)
                    .Include(j => j.Car)
                    .ThenInclude(car => car.Owner)
                    .ThenInclude(c => c.ContactInfo)
                    .FirstOrDefaultAsync(job => job.Id == id);

                var jobToUpdate = _db.Jobs.Attach(job);
                var user = await _userManager.GetUserAsync(User);

                if (!string.IsNullOrEmpty(job.AssignedToId))
                {
                    if (user.Id != job.AssignedToId)
                        return Forbid();
                }

                if (job.Status == JobStatus.InProgress)
                {
                    job.Finished = DateTime.Now;
                    job.Status = JobStatus.Done;
                    await _db.SaveChangesAsync();
                    return Ok(job);
                }

                return Ok();
            }
        }

        // POST <JobController>
        [HttpPost]
        [Authorize(Policy = Policies.RequireAdmin)]
        public async Task<IActionResult> Post([FromBody] JobMessage value)
        {
            using (_db)
            {
                _logger.LogDebug("Inserting job:{1} for user:{0}", User, $"{value.Registered}");

                var job = new Job
                {
                    CarId = value.CarId,
                    Description = value.Description,
                    AssignedToId = value.AssignedToId
                };

                await _db.Jobs.AddAsync(job);
                await _db.SaveChangesAsync();
                await _db.Entry(job).Reference(j => j.Car).LoadAsync();
                await _db.Entry(job).Reference(j => j.AssignedTo).LoadAsync();

                return Ok(job);
            }
        }

        // PUT <JobController>/5
        [HttpPut("{id}")]
        [Authorize(Policy = Policies.RequireAdmin)]
        public async Task<IActionResult> Put(int id, [FromBody] Job value)
        {
            using (_db)
            {
                _logger.LogDebug("Updating job:{1} for user:{0}", User, id);

                var job = await _db.Jobs.FindAsync(id);
                if (job == null)
                {
                    _logger.LogDebug("Job:{1} not found for user:{0}. Redirecting to post.", User, id);
                    RedirectToAction("Post");
                }

                var jobToUpdate = _db.Jobs.Attach(job);
                jobToUpdate.CurrentValues.SetValues(value);
                await _db.SaveChangesAsync();

                return Ok(value);
            }
        }

        // DELETE <JobController>/5
        [HttpDelete("{id}")]
        [Authorize(Policy = Policies.RequireAdmin)]
        public async Task<IActionResult> Delete(int id)
        {
            using (_db)
            {
                _logger.LogDebug("Deleting job:{1} for user:{0}", User, id);
                var jobToDelete = await _db.Jobs.FindAsync(id);
                _db.Jobs.Remove(jobToDelete);
                return Ok(await _db.SaveChangesAsync());
            }
        }
    }
}