using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using DataAccess;
using Services.Services;
using Services.Interfaces;
using Repository;
using Repository.Repositories;
using Repository.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
            {
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "DonkeyGame", Version = "v1" });
});
builder.Services.AddCors(p => {
    p.AddPolicy("CORS", builder =>
    {
        builder.AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin();
    });
});

var connStr = builder.Configuration.GetConnectionString("CSDonkeyGame");
Console.WriteLine("Konekcioni string je: "+connStr);
builder.Services.AddDbContext<DonkeyGameContext>(options => {
    options.UseSqlServer(connStr);
});

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<ICardRepository, CardRepository>();
builder.Services.AddScoped<IChatMessageRepository, ChatMessageRepository>();
builder.Services.AddScoped<IGameRepository, GameRepository>();
builder.Services.AddScoped<IPlayerStateRepository, PlayerStateRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICardService, CardService>();
builder.Services.AddScoped<IChatMessageService, ChatMessageService>();
builder.Services.AddScoped<IGameService, GameService>();
builder.Services.AddScoped<IPlayerStateService, PlayerStateService>();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CORS");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
