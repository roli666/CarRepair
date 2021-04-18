using System.ComponentModel.DataAnnotations;

namespace CarRepair.Core.Models
{
    public class CarMessage
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(256)]
        public string Type { get; set; }

        [Required]
        [MaxLength(128)]
        public string LicencePlate { get; set; }

        [Required]
        public int OwnerId { get; set; }
    }
}