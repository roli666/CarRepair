using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CarRepair.Data.Models
{
    public class Client
    {
        public int Id { get; set; }
        [Required]
        public ContactInfo ContactInfo { get; set; }
        [MaxLength(256)]
        public string FirstName { get; set; }
        [MaxLength(256)]
        public string LastName { get; set; }
    }
}
