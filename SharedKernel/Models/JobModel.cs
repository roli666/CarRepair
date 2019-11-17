using LiteDB;
using SharedKernel.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedKernel.Models
{
    public class JobModel
    {
        [BsonId]
        public int ID { get; set; }
        
        public string ClientName { get; set; }

        public string CarType{ get; set; }

        public string LicencePlate{ get; set; }

        public string Description { get; set; }

        public DateTimeOffset DateRegistered { get; set; }

        public DateTimeOffset? JobStarted { get; set; }

        public DateTimeOffset? JobDone { get; set; }

        public JobStatus Status { get; set; }

        public JobModel() { }

    }
}
