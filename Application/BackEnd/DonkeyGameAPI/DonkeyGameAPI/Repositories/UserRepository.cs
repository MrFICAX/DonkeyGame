using DonkeyGameAPI.IRepositories;
using DonkeyGameAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DonkeyGameAPI.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {        
        public UserRepository(DonkeyGameContext context) : base(context)
        {
            
        }
        public override Task<bool> Add(User entity)
        {
            return base.Add(entity);
        }
        public override bool Delete(User obj)
        {
            _context.Set<User>().Remove(obj);
            return true;
        }

        public override Task<IEnumerable<User>> GetAll()
        {
            return base.GetAll();
        }  
        
        public List<User> GetAllList()
        {
            return _dbSet.ToList();
        }

        public override Task<User?> GetOne(int id)
        {
            var user = base.GetOne(id);
            return user;
            //var user = this._context.Set<User>().getOne()
            // return base.GetOne(id);
        }

    }
}
