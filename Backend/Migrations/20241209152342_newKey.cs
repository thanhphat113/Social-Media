using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class newKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "media_message");

            migrationBuilder.AlterColumn<int>(
                name: "created_by_user_id",
                table: "posts",
                type: "int(11)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int(11)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_posts_created_by_user_id",
                table: "posts");

            migrationBuilder.DropTable(
                name: "MediaMessage");

            migrationBuilder.AlterColumn<int>(
                name: "created_by_user_id",
                table: "posts",
                type: "int(11)",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int(11)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "media_message",
                columns: table => new
                {
                    media_id = table.Column<int>(type: "int(11)", nullable: false),
                    message_id = table.Column<int>(type: "int(11)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_media_message", x => new { x.media_id, x.message_id });
                    table.ForeignKey(
                        name: "fk_media_message",
                        column: x => x.media_id,
                        principalTable: "media",
                        principalColumn: "media_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_message_media",
                        column: x => x.message_id,
                        principalTable: "messages",
                        principalColumn: "messages_id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_media_message_message_id",
                table: "media_message",
                column: "message_id");

            migrationBuilder.AddForeignKey(
                name: "fk_posts_created_by_user_id",
                table: "posts",
                column: "created_by_user_id",
                principalTable: "users",
                principalColumn: "user_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
