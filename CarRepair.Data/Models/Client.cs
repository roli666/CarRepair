using System.ComponentModel.DataAnnotations;

namespace CarRepair.Data.Models
{
    public class Client
    {
        [Key]
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
