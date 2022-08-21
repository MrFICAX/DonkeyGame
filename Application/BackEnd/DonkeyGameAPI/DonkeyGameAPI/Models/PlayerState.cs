using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DonkeyGameAPI.Models
{
    [Table("PlayerState")]
    public class PlayerState
    {
        [Key]
        [Column("PlayerStateID")]
        public int PlayerStateID { get; set; }

        [Column("User")]
        [Required]
        public User User { get; set; }

        [Column("Points")]
        public int Points { get; set; }

        public virtual List<Card> Cards { get; set; }

        public static PlayerState FromUser(User user)
        {
            PlayerState playerState = new()
            {
                User = user,
                Points = 0,
                Cards = new List<Card>()
            };
            return playerState;
        }
    }
}
