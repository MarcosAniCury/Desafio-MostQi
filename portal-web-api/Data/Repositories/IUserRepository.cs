using portal_web_api.Models;

namespace portal_web_api.Data.Repositories
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAllClients();
        User FindById(string id);
        User FindByNameAndPassword(string name, string password);
        User FindByNameAndEmail(string name, string email);
        User FindByName(string name);
        User Create(User user);
        void Update(User user);
        void Delete(User user);
    }
}
