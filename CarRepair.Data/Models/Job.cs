using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CarRepair.Data.Models
{
    public class Job
    {
        public int Id { get; set; }
        [Required]
        public Car Car { get; set; }
        [Required]
        public DateTime Registered { get; set; }
        public DateTime? Started { get; set; }
        public DateTime? Finished { get; set; }
        public JobStatus Status { get; set; } = JobStatus.Awaiting;
    }
    public enum JobStatus
    {
        Awaiting,
        Started,
        InProgress,
        Done
    }
}
