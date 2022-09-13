namespace portal_web_api.Models
{
    public class EmailConfiguration
    {
        public string NameSender { get; set; }
        public string EmailSender { get; set; }
        public string Password { get; set; }
        public string AdressServerEmail { get; set; }
        public string EmailServerPort { get; set; }
        public bool UseSSL { get; set; }
    }
}
