using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class Card
    {
        public int Id { get; set; }

        public int Number { get; set; }

        public bool IsSpecial { get; set; }

        public string ImageName { get; set; } 
    }
}
