using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class MessageMedia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "media_message");

            migrationBuilder.CreateTable(
                name: "MediaMessage",
                columns: table => new
                {
                    MediasMediaId = table.Column<int>(type: "int(11)", nullable: false),
                    MessageMediaMessagesId = table.Column<int>(type: "int(11)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediaMessage", x => new { x.MediasMediaId, x.MessageMediaMessagesId });
                    table.ForeignKey(
                        name: "FK_MediaMessage_media_MediasMediaId",
                        column: x => x.MediasMediaId,
                        principalTable: "media",
                        principalColumn: "media_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MediaMessage_messages_MessageMediaMessagesId",
                        column: x => x.MessageMediaMessagesId,
                        principalTable: "messages",
                        principalColumn: "messages_id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_MediaMessage_MessageMediaMessagesId",
                table: "MediaMessage",
                column: "MessageMediaMessagesId");
        }
    }
}
