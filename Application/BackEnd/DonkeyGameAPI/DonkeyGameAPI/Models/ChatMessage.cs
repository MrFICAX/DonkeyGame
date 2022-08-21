using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DonkeyGameAPI.Models
{
    [Table("ChatMessage")]
    public class ChatMessage
    {
        [Key]
        [Column("MessageID")]
        public int MessageID { get; set; }


        [Column("User")]
        public User user{ get; set; }


        [Column("Message")]
        [MaxLength(255)]
        public string Message { get; set; }

        [Column("DateTime")]
        public DateTime DateTime { get; set; }

    }
}
