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
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace Services.Services
{
    public class UserService : IUserService
    {
        #region HelpAttributes
        private const string alphaUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private const string alphaLowercase = "abcdefghijklmnopqrstuvwxyz";
        private Random random;
        private List<User> _users;
        #endregion

        private readonly IUnitOfWork unitOfWork;

        public UserService(DonkeyGameContext donkeyGameContext)
        {
            this.unitOfWork = new UnitOfWork(donkeyGameContext);
            this.random = new Random();
            _users = this.unitOfWork.UserRepository.GetAll();

        }

        public async Task<User> CreateUser(User user)
        {
            var Resultuser = this._users.SingleOrDefault(x => x.Email == user.Email && x.UserName == user.UserName);
            // return null if user not found
            if (Resultuser != null)
                return null;

            user.Token = this.GenerateToken(user);
            //User tmp = new User(user.UserName, user.Password, user.Email);
            this.unitOfWork.UserRepository.Add(user);
            await this.unitOfWork.CompleteAsync();
            return user;
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

        public User LogIn(User user)
        {

            var Resultuser = this._users.SingleOrDefault(x => x.UserName == user.UserName && x.Password == user.Password);
            // return null if user not found
            if (Resultuser == null)
                return Resultuser;




            //// authentication successful so generate jwt token
            //var tokenHandler = new JwtSecurityTokenHandler();
            //var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            //var tokenDescriptor = new SecurityTokenDescriptor
            //{
            //    Subject = new ClaimsIdentity(new Claim[]
            //    {
            //        new Claim(ClaimTypes.Name, user.ID.ToString()),
            //        new Claim(ClaimTypes.Role, user.Role)
            //    }),
            //    Expires = DateTime.UtcNow.AddDays(7),
            //    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            //};
            //var token = tokenHandler.CreateToken(tokenDescriptor);
            //user.Token = tokenHandler.WriteToken(token);
            Resultuser.Token = this.GenerateToken(Resultuser);
            return Resultuser.WithoutPassword();
        }

        private string GenerateToken(User user)
        {
            var mySecret = "asdv234234^&%&^%&^hjsdfb2%%%";
            var mySecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(mySecret));

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.NameIdentifier, user.UserID.ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.UserName.ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Password.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(mySecurityKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
