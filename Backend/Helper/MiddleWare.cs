using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Backend.Models;



namespace Backend.Helper
{
	public static class MiddleWare
	{
		private static IHttpContextAccessor _httpContextAccessor;

		public static void Configure(IHttpContextAccessor httpContextAccessor)
		{
			_httpContextAccessor = httpContextAccessor;
		}
		public static int GetUserIdFromCookie(HttpRequest request)
		{
			var token = request.Cookies["Security"];
			if (string.IsNullOrEmpty(token))
			{
				return -1;
			}

			var tokenHandler = new JwtSecurityTokenHandler();
			var jwtToken = tokenHandler.ReadJwtToken(token);
			var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

			return int.Parse(userId);
		}

		public static Media GetFullSrc(Media item)
		{
			string type = item.MediaType == 3 ? "file" : "media";
			if (!item.Src.StartsWith($"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}/"))
				item.Src = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}/{type}/{item.Src}";
			return item;
		}

		public static async Task<string> GetFileHashAsync(IFormFile file)
		{
			using var sha256 = SHA256.Create();
			using var stream = file.OpenReadStream();
			var hashBytes = await sha256.ComputeHashAsync(stream);

			return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
		}
	}
}