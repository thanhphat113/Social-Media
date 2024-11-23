using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class ChangeChatInMessage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_file",
                table: "chat_in_message");

            migrationBuilder.AlterColumn<string>(
                name: "content",
                table: "chat_in_message",
                type: "varchar(255)",
                maxLength: 255,
                nullable: true,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldMaxLength: 255)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.AddColumn<int>(
                name: "media_id",
                table: "chat_in_message",
                type: "int(1)",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "date_created",
                table: "chat_in_group",
                type: "timestamp",
                nullable: true,
                defaultValueSql: "current_timestamp()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp",
                oldDefaultValueSql: "current_timestamp()");

            migrationBuilder.AlterColumn<string>(
                name: "content",
                table: "chat_in_group",
                type: "text",
                nullable: true,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "text")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.AddColumn<bool>(
                name: "is_read",
                table: "chat_in_group",
                type: "tinyint(1)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_recall",
                table: "chat_in_group",
                type: "tinyint(1)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "media_id",
                table: "chat_in_group",
                type: "int(11)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_chat_in_message_media_id",
                table: "chat_in_message",
                column: "media_id");

            migrationBuilder.CreateIndex(
                name: "IX_chat_in_group_media_id",
                table: "chat_in_group",
                column: "media_id");

            migrationBuilder.AddForeignKey(
                name: "fk_chatInGroup_media",
                table: "chat_in_group",
                column: "media_id",
                principalTable: "media",
                principalColumn: "media_id");

            migrationBuilder.AddForeignKey(
                name: "fk_media_chat",
                table: "chat_in_message",
                column: "media_id",
                principalTable: "media",
                principalColumn: "media_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_chatInGroup_media",
                table: "chat_in_group");

            migrationBuilder.DropForeignKey(
                name: "fk_media_chat",
                table: "chat_in_message");

            migrationBuilder.DropIndex(
                name: "IX_chat_in_message_media_id",
                table: "chat_in_message");

            migrationBuilder.DropIndex(
                name: "IX_chat_in_group_media_id",
                table: "chat_in_group");

            migrationBuilder.DropColumn(
                name: "media_id",
                table: "chat_in_message");

            migrationBuilder.DropColumn(
                name: "is_read",
                table: "chat_in_group");

            migrationBuilder.DropColumn(
                name: "is_recall",
                table: "chat_in_group");

            migrationBuilder.DropColumn(
                name: "media_id",
                table: "chat_in_group");

            migrationBuilder.UpdateData(
                table: "chat_in_message",
                keyColumn: "content",
                keyValue: null,
                column: "content",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "content",
                table: "chat_in_message",
                type: "varchar(255)",
                maxLength: 255,
                nullable: false,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldMaxLength: 255,
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.AddColumn<bool>(
                name: "is_file",
                table: "chat_in_message",
                type: "tinyint(1)",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "date_created",
                table: "chat_in_group",
                type: "timestamp",
                nullable: false,
                defaultValueSql: "current_timestamp()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp",
                oldNullable: true,
                oldDefaultValueSql: "current_timestamp()");

            migrationBuilder.UpdateData(
                table: "chat_in_group",
                keyColumn: "content",
                keyValue: null,
                column: "content",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "content",
                table: "chat_in_group",
                type: "text",
                nullable: false,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");
        }
    }
}
