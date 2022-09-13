namespace portal_web_api.Services.Repository
{
    public interface IEmailSenderRepository
    {
        Task SendEmailAsync(string email, string subject, string messageText, string messageHtml);
    }
}
