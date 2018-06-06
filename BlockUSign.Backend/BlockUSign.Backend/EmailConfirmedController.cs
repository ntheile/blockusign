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
using HttpLogger;



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


        // 1. generate code
        // 2. send email
        // GET: api/emailconfirmed?email=name@email.com
        [HttpGet]
        public async Task<string> Get(string email)
        {
            var password = Config["EmailConfirmKey"];
            var gaiaToken = Config["GaiaToken"];

          
            //var client3 = new RestClient("https://gaia.blockstack.org/hub/1PoZGGAuQ4yPj72TrXbG4pKbgB9tvCUqQ1/blockusign/email.confirmations.json");
            //var request3 = new RestRequest(Method.POST);
            //client3.AddDefaultHeader("Content-Type", "application/json");
            //client3.AddDefaultHeader("Authorization", "");
            //request3.AddParameter("application/json", "", ParameterType.RequestBody);

            //IRestResponse r3 = client3.Execute(request3);


            // 1. gererate code
            string code = Guid.NewGuid().ToString();

            SimpleEncypt simpleEncypt = new SimpleEncypt(password);
            // string strEncrypted = simpleEncypt.Encrypt("hi");
            //string strDecr = simpleEncypt.Decrypt(strEncrypted);


            // 2. query email.confirmations.json
            var client = new RestClient("https://gaia.blockstack.org/hub/1PoZGGAuQ4yPj72TrXbG4pKbgB9tvCUqQ1/blockusign/email.confirmations.json");
            var request = new RestRequest(Method.GET);
            IRestResponse response = await client.ExecuteAsync(request);
            string encryptedData = response.Content;
            string decodedString = simpleEncypt.Decrypt(encryptedData);

            EmailConfirmJson emailConfirmList = JsonConvert.DeserializeObject<EmailConfirmJson>(decodedString);

            if (emailConfirmList == null ){
                // search in list and addd
                emailConfirmList = new EmailConfirmJson();
                emailConfirmList.emailConfirms = new List<EmailConfirm>();
            }


            // 3. append or add new row for confimations
            EmailConfirm emailConfirms = new EmailConfirm { email = email, codes = new List<string> { code } };
            emailConfirmList.emailConfirms.Add(emailConfirms);
            string json = JsonConvert.SerializeObject(emailConfirmList);
            json = simpleEncypt.Encrypt(json);
            var client2 = new RestClient("https://gaia.blockstack.org/hub/1PoZGGAuQ4yPj72TrXbG4pKbgB9tvCUqQ1/blockusign/email.confirmations.json");
            var request2 = new RestRequest(Method.POST);
            request2.AddHeader("Content-Type", "application/json");
            request2.AddHeader("Authorization", gaiaToken);
            request2.AddParameter("application/json", json, ParameterType.RequestBody);

            IRestResponse r =  client2.Execute(request2);


            // 4. email the code to the user


            return "ok";
        }


        // 1. confirm email
        // 2. purge old code from list
        // 3. write to global.profile and match email with 
        [HttpGet("{email}/{code}")]
        public async Task<string> Get(string email, string code)
        {
            var loggingHandler = new HttpLoggingHandler(new HttpClientHandler(),
                                            RequestAction,
                                            ResponseAction);

            //@todo check if the code matches...if so you can write to the global profile index
            //HttpClient client44 = new HttpClient(loggingHandler);

            //client44.DefaultRequestHeaders.Accept.Clear();
            //client44.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", "");
            //var stringTask = await client44.PostAsync(
                //new Uri("http://localhost:8889/hub/1PoZGGAuQ4yPj72TrXbG4pKbgB9tvCUqQ1/blockusign"),
                //new StringContent("shit",
                                  //Encoding.UTF8, "application/json"));

            var gaiaToken = Config["GaiaToken"];
            var client2 = new RestClient("https://gaia.blockstack.org");
            //var request2 = new RestRequest(Method.POST);
            //request2.AddHeader("Content-Type", "application/json");
            //request2.AddHeader("Authorization", gaiaToken);
            //request2.AddParameter("application/json", "{'shit': 'yeah'}", ParameterType.RequestBody);

            //IRestResponse r = client2.Execute(request2);

            var em = new EmailJson();
            em.content = "shit storm";

            var request = new RestSharp.RestRequest("/hub/1PoZGGAuQ4yPj72TrXbG4pKbgB9tvCUqQ1/blockusign/email.confirmations.json", RestSharp.Method.POST)
            { 
                RequestFormat = RestSharp.DataFormat.Json 
            }.AddBody(em)
             .AddHeader("Authorization", gaiaToken);

            var response = client2.Execute(request);

           
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


        async Task ResponseAction(HttpResponseMessage httpResponseMessage)
    {
        string content = null;
        if (httpResponseMessage.Content != null)
        {
            content = await httpResponseMessage.Content.ReadAsStringAsync();
            content = content.Substring(0, Math.Min(100, content.Length)) + "...";
        }
       
            ////var fs = new FormattedString();
            //fs.Spans.Add(new Span { Text = "Status: " });
            //fs.Spans.Add(new Span { Text = httpResponseMessage.StatusCode.ToString(), FontAttributes = FontAttributes.Bold });
            //fs.Spans.Add(NewLine());
            //if (httpResponseMessage.Headers.Any())
            //{
            //    fs.Spans.Add(new Span { Text = "Headers:" });
            //    fs.Spans.Add(NewLine());
            //    foreach (var header in httpResponseMessage.Headers)
            //    {
            //        fs.Spans.Add(new Span { Text = "\t•" + header.Key + ": " });
            //        fs.Spans.Add(new Span { Text = String.Join(",", header.Value), FontAttributes = FontAttributes.Bold });
            //        fs.Spans.Add(NewLine());
            //    }
            //}
            //if (content != null)
            //{
            //    fs.Spans.Add(new Span { Text = "Content: " });
            //    fs.Spans.Add(new Span { Text = content, FontAttributes = FontAttributes.Bold });
            //}
          

    }

    async Task RequestAction(HttpRequestMessage httpRequestMessage)
    {
        string content = null;
        if (httpRequestMessage.Content != null)
        {
            content = await httpRequestMessage.Content.ReadAsStringAsync();
        }
      
            //var fs = new FormattedString();
            //fs.Spans.Add(new Span { Text = "URL: " });
            //fs.Spans.Add(new Span { Text = httpRequestMessage.RequestUri.ToString(), FontAttributes = FontAttributes.Bold });
            //fs.Spans.Add(NewLine());
            //fs.Spans.Add(new Span { Text = "Method: " });
            //fs.Spans.Add(new Span { Text = httpRequestMessage.Method.ToString(), FontAttributes = FontAttributes.Bold });
            //fs.Spans.Add(NewLine());
            if (httpRequestMessage.Headers.Any())
            {
                //fs.Spans.Add(new Span { Text = "Headers:" });
                //fs.Spans.Add(NewLine());
                foreach (var header in httpRequestMessage.Headers)
                {
                   // fs.Spans.Add(new Span { Text = "\t•" + header.Key + ": " });
                    //fs.Spans.Add(new Span { Text = String.Join(",", header.Value), FontAttributes = FontAttributes.Bold });
                }
            }
            if (content != null)
            {
                //fs.Spans.Add(new Span { Text = "Content: " });
                //fs.Spans.Add(new Span { Text = content, FontAttributes = FontAttributes.Bold });
            }
         
    }
   

    }


    public class EmailConfirmJson
    {
        public List<EmailConfirm> emailConfirms;
    }

    public class EmailConfirm
    {
        public string email { get; set; }
        public List<string> codes { get; set; }
    }


   

}
