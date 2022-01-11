using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface IUnitOfWork : IDisposable
    {
        ICardRepository CardRepository { get;}

        IChatMessageRepository ChatMessageRepository { get;}  

        IGameRepository GameRepository { get;}

        IPlayerStateRepository PlayerStateRepository { get;}  

        IUserRepository UserRepository { get;}

        Task CompleteAsync();


    }
}
