using DonkeyGameAPI.IServices;
using DonkeyGameAPI.Models;
using DonkeyGameAPI.UOfW;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DonkeyGameAPI.Services
{
    public class CardService : ICardService
    {
        #region HelpAttributes
        private const string alphaUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private const string alphaLowercase = "abcdefghijklmnopqrstuvwxyz";
        #endregion

        private readonly IUnitOfWork unitOfWork;

        public CardService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Card>> getCards()
        {
            IEnumerable<Card> cards = await this.unitOfWork.CardRepository.GetAll();
            return cards;
        }
    }
}
