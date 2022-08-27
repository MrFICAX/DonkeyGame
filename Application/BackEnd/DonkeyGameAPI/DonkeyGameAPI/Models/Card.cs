using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DonkeyGameAPI.Models
{
    [Table("Card")]
    public class Card
    {
        [Key]
        [Column("CardID")]
        public int CardID { get; set; }

        [Column("Value")]
        public int Value { get; set; }

        [Column("Name")]
        [MaxLength(20)]
        public string Name { get; set; }

        public Card(int value, string name)
        {
            Value = value;
            Name = name;
        }

        public static Card Deal()
        {
            int sign = Random.Shared.Next(0,4);
            string name = sign switch
            {
                0 => "DIAMOND",
                1 => "SPADE",
                2 => "CLUB",
                3 => "HEART",
                _ => string.Empty,
            };
            return new Card(Random.Shared.Next(11,15), name);
        }

        public static Card SpecialCard()
        {
            return new Card(2, "CLUB");
        }

        public bool isSpecialCard()
        {
            return this.Value == 2; 
        }

        public Card WithoutID()
        {
            this.CardID = 0;
            return this;
        }

        public override bool Equals(object? obj)
        {
            if(obj == null) return false;
            Card other = (Card)obj;
            if(this.Name == other.Name && this.Value == other.Value && this.CardID == other.CardID) return true;
            return false;
        }
    }
}
