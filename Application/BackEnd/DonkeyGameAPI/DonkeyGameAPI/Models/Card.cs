using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DonkeyGameAPI.Models
{
    public class Card
    {
        public int CardID { get; set; }

        public int Value { get; set; }

        public string Name { get; set; }

        public Card(int value, string name)
        {
            Value = value;
            Name = name;
        }

        public static Card Deal()
        {
            string name;
            int number = Random.Shared.Next(0,3);

            switch (number)
            {
                case 0:
                    name = "DIAMOND";
                    break;
                case 1:
                    name = "SPADE";
                    break;
                case 2:
                    name = "CLUB";
                    break;
                case 3:
                    name = "HEART";
                    break;
                default:
                    name = string.Empty;
                    break;
            }
            number = number + 11;
            return new Card(number, name);
        }

        public static Card SpecialCard()
        {
            return new Card(2, "CLUB");
        }
    }
}
