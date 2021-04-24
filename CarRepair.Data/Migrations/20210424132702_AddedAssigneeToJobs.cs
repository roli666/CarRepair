using Microsoft.EntityFrameworkCore.Migrations;

namespace CarRepair.Data.Migrations
{
    public partial class AddedAssigneeToJobs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AssignedToId",
                table: "Jobs",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "51C5B017-884C-4A59-8838-92A891F389AB",
                column: "ConcurrencyStamp",
                value: "a0c29b99-6302-42a3-93ac-8489bf93b145");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5B909B9F-ED94-4973-B762-58EFD8C671DF",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "5eb4975b-8b86-4c25-90cc-f4378594329b", "AQAAAAEAACcQAAAAEE3391uPV3ouDjx/8J4o+7Uc50itWK/a4fgQ1O7BQw1/8WczTTen089hVsX3CPGhqA==", "205248be-6785-403b-b2af-d42d54ae8bf4" });

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_AssignedToId",
                table: "Jobs",
                column: "AssignedToId");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_AspNetUsers_AssignedToId",
                table: "Jobs",
                column: "AssignedToId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_AspNetUsers_AssignedToId",
                table: "Jobs");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_AssignedToId",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "AssignedToId",
                table: "Jobs");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "51C5B017-884C-4A59-8838-92A891F389AB",
                column: "ConcurrencyStamp",
                value: "d10f5b32-10e1-4ffc-b9ad-49eaada4b0f4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5B909B9F-ED94-4973-B762-58EFD8C671DF",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "8dbb31b6-7265-422e-b5fa-db81b4c087c0", "AQAAAAEAACcQAAAAEOtEJvFDXQojQrK42NJ1LYL1yznI/geDok9zwobFTA1B7gUbEB4mLdt0Q3Aozhp0Dg==", "5d488afa-8571-4f6d-ba28-3ce20614a465" });
        }
    }
}
