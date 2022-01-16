using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DonkeyGameAPI.Migrations
{
    public partial class CardModified : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSpecial",
                table: "Cards");

            migrationBuilder.RenameColumn(
                name: "Number",
                table: "Cards",
                newName: "Value");

            migrationBuilder.RenameColumn(
                name: "ImageName",
                table: "Cards",
                newName: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Value",
                table: "Cards",
                newName: "Number");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Cards",
                newName: "ImageName");

            migrationBuilder.AddColumn<bool>(
                name: "IsSpecial",
                table: "Cards",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
