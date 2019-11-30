using SharedKernel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebServer.Interfaces
{
    public interface IRepository
    {
        IEnumerable<JobModel> GetAllJobs();
        JobModel GetJobByID(int id);
        IEnumerable<JobModel> FindJob(string searchString);
        Task<int> AddJob(JobModel job);
        Task<bool> UpdateJob(JobModel job);
        Task<bool> DeleteJob(int id);

    }
}
