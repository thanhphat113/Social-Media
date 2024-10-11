using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

public partial class User
{
    public int UserId { get; set; }

    public string FirstName { get; set; } = null!;


    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    [Column("password")]
    public string Password { get; set; } = null!;
    [Column("bio")]
    public string? Bio { get; set; }
    [Column("location")]
    public string Location { get; set; } = null!;
    [Column("profile_picture")]
    public int? ProfilePicture { get; set; }
    [Column("cover_photo")]
    public int? CoverPhoto { get; set; }
    [Column("date_created")]
    public DateTime DateCreated { get; set; }
    [Column("date_updated")]

    public DateTime DateUpdated { get; set; }

    public virtual ICollection<ChatInGroup> ChatInGroups { get; set; } = new List<ChatInGroup>();

    public virtual ICollection<ChatInMessage> ChatInMessages { get; set; } = new List<ChatInMessage>();

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual Media? CoverPhotoNavigation { get; set; }

    public virtual ICollection<HistorySearch> HistorySearchFromUserNavigations { get; set; } = new List<HistorySearch>();

    public virtual ICollection<HistorySearch> HistorySearchOtherUserNavigations { get; set; } = new List<HistorySearch>();

    public virtual ICollection<Message> MessageUser1Navigations { get; set; } = new List<Message>();

    public virtual ICollection<Message> MessageUser2Navigations { get; set; } = new List<Message>();

    public virtual ICollection<PostNotificationToUser> PostNotificationToUsers { get; set; } = new List<PostNotificationToUser>();

    public virtual ICollection<PostNotification> PostNotifications { get; set; } = new List<PostNotification>();

    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();

    public virtual Media? ProfilePictureNavigation { get; set; }

    public virtual ICollection<ReactsPost> ReactsPosts { get; set; } = new List<ReactsPost>();

    public virtual ICollection<Relationship> RelationshipFromUsers { get; set; } = new List<Relationship>();

    public virtual ICollection<Relationship> RelationshipToUsers { get; set; } = new List<Relationship>();

    public virtual ICollection<RequestNotification> RequestNotificationFromUsers { get; set; } = new List<RequestNotification>();

    public virtual ICollection<RequestNotification> RequestNotificationToUsers { get; set; } = new List<RequestNotification>();

    public virtual ICollection<SharePost> SharePosts { get; set; } = new List<SharePost>();

    public virtual ICollection<UserGroup> UserGroups { get; set; } = new List<UserGroup>();

    public virtual ICollection<UserInGroup> UserInGroups { get; set; } = new List<UserInGroup>();

    public virtual ICollection<GroupChat> GroupChats { get; set; } = new List<GroupChat>();

    public virtual ICollection<Media> Media { get; set; } = new List<Media>();

    public virtual ICollection<React> Reacts { get; set; } = new List<React>();
}
