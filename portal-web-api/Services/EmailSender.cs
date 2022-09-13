using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using portal_web_api.Models;
using portal_web_api.Services.Repository;

namespace portal_web_api.Services
{
    public class EmailSender : IEmailSenderRepository
    {
        private readonly EmailConfiguration _emailConfiguration;

        public EmailSender(IOptions<EmailConfiguration> emailConfiguration) 
        {
            _emailConfiguration = emailConfiguration.Value;
        }

        public async Task SendEmailAsync(string email, string subject, string messageText, string messageHtml)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_emailConfiguration.NameSender, _emailConfiguration.EmailSender));
            message.To.Add(MailboxAddress.Parse(email));

            message.Subject = subject;
            var bodyBuilder = new BodyBuilder { TextBody = messageText, HtmlBody = messageHtml };
            message.Body = bodyBuilder.ToMessageBody();

            try
            {
                var smtpClient = new SmtpClient();
                smtpClient.ServerCertificateValidationCallback = (s, c, h, e) => true;
                await smtpClient.ConnectAsync(_emailConfiguration.AdressServerEmail).ConfigureAwait(false);
                await smtpClient.AuthenticateAsync(_emailConfiguration.EmailSender, _emailConfiguration.Password).ConfigureAwait(false);
                await smtpClient.SendAsync(message).ConfigureAwait(false);
                await smtpClient.DisconnectAsync(true).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(ex.Message);
            }
        }
    }
}
