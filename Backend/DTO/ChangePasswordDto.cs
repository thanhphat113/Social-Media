using System.ComponentModel.DataAnnotations;

namespace Backend.DTO;

public class ChangePasswordDto
{
    
    [Required]
    public string CurrentPassword { get; set; }
    [Required]
    public string NewPassword { get; set; }
    [Required]
    public string ConfirmPassword { get; set; }
}