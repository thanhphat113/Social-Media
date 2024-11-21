﻿using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Message
{
    public int MessagesId { get; set; }

    public int User1 { get; set; }
    public string? NickName1 { get; set; } = null;

    public int User2 { get; set; }
    public string? NickName2 { get; set; } = null;

    public int? MainTopic { get; set; } = 1;

    public virtual ICollection<ChatInMessage> ChatInMessages { get; set; } = new List<ChatInMessage>();

    public virtual MainTopic? MainTopicNavigation { get; set; } = null;

    public virtual User User1Navigation { get; set; }

    public virtual User User2Navigation { get; set; }
}
