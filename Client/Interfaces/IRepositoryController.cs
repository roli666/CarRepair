using Client.Models;
using SharedKernel.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Client.Interfaces
{
    public interface IRepositoryController
    {
        Task<IList<JobViewModel>> GetAllJobs();

        Task<bool> AddJob(JobModel m);

        Task<bool> UpdateJob(JobModel m);

        Task<bool> RemoveJob(JobModel m);

        Task<bool> CheckForInternetConnection();
        Task<bool> CheckForRepositoryConnection();

        event EventHandler RepositoryChangedEvent;
    }
}
