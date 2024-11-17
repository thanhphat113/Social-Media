using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "chat_in_group");

            migrationBuilder.DropTable(
                name: "chat_in_message");

            migrationBuilder.DropTable(
                name: "history_search");

            migrationBuilder.DropTable(
                name: "post_media");

            migrationBuilder.DropTable(
                name: "post_notifications");

            migrationBuilder.DropTable(
                name: "reacts_comment");

            migrationBuilder.DropTable(
                name: "reacts_post");

            migrationBuilder.DropTable(
                name: "read_message");

            migrationBuilder.DropTable(
                name: "relationship");

            migrationBuilder.DropTable(
                name: "request_notifications");

            migrationBuilder.DropTable(
                name: "share_posts");

            migrationBuilder.DropTable(
                name: "user_in_group");

            migrationBuilder.DropTable(
                name: "user_in_group_chat");

            migrationBuilder.DropTable(
                name: "user_media");

            migrationBuilder.DropTable(
                name: "type_post_notifications");

            migrationBuilder.DropTable(
                name: "comments");

            migrationBuilder.DropTable(
                name: "messages");

            migrationBuilder.DropTable(
                name: "type_relationship");

            migrationBuilder.DropTable(
                name: "group_chats");

            migrationBuilder.DropTable(
                name: "media");

            migrationBuilder.DropTable(
                name: "posts");

            migrationBuilder.DropTable(
                name: "main_topic");

            migrationBuilder.DropTable(
                name: "type_media");

            migrationBuilder.DropTable(
                name: "user_groups");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "privacy_settings");

            migrationBuilder.DropTable(
                name: "gender_type");
        }
    }
}
