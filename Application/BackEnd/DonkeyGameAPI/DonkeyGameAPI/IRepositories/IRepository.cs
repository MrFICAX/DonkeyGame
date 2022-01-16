using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;


namespace DonkeyGameAPI.IRepositories
{
    public interface IRepository<T> where T : class
    {
        Task<T> GetOne(int id);
        bool Add(T obj);
        bool Delete(T obj);
        bool Update(T obj);
        Task<IEnumerable<T>> GetAll();
        IEnumerable<T> GetIncludes(params Expression<Func<T, object>>[] includes);
        IEnumerable<T> GetInclude(string navigationPropertyPath);
    }
}