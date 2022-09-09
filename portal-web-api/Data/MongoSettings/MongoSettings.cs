namespace portal_web_api.Data.MongoSettings
{
    public class MongoSettings : IMongoSettings
    {
        public string DatabaseName { get; set; }
        public string Connection { get; set; }
    }
}
