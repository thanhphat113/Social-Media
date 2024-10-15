using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;

namespace Backend.Authentication;

public class JwtToken
{
    private readonly IConfiguration _configuration;

    public JwtToken(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateJwtToken(string userId)
    {
        var claims = new[]
        {
            new Claim("id", userId),  // Thêm ID người dùng vào claims
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // JTI mới cho mỗi token
            new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()), // Thêm thời gian phát hành
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpireMinutes"])), // Thời gian hết hạn
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
