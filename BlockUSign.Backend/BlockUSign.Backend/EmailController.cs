using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using SendGrid;
using SendGrid.Helpers.Mail;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BlockUSign.Backend
{
    [Route("api/[controller]")]
    public class EmailController : Controller
    {


        // Place to store the Config object and use in this controller
        private readonly IConfiguration Config;

        // Constructor that that takes IConfiguration is called on instantiation thanks to Dependency injection
        public EmailController(IConfiguration config)
        {
            Config = config;
        }



        // GET: api/email?subject=New Document to sign 1234&to=ntheile@gmail.com&content=sign this man
        [HttpGet]
        public async Task<IEnumerable<string>> Get(string subject, string to, string content)
        {

            var apiKey = Config["SendGridKey"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("blockusign@outlook.com", "Blockusign");
            var sub = subject; //"PLease review new document id ref1234";
            var too = new EmailAddress(to, "");
            //var plainTextContent = "and easy to do anywhere, even with C#";
            var htmlContent = content;//"<strong>and easy to do anywhere, even with C#</strong>";
            var msg = MailHelper.CreateSingleEmail(from, too, sub, null, htmlContent);
            var response = await client.SendEmailAsync(msg);


            var result = "error";
            if (response.StatusCode == System.Net.HttpStatusCode.Accepted){
                result = "ok";
            }
           
            return new string[] { result};
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
           
            return "value";
        }

        // POST api/values
        [HttpPost]
        public async Task<IEnumerable<string>> Post([FromBody]EmailJson value)
        {
            var apiKey = Config["SendGridKey"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("blockusign@outlook.com", "Blockusign");
            var sub = value.subject; //"PLease review new document id ref1234";
            var too = new EmailAddress(value.to, "");
            //var plainTextContent = "and easy to do anywhere, even with C#";
            var htmlContent = value.content;//"<strong>and easy to do anywhere, even with C#</strong>";
            var msg = MailHelper.CreateSingleEmail(from, too, sub, null, htmlContent);
            var response = await client.SendEmailAsync(msg);


            var result = "error";
            if (response.StatusCode == System.Net.HttpStatusCode.Accepted)
            {
                result = "ok";
            }

            return new string[] { result };

        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }

    public class EmailJson
    {
        public string to { get; set; }
        public string content { get; set; }
        public string subject { get; set; }
    }
}
