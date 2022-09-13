namespace portal_web_api.Data.MongoSettings
{
    public interface IMongoSettings
    {
        string DatabaseName { get; set; }

        string Connection { get; set; }
    }
}
