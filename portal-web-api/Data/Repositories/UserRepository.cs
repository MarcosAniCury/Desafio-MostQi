using MongoDB.Driver;
using portal_web_api.Data.MongoSettings;
using portal_web_api.Models;

namespace portal_web_api.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _dbCollection;

        public UserRepository(IMongoSettings mongoSettings)
        {
            var client = new MongoClient(mongoSettings.Connection);
            var database = client.GetDatabase(mongoSettings.DatabaseName);

            _dbCollection = database.GetCollection<User>(typeof(User).Name);
        }

        public User Create(User user)
        {
            _dbCollection.InsertOne(user);
            return user;
        }

        public void Delete(User user)
        {
            _dbCollection.DeleteOne(users => users.Id == user.Id);
        }

        public IEnumerable<User> GetAll()
        {
            return _dbCollection.Find(user => true).ToList();
        }


        public User FindById(string id)
        {
            return _dbCollection.Find(user => user.Id == id).FirstOrDefault();
        }

        public void Update(User user)
        {
            _dbCollection.ReplaceOne(users => users.Id == user.Id, user);
        }
    }
}
