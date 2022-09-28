using System.Text;

namespace MostQuotation
{
    public class Settings
    {
        public static string Secret = "24ea913efda289dc1b17d80ab567c21e0f051b26f7a4bb65b1e70817febb6b4f";

        public static int TimeToExpiredToken = 24;

        public static string UrlFront = "https://localhost:3000/";

        public static string UrlMostQIAuthenticate = "https://mostqiapi.com/user/authenticate";

        public static string UrlMostQIDocumentExtraction = "https://mostqiapi.com/process-image/content-extraction";

        public static string TokenMostQIAuthenticate = "9209ca172e5c481186c4055ca7d6c525";

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
