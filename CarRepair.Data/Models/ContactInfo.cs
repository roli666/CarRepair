using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CarRepair.Data.Models
{
    public class ContactInfo
    {
        [Key]
        [MaxLength(256)]
        public string Email { get; set; }
        public int ClientId { get; set; }
        public Client Client { get; set; }
        public IEnumerable<PhoneContact> PhoneContact { get; set; }
    }
}
