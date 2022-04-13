using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using DonkeyGameAPI.Models;
using DonkeyGameAPI.IServices;
using DonkeyGameAPI.UOfW;

namespace DonkeyGameAPI.Services
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

        public async Task<User?> CreateUser(User user)
        {
            var Resultuser = unitOfWork.UserRepository.GetAllList().FirstOrDefault(x => x.UserName == user.UserName || x.Email == user.Email);
            // return null if user not found
            if (Resultuser != null) return null;                

            user.Token = UserService.GenerateToken(user);
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

        public async Task<User?> LogIn(User user)
        {

            var Resultuser = unitOfWork.UserRepository.GetAllList().SingleOrDefault(x => x.UserName == user.UserName && x.Password == user.Password);
            // return null if user not found
            if (Resultuser == null) return null;
                

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
            Resultuser.Token = UserService.GenerateToken(Resultuser);
            Resultuser.WithoutPassword();
            return Resultuser;
        }

        private static string GenerateToken(User user)
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
