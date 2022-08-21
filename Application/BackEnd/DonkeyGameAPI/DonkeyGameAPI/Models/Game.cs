using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DonkeyGameAPI.Models
{
    [Table("Game")]
    public class Game
    {
        [Key]
        [Column("GameID")]
        public int GameID { get; set; }

        [Column("GameOwner")]
        [Required]
        public User GameOwner { get; set; }

        public List<PlayerState>? Players { get; set; }

        [Column("PlayerOnTheMove")]
        public User? PlayerOnTheMove { get; set; }

        [Column("IsFinished")]
        public bool IsFinished { get; set; }

        [Column("GameCode")]
        [Required]
        [MaxLength(255)]
        public string GameCode { get; set; }

        [Column("LoserPlayer")]
        public User? LoserPlayer { get; set; }

        //public List<ChatMessage> Messages { get; set; }

        [Column("DateOfStart")]
        public DateTime? DateOfStart { get; set; }

        public Game ClearPasswords()
        {
            this.GameOwner.WithoutPassword();

            Players.ForEach(player =>
            {
                player.User.WithoutPassword();
            });
            return this;
        }
    }
}
