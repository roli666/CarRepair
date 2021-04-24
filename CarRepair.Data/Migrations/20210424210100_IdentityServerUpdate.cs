using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CarRepair.Data.Migrations
{
    public partial class IdentityServerUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "51C5B017-884C-4A59-8838-92A891F389AB", "5B909B9F-ED94-4973-B762-58EFD8C671DF" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "51C5B017-884C-4A59-8838-92A891F389AB");

            migrationBuilder.AddColumn<DateTime>(
                name: "ConsumedTime",
                table: "PersistedGrants",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "PersistedGrants",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SessionId",
                table: "PersistedGrants",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "DeviceCodes",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SessionId",
                table: "DeviceCodes",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5B909B9F-ED94-4973-B762-58EFD8C671DF",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "40153cd4-a68d-4e2e-ab24-3f08c7fef32d", "AQAAAAEAACcQAAAAEA3Y/yCrvx2LNzBuveVNxd/gGJOgWznAvAw3Oz/fgva6GG1J0+NPBKRkMAfdcH3hRg==", "d7b2b7aa-4c78-433d-a6bd-56e10f9d8664" });

            migrationBuilder.CreateIndex(
                name: "IX_PersistedGrants_SubjectId_SessionId_Type",
                table: "PersistedGrants",
                columns: new[] { "SubjectId", "SessionId", "Type" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PersistedGrants_SubjectId_SessionId_Type",
                table: "PersistedGrants");

            migrationBuilder.DropColumn(
                name: "ConsumedTime",
                table: "PersistedGrants");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "PersistedGrants");

            migrationBuilder.DropColumn(
                name: "SessionId",
                table: "PersistedGrants");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "DeviceCodes");

            migrationBuilder.DropColumn(
                name: "SessionId",
                table: "DeviceCodes");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "51C5B017-884C-4A59-8838-92A891F389AB", "a0c29b99-6302-42a3-93ac-8489bf93b145", "Admin", "Admin" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5B909B9F-ED94-4973-B762-58EFD8C671DF",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "5eb4975b-8b86-4c25-90cc-f4378594329b", "AQAAAAEAACcQAAAAEE3391uPV3ouDjx/8J4o+7Uc50itWK/a4fgQ1O7BQw1/8WczTTen089hVsX3CPGhqA==", "205248be-6785-403b-b2af-d42d54ae8bf4" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "51C5B017-884C-4A59-8838-92A891F389AB", "5B909B9F-ED94-4973-B762-58EFD8C671DF" });
        }
    }
}
