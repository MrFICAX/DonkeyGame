
using DonkeyGameAPI.IRepositories;
using DonkeyGameAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DonkeyGameAPI.Repositories
{
    public class CardRepository : Repository<Card>, ICardRepository
    {
        public CardRepository(DonkeyGameContext context) : base(context)
        {
        }

        public override Task<bool> Add(Card entity)
        {
            return base.Add(entity);
        }
        public override bool Delete(Card obj)
        {
            _context.Set<Card>().Remove(obj);
            return true;
        }

        public override IEnumerable<Card> GetAll()
        {
            return base.GetAll();
        }

        public override Task<Card?> GetOne(int id)
        {
            return base.GetOne(id);
        }

        public override bool Update(Card entity)
        {
            return base.Update(entity);
        }
    }
}
