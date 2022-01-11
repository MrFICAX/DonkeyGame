﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class User
    {
        public int UserID { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string Token { get; set; }

        public User(string userName, string password, string email)
        {
            this.UserName = userName;
            this.Password = password;
            this.Email = email;
        }
    }
}
