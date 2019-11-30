using LiteDB;
using Microsoft.AspNet.SignalR;
using SharedKernel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using WebServer.Interfaces;

namespace WebServer.Services
{
    public class Repository : IRepository
    {
        readonly LiteDatabase _db;
        readonly IHubContext<IRepositoryHub> hub;
        public Repository(string connectionString)
        {
            _db = new LiteDatabase(connectionString);
            hub = GlobalHost.ConnectionManager.GetHubContext<RepositoryHub, IRepositoryHub>();
        }

        public async Task<int> AddJob(JobModel job)
        {
            var col = _db.GetCollection<JobModel>();
            var retValue = col.Insert(job);
            await hub.Clients.All.RepositoryChanged();
            return retValue;
        }

        public async Task<bool> UpdateJob(JobModel job)
        {
            var col = _db.GetCollection<JobModel>();
            var retValue = col.Update(job);
            await hub.Clients.All.RepositoryChanged();
            return retValue;
        }

        public IEnumerable<JobModel> GetAllJobs()
        {
            return _db.GetCollection<JobModel>().FindAll();
        }

        public JobModel GetJobByID(int id)
        {
            return _db.GetCollection<JobModel>().FindById(new BsonValue(id));
        }

        public IEnumerable<JobModel> FindJob(string searchString)
        {
            return _db.GetCollection<JobModel>().Find( x => 
               x.CarType.Contains(searchString) 
            || x.Description.Contains(searchString)
            || x.ClientName.Contains(searchString)
            || x.LicencePlate.Contains(searchString)
            );
        }

        public async Task<bool> DeleteJob(int id)
        {
            var col = _db.GetCollection<JobModel>();
            var retValue = col.Delete(id);
            await hub.Clients.All.RepositoryChanged();
            return retValue;
        }
    }
}