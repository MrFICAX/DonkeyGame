using DonkeyGameAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DonkeyGameAPI.DTOs
{
    public class MyCards
    {
        public int PlayerStateID { get; set; }

        public string gameCode { get; set; }

        public List<Card> myCards { get; set; }

    }
}
