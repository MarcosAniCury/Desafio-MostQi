using System.Text;

namespace MostQuotation
{
    public class Settings
    {
        public static string Secret = "24ea913efda289dc1b17d80ab567c21e0f051b26f7a4bb65b1e70817febb6b4f";
        public static string API_KEY_CURRENCYSCOOP = "21b6ab62444f0780e42d07393f8df47a";

        public static int TimeToExpiredToken = 24;

        public static string UrlFront = "https://localhost:44436/";
        public static string UrlCurrencyScoop = "https://api.currencyscoop.com/v1/latest?api_key=";

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
