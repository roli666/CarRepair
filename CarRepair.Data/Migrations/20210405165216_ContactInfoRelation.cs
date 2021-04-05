using Microsoft.EntityFrameworkCore.Migrations;

namespace CarRepair.Data.Migrations
{
    public partial class ContactInfoRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PhoneContact_Clients_ClientId",
                table: "PhoneContact");

            migrationBuilder.DropForeignKey(
                name: "FK_PhoneContact_ContactInfo_ContactInfoEmail",
                table: "PhoneContact");

            migrationBuilder.DropIndex(
                name: "IX_PhoneContact_ClientId",
                table: "PhoneContact");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "PhoneContact");

            migrationBuilder.RenameColumn(
                name: "ContactInfoEmail",
                table: "PhoneContact",
                newName: "ContactInfoId");

            migrationBuilder.RenameIndex(
                name: "IX_PhoneContact_ContactInfoEmail",
                table: "PhoneContact",
                newName: "IX_PhoneContact_ContactInfoId");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Clients",
                newName: "Lastname");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Clients",
                newName: "Firstname");

            migrationBuilder.AddForeignKey(
                name: "FK_PhoneContact_ContactInfo_ContactInfoId",
                table: "PhoneContact",
                column: "ContactInfoId",
                principalTable: "ContactInfo",
                principalColumn: "Email",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PhoneContact_ContactInfo_ContactInfoId",
                table: "PhoneContact");

            migrationBuilder.RenameColumn(
                name: "ContactInfoId",
                table: "PhoneContact",
                newName: "ContactInfoEmail");

            migrationBuilder.RenameIndex(
                name: "IX_PhoneContact_ContactInfoId",
                table: "PhoneContact",
                newName: "IX_PhoneContact_ContactInfoEmail");

            migrationBuilder.RenameColumn(
                name: "Lastname",
                table: "Clients",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "Firstname",
                table: "Clients",
                newName: "FirstName");

            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "PhoneContact",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PhoneContact_ClientId",
                table: "PhoneContact",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_PhoneContact_Clients_ClientId",
                table: "PhoneContact",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PhoneContact_ContactInfo_ContactInfoEmail",
                table: "PhoneContact",
                column: "ContactInfoEmail",
                principalTable: "ContactInfo",
                principalColumn: "Email",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
