using System;
using System.ComponentModel.DataAnnotations;

namespace CarRepair.Data.Models
{
    public class Job
    {
        public int Id { get; set; }

        public Car Car { get; set; }

        [Required]
        public int CarId { get; set; }

        [Required]
        [MinLength(5)]
        public string Description { get; set; }

        public CarRepairUser AssignedTo { get; set; }

        public string AssignedToId { get; set; }

        [Required]
        public DateTime Registered { get; set; } = DateTime.Now;

        public DateTime? Started { get; set; }

        public DateTime? Finished { get; set; }

        public JobStatus Status { get; set; } = JobStatus.Awaiting;
    }

    public enum JobStatus
    {
        Awaiting,
        InProgress,
        Done
    }
}