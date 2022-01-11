using DataAccess;
using Repository.Interfaces;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DonkeyGameContext donkeyGameContext;

        private ICardRepository cardRepository;
        private IChatMessageRepository chatMessageRepository;
        private IGameRepository gameRepository;
        private IUserRepository userRepository;
        private IPlayerStateRepository playerStateRepository;

        public UnitOfWork(DonkeyGameContext context)
        {
            this.donkeyGameContext = context;
            //cardRepository = new CardRepository(donkeyGameContext);
            //chatMessageRepository = new ChatMessageRepository(donkeyGameContext);
            //gameRepository = new GameRepository(donkeyGameContext);
            //userRepository = new UserRepository(donkeyGameContext);
            //playerStateRepository = new PlayerStateRepository(donkeyGameContext);
        }

        #region SingletonPropertiesForRepositories

        public ICardRepository CardRepository 
        { 
            get
            {
                if (cardRepository == null)
                    cardRepository = new CardRepository(donkeyGameContext);
                return cardRepository;
            }
        }
        public IChatMessageRepository ChatMessageRepository
        {
            get
            {
                if (chatMessageRepository == null)
                    chatMessageRepository = new ChatMessageRepository(donkeyGameContext);
                return chatMessageRepository;
            }
        }
        public IGameRepository GameRepository
        {
            get
            {
                if (gameRepository == null)
                    gameRepository = new GameRepository(donkeyGameContext);
                return gameRepository;
            }
        }
        public IPlayerStateRepository PlayerStateRepository 
        {
            get
            {
                if (playerStateRepository == null)
                    playerStateRepository = new PlayerStateRepository(donkeyGameContext);
                return playerStateRepository;
            }
        }
        public IUserRepository UserRepository 
        {
            get
            {
                if (userRepository == null)
                    userRepository = new UserRepository(donkeyGameContext);
                return userRepository;
            }
        }

        #endregion

        public async Task CompleteAsync()
        {
            await donkeyGameContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            donkeyGameContext.Dispose();
        }
    }
}
