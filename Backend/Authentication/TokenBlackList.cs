namespace Backend.Authentication;
public static class TokenBlacklist
{
    private static Dictionary<string, DateTime> _blacklist = new Dictionary<string, DateTime>();
	private static readonly TimeSpan _expirationDuration = TimeSpan.FromMinutes(30);

    public static void AddToBlacklist(string jti)
    {
        _blacklist[jti] = DateTime.UtcNow;
    }

    public static bool IsInBlacklist(string jti)
    {
		RemoveExpiredTokens();
        return _blacklist.ContainsKey(jti);
    }

	private static void RemoveExpiredTokens()
    {
        var expiredTokens = _blacklist.Where(kvp => DateTime.UtcNow - kvp.Value > _expirationDuration).Select(kvp => kvp.Key).ToList();

        foreach (var token in expiredTokens)
        {
            _blacklist.Remove(token);
        }
    }

}
