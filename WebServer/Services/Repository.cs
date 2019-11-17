using LiteDB;
using SharedKernel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebServer.Interfaces;

namespace WebServer.Services
{
    public class Repository : IRepository
    {
        LiteDatabase _db;

        public Repository(string connectionString)
        {
            _db = new LiteDatabase(connectionString);
        }

        public int AddJob(JobModel job)
        {
            var col = _db.GetCollection<JobModel>();
            return col.Insert(job);
        }

        public bool UpdateJob(JobModel job)
        {
            var col = _db.GetCollection<JobModel>();
            return col.Update(job);
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

        public bool DeleteJob(int id)
        {
            var col = _db.GetCollection<JobModel>();
            return col.Delete(id);
        }
    }
}