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
    public class ChatMessageRepository : Repository<ChatMessage>, IChatMessageRepository
    {
        public ChatMessageRepository(DonkeyGameContext context) : base(context)
        {
        }

        public override bool Add(ChatMessage entity)
        {
           return base.Add(entity);
        }
        public override bool Delete(ChatMessage obj)
        {
            this._context.Set<ChatMessage>().Remove(obj);
            return true;
        }

        public override Task<List<ChatMessage>> GetAll()
        {
            return base.GetAll();
        }

        public override Task<ChatMessage> GetOne(int id)
        {
            return base.GetOne(id);
        }

        public override bool Update(ChatMessage entity)
        {
            return base.Update(entity);
        }
    }
}
