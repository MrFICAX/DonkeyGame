using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;


namespace Repository
{
    public interface IRepository<T> where T : class
    {
        Task<T> GetOne(int id);
        bool Add(T obj);
        bool Delete(T obj);
        bool Update(T obj);
        Task<List<T>> GetAll();
        IEnumerable<T> GetIncludes(params Expression<Func<T, Object>>[] includes);

    }
}