using portal_web_api.Models;

namespace portal_web_api.Data.Repositories
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAll();
        User FindById(string id);
        User Create(User user);
        void Update(User user);
        void Delete(User user);
    }
}
