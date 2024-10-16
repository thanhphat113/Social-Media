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
            new Claim("id", userId),  
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // JTI mới cho mỗi token
            new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()), // Thêm thời gian phát hành
        };

        var keyValue = _configuration["Jwt:Key"];
        
        if (string.IsNullOrEmpty(keyValue))
        {
            Console.WriteLine("Jwt:Key cannot be null or empty");
        }


        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyValue));
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
