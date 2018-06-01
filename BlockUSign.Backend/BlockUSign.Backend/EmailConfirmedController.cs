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
using RestSharp;
using Newtonsoft.Json.Linq;
using MebiusLib;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BlockUSign.Backend
{
    [Route("api/[controller]")]
    public class EmailConfirmedController : Controller
    {


        // Place to store the Config object and use in this controller
        private readonly IConfiguration Config;

        // Constructor that that takes IConfiguration is called on instantiation thanks to Dependency injection
        public EmailConfirmedController(IConfiguration config)
        {
            Config = config;
        }



        // GET: api/emailconfirm
        [HttpGet]
        public async Task<string> Get()
        {

            //@todo check if the code matches...if so you can write to the global profile index

            var password = Config["EmailConfirmKey"];
            var client = new RestClient("https://gaia.blockstack.org/hub/18kTskBpTh1mznsypu1fhJ27dxbC1SwXEK/d15adc7a-c4bf-cc20-b88a-e6c29f2adcde.annotations.json");
            var request = new RestRequest(Method.GET);
            IRestResponse response = await client.ExecuteAsync(request);
            string encryptedData = response.Content;
      
            SJCLDecryptor sd = new SJCLDecryptor(encryptedData, password);
            string decodedString = sd.Plaintext;

            return decodedString;

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
