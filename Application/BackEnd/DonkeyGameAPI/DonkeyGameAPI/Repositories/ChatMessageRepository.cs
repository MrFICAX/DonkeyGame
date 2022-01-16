using DonkeyGameAPI.IRepositories;
using DonkeyGameAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DonkeyGameAPI.Repositories
{
    public class ChatMessageRepository : Repository<ChatMessage>, IChatMessageRepository
    {
        public ChatMessageRepository(DonkeyGameContext context) : base(context)
        {
        }

        public override Task<bool> Add(ChatMessage entity)
        {
            return base.Add(entity);
        }
        public override bool Delete(ChatMessage obj)
        {
            _context.Set<ChatMessage>().Remove(obj);
            return true;
        }

        public override Task<IEnumerable<ChatMessage>> GetAll()
        {
            return base.GetAll();
        }

        public override Task<ChatMessage?> GetOne(int id)
        {
            return base.GetOne(id);
        }

        public override bool Update(ChatMessage entity)
        {
            return base.Update(entity);
        }
    }
}
