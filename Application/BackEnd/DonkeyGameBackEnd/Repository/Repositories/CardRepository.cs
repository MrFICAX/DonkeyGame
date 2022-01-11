using DataAccess;
using DataAccess.Models;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public  class CardRepository : Repository<Card>, ICardRepository
    {
        public CardRepository(DonkeyGameContext context) : base(context)
        {
        }

        public override bool Add(Card entity)
        {
            return base.Add(entity);
        }
        public override bool Delete(Card obj)
        {
            this._context.Set<Card>().Remove(obj);
            return true;
        }

        public override Task<List<Card>> GetAll()
        {
            return base.GetAll();
        }

        public override Task<Card> GetOne(int id)
        {
            return base.GetOne(id);
        }

        public override bool Update(Card entity)
        {
            return base.Update(entity);
        }
    }
}
