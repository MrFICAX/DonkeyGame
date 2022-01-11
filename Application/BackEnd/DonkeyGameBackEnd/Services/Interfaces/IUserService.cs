using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Services.Interfaces
{
    public interface IUserService
    {
        Task<User> CreateUser(User user);
        Task<User> UserValidating(User user);
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUserByID(int userID);
        Task<User> GetUserByUsername(string username);
    }
}
