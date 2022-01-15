using DataAccess;
using DataAccess.Models;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public DonkeyGameContext _context;
        public UserRepository(DonkeyGameContext context) : base(context)
        {
            _context = context;
        }
        public override bool Add(User entity)
        {
            return base.Add(entity);
        }
        public override bool Delete(User obj)
        {
            this._context.Set<User>().Remove(obj);
            return true;
        }

        public override List<User> GetAll()
        {
            return base.GetAll();
        }

        public override Task<User> GetOne(int id)
        {
            var user = base.GetOne(id);
            return user;
           //var user = this._context.Set<User>().getOne()
           // return base.GetOne(id);
        }
    }
}
