using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DonkeyGameAPI.Models
{
    public class Game
    {
        public int Id { get; set; }

        public int GameOwnerID { get; set; }

        public virtual List<PlayerState> Players { get; set; }

        public int? PlayerOnTheMoveID { get; set; }

        public bool IsFinished { get; set; }

        public string GameCode { get; set; }

        public int? LoserPlayerID { get; set; }

        public List<ChatMessage> Messages { get; set; }

        public DateTime? DateOfStart { get; set; }


    }
}
