using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class readPost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "read_message");

            migrationBuilder.CreateTable(
                name: "post_user_read",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "int(11)", nullable: false),
                    post_id = table.Column<int>(type: "int(11)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_post_user_read", x => new { x.user_id, x.post_id });
                    table.ForeignKey(
                        name: "FK_post_user_read_posts_post_id",
                        column: x => x.post_id,
                        principalTable: "posts",
                        principalColumn: "post_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_post_user_read_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_post_user_read_post_id",
                table: "post_user_read",
                column: "post_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "post_user_read");

            migrationBuilder.CreateTable(
                name: "read_message",
                columns: table => new
                {
                    messages_id = table.Column<int>(type: "int(11)", nullable: true),
                    user_id = table.Column<int>(type: "int(11)", nullable: true),
                    is_read = table.Column<bool>(type: "tinyint(1)", nullable: true, defaultValueSql: "'0'")
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "read_message_ibfk_1",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "user_id");
                    table.ForeignKey(
                        name: "read_message_ibfk_2",
                        column: x => x.messages_id,
                        principalTable: "messages",
                        principalColumn: "messages_id");
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateIndex(
                name: "messages_id",
                table: "read_message",
                column: "messages_id");

            migrationBuilder.CreateIndex(
                name: "user_id",
                table: "read_message",
                column: "user_id");
        }
    }
}
