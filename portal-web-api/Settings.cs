using System.Text;

namespace portal_web_api
{
    public class Settings
    {
        public static string Secret = "24ea913efda289dc1b17d80ab567c21e0f051b26f7a4bb65b1e70817febb6b4f";

        public static int TimeToExpiredToken = 24;

        public static byte[] getSecretByte()
        {
            return Encoding.ASCII.GetBytes(Settings.Secret);
        }

        public static DateTime getTimeExpiredToken()
        {
            return DateTime.UtcNow.AddHours(TimeToExpiredToken);
        }
    }
}
