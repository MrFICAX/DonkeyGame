using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DonkeyGameAPI.Models
{
    public class ChatMessage
    {
        public int ID { get; set; }

        public int UserID { get; set; }

        public string Message { get; set; }

        public DateTime DateTime { get; set; }

    }
}
