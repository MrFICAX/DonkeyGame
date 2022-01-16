using DonkeyGameAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DonkeyGameAPI.IServices
{
    public interface ICardService
    {
        Task<IEnumerable<Card>> getCards();
    }
}
