using portal_web_api.Models;

namespace portal_web_api.Data.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAllClients();
        User FindById(string id);
        User FindByNameAndPassword(string name, string password);
        User FindByNameAndEmail(string name, string email);
        List<User> FindByNameLike(string name);
        List<User> FindByNameLikeAndCollaboratorLike(string name, string collaborator);
        User FindByName(string name);
        User Create(User user);
        void Update(User user);
        void Delete(User user);
    }
}
