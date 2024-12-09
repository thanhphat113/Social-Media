namespace Backend.DTO;

public class UserGroupDTO
{
    public string GroupName { get; set; } = null!;
    public string? Bio { get; set; }
    public int CreatedByUserId { get; set; }
    public int? PrivacyId { get; set; }
}