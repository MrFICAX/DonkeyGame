using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DonkeyGameAPI.Models
{
    [Table("User")]

    public class User
    {
        [Key]
        [Column("UserID")]
        public int UserID { get; set; }

        [Column("UserName")]
        [MaxLength(255)]
        public string UserName { get; set; }

        [Column("Password")]
        [MaxLength(255)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        [Column("Email")]
        public string Email { get; set; }

        [Column("Token")]
        [MaxLength(255)]
        public string Token { get; set; }

        public User WithoutPassword()
        {
            Password = "";
            return this;
        }


        public User copyUserWithoutPassword()
        {
            User tmp = new User();
            tmp.UserID = this.UserID;
            tmp.UserName = this.UserName;
            tmp.Password = this.Password;
            tmp.Email = this.Email;
            tmp.Token = this.Token;

            return tmp.WithoutPassword();
        }
    }
}
