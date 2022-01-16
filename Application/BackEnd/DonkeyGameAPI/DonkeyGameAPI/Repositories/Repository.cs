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
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly DonkeyGameContext _context;
        protected DbSet<T> _dbSet;

        public Repository(DonkeyGameContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public virtual bool Add(T obj)
        {
            _dbSet.AddAsync(obj);
            return true;
        }

        public virtual bool Delete(T obj)
        {
            _dbSet.Remove(obj);
            return true;
        }

        public virtual async Task<IEnumerable<T>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        public virtual IEnumerable<T> GetIncludes(params System.Linq.Expressions.Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbSet.Include(includes[0]);
            foreach (var include in includes.Skip(1))
            {
                query = query.Include(include);
            }
            return query.ToList();
        }

        public virtual IEnumerable<T> GetInclude(string navigationPropertyPath)
        {
            IQueryable<T> query = _dbSet.Include(navigationPropertyPath);            
            return query.ToList();
        }



        public virtual async Task<T> GetOne(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public virtual bool Update(T obj)
        {
            _dbSet.Update(obj);
            return true;
        }
    }
}
