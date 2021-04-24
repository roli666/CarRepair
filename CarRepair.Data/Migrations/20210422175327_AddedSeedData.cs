using Microsoft.EntityFrameworkCore.Migrations;

namespace CarRepair.Data.Migrations
{
    public partial class AddedSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "51C5B017-884C-4A59-8838-92A891F389AB",
                column: "ConcurrencyStamp",
                value: "9c3c2ba9-79a3-4f25-a79d-2315c985bc55");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5B909B9F-ED94-4973-B762-58EFD8C671DF",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "da3a4663-a317-46a1-9081-fa34755620da", "AQAAAAEAACcQAAAAEHe9iDMgMBavupt8Q30CgcxS4HGqTSS7puMGJx94kO4cnOoRGsgfL3MH2NNAPRIRqA==", "85402701-c3b7-4d96-bb14-a7d59bd4fc59" });
        }
    }
}