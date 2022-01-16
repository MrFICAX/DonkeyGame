using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DonkeyGameAPI.Migrations
{
    public partial class AddGameOwnerIDTimestamp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GameOwnerID",
                table: "Games",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GameOwnerID",
                table: "Games");
        }
    }
}
