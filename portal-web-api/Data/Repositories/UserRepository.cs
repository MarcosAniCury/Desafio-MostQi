using MongoDB.Bson;
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

        public List<User> GetAllClients()
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

        public List<User> FindByNameLike(string name)
        {
            var filter = new BsonDocument { { "Type", "client" } };
            if (name != null)
            {
                filter.Add("Name", new BsonDocument { { "$regex", name }, { "$options", "i" } });
            }
            return _dbCollection.Find(filter).ToList();
        }

        public List<User> FindByNameLikeAndCollaboratorLike(string name, string collaborator)
        {
            var filter = new BsonDocument { { "Type", "client" } };
            if (name != null)
            {
                filter.Add("Name", new BsonDocument { { "$regex", name }, { "$options", "i" } });
            }
            if (collaborator != null)
            {
                filter.Add("Collaborator", new BsonDocument { { "$regex", collaborator }, { "$options", "i" } });
            }
            return _dbCollection.Find(filter).ToList();
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
