using SharedKernel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using WebServer.Interfaces;

namespace WebServer.Controllers
{
    public class JobsController : ApiController
    {
        IRepository _jobRepo;

        public JobsController()
        {

        }

        public JobsController(IRepository repo)
        {
            _jobRepo = repo;
        }

        // GET api/jobs
        public IEnumerable<JobModel> Get()
        {
            return _jobRepo.GetAllJobs();
        }

        // GET api/jobs/5
        public JobModel Get(int id)
        {
            return _jobRepo.GetJobByID(id);
        }

        // POST api/jobs
        public void Post([FromBody]JobModel job)
        {
            if (job.ID == 0)
                _jobRepo.AddJob(job);
            else
                _jobRepo.UpdateJob(job);
        }

        // PUT api/jobs/5
        public void Put()
        {

        }

        // DELETE api/jobs/5
        public void Delete(int id)
        {
            _jobRepo.DeleteJob(id);
        }
    }
}