using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CarRepair.Data.Models
{
    public class Client
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Firstname { get; set; }
        [Required]
        [MaxLength(256)]
        public string Lastname { get; set; }
        public ContactInfo ContactInfo { get; set; }
    }
}
