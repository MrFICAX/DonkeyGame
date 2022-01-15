using DataAccess.Models;
using Repository;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Services.Services
{
    public class CardService : ICardService
    {
        #region HelpAttributes
        private const string alphaUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private const string alphaLowercase = "abcdefghijklmnopqrstuvwxyz";
        private Random random;
        #endregion

        private readonly IUnitOfWork unitOfWork;

        public Task<List<Card>> getCards()
        {
           return this.unitOfWork.CardRepository.GetAll();
        }
    }
}
