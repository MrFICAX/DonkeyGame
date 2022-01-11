using DataAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly DonkeyGameContext _context;
        protected DbSet<T> _dbSet;

        public Repository(DonkeyGameContext context)
        {
            this._context = context;
            this._dbSet = this._context.Set<T>();
        }

        public virtual bool Add(T obj)
        {
            this._dbSet.AddAsync(obj);
            return true;
        }

        public virtual bool Delete(T obj)
        {
            this._dbSet.Remove(obj);
            return true;
        }

        public virtual Task<List<T>> GetAll()
        {
            return this._dbSet.ToListAsync<T>();
        }

        public virtual IEnumerable<T> GetIncludes(params System.Linq.Expressions.Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = this._dbSet.Include(includes[0]);
            foreach (var include in includes.Skip(1))
            {
                query = query.Include(include);
            }
            return query.ToList();
        }

        public virtual async Task<T> GetOne(int id)
        {
            return await this._dbSet.FindAsync(id);
        }

        public virtual bool Update(T obj)
        {
            this._dbSet.Update(obj);
            return true;
        }
    }
}
