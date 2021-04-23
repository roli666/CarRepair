using Microsoft.EntityFrameworkCore.Migrations;

namespace CarRepair.Data.Migrations
{
    public partial class AddedNamesToUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Firstname",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Lastname",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Firstname",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Lastname",
                table: "AspNetUsers");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "51C5B017-884C-4A59-8838-92A891F389AB",
                column: "ConcurrencyStamp",
                value: "ae461381-1314-428b-8643-5cc8a4e1e8ca");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5B909B9F-ED94-4973-B762-58EFD8C671DF",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "886b6ede-9c74-4703-8438-53e6870fa54c", "AQAAAAEAACcQAAAAEKRYx4VxgBR+iowDdqbzrTT+I4sDankgGn7ZfautKywpa0+/vOGm6WL+3WQZoTMjyQ==", "54c9b233-49cc-4c01-b267-b10f68f58031" });
        }
    }
}
