using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class PlayerState
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public int Points { get; set; }
        public List<Card> Cards { get; set; }   
    }
}
