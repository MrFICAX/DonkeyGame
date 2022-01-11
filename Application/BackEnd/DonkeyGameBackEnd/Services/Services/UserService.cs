using DataAccess.Models;
using Repository;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DataAccess;

namespace Services.Services
{
    public class UserService : IUserService
    {
        #region HelpAttributes
        private const string alphaUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private const string alphaLowercase = "abcdefghijklmnopqrstuvwxyz";
        private Random random;
        #endregion

        private readonly IUnitOfWork unitOfWork;

        public UserService(DonkeyGameContext donkeyGameContext)
        {
            this.unitOfWork = new UnitOfWork(donkeyGameContext);
            this.random = new Random();
        }

        public async Task<User> CreateUser(User user)
        {
            //User tmp = new User(user.UserName, user.Password, user.Email);
            this.unitOfWork.UserRepository.Add(user);
            await this.unitOfWork.CompleteAsync();
            return user ;
        }


        public Task<IEnumerable<User>> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUserByID(int userID)
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUserByUsername(string username)
        {
            throw new NotImplementedException();
        }

        public Task<User> UserValidating(User user)
        {
            throw new NotImplementedException();
        }
    }
}
