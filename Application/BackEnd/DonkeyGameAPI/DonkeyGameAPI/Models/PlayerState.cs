using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DonkeyGameAPI.Models
{
    public class PlayerState
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public int Points { get; set; }
        public List<Card> Cards { get; set; }

        public static PlayerState FromUser(User user)
        {
            PlayerState playerState = new()
            {
                UserID = user.UserID,
                Points = 0,
                Cards = new List<Card>()
            };
            return playerState;
        }
    }
}
