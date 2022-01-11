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
        public UserRepository(DonkeyGameContext context) : base(context)
        {
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

        public override Task<List<User>> GetAll()
        {
            return base.GetAll();
        }

        public override Task<User> GetOne(int id)
        {
            return base.GetOne(id);
        }
    }
}
