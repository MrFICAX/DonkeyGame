using Microsoft.EntityFrameworkCore;

namespace DonkeyGameAPI.Models
{
    public class DonkeyGameContext : DbContext
    {
        public DonkeyGameContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Card> Cards { get; set; }

        public DbSet<Game> Games { get; set; }
        public DbSet<PlayerState> Players { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<ChatMessage> Messages { get; set; }

    }
}