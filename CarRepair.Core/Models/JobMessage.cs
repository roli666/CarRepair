﻿using CarRepair.Data.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace CarRepair.Core.Models
{
    public class JobMessage
    {
        public int Id { get; set; }

        [Required]
        public int CarId { get; set; }

        public string AssignedToId { get; set; }

        [Required]
        public DateTime Registered { get; set; } = DateTime.Now;

        public DateTime? Started { get; set; }

        public DateTime? Finished { get; set; }

        public JobStatus Status { get; set; } = JobStatus.Awaiting;

        [Required]
        [MinLength(5)]
        public string Description { get; set; }
    }
}