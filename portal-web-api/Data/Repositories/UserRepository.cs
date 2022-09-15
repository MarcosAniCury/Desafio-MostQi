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

        public IEnumerable<User> GetAllClients()
        {
            return _dbCollection.Find(user => user.Type == "client").ToList();
        }

        public User FindById(string id)
        {
            return _dbCollection.Find(user => user.Id == id).FirstOrDefault();
        }

        public User FindByNameAndPassword(string name, string password)
        {
            return _dbCollection.Find(user => user.Name == name && user.Password == password).FirstOrDefault();
        }

        public User FindByNameAndEmail(string name, string email)
        {
            return _dbCollection.Find(user => user.Name == name && user.Email == email).FirstOrDefault();
        }

        public User FindByName(string name)
        {
            return _dbCollection.Find(user => user.Name == name).FirstOrDefault();
        }

        public User Create(User user)
        {
            User findUser = FindByName(user.Name);
            if (findUser != null)
            {
                return null;
            }
            _dbCollection.InsertOne(user);
            return user;
        }

        public void Delete(User user)
        {
            _dbCollection.DeleteOne(users => users.Id == user.Id);
        }

        public void Update(User user)
        {
            _dbCollection.ReplaceOne(users => users.Id == user.Id, user);
        }
    }
}
