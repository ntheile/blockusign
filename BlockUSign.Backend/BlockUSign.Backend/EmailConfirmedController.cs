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


        //// 1. generate code
        //// 2. send email
        //// GET: api/emailconfirmed?email=name@email.com
        //[HttpGet]
        //public async Task<string> Get(string email)
        //{
        //    var password = Config["EmailConfirmKey"];
        //    var gaiaToken = Config["GaiaToken"];


        //    // 1. gererate code
        //    string code = Guid.NewGuid().ToString();

        //    SimpleEncypt simpleEncypt = new SimpleEncypt(password);
        //    // string strEncrypted = simpleEncypt.Encrypt("hi");
        //    //string strDecr = simpleEncypt.Decrypt(strEncrypted);


        //    // 2. query email.confirmations.json
        //    var client = new RestClient("https://gaia.blockstack.org/hub/1PoZGGAuQ4yPj72TrXbG4pKbgB9tvCUqQ1/blockusign/email.confirmations.json");
        //    var request = new RestRequest(Method.GET);
        //    IRestResponse response = await client.ExecuteAsync(request);
        //    string encryptedData = response.Content;
        //    string decodedString = simpleEncypt.Decrypt(encryptedData);

        //    EmailConfirmJson emailConfirmList = JsonConvert.DeserializeObject<EmailConfirmJson>(decodedString);

        //    if (emailConfirmList == null)
        //    {
        //        // search in list and addd
        //        emailConfirmList = new EmailConfirmJson();
        //        emailConfirmList.emailConfirms = new List<EmailConfirm>();
        //    }

        //    // 3. append or add new row for confimations         
        //    if ( emailConfirmList.emailConfirms.FirstOrDefault(a => a.email == email) != null  ) 
        //    {
        //        emailConfirmList.emailConfirms.FirstOrDefault(a => a.email == email).codes.Add(code);
        //    }
        //    else{
              
        //        EmailConfirm emailConfirms = new EmailConfirm { email = email, codes = new List<string> { code } };
        //        emailConfirmList.emailConfirms.Add(emailConfirms);
        //    }
          
        //    string json = JsonConvert.SerializeObject(emailConfirmList);
        //    json = simpleEncypt.Encrypt(json);


        //    var client2 = new RestClient("https://hub.blockstack.org/store/1PoZGGAuQ4yPj72TrXbG4pKbgB9tvCUqQ1/blockusign/email.confirmations.json");
        //    var request2 = new RestRequest(Method.POST);
        //    request2.AddHeader("Content-Type", "application/json");
        //    request2.AddHeader("Authorization", gaiaToken);
        //    request2.AddParameter("application/json", json, ParameterType.RequestBody);

        //    IRestResponse response2 = client2.Execute(request2);


        //    // 4. email the code to the user
        //    var emailer = new EmailController(Config);
        //    var emailResp = await emailer.Post(new EmailJson
        //    {
        //        content = "Please enter this code to validate your email " + code,
        //        subject = "Please enter this code to validate your email",
        //        to = email
        //    });


        //    return response2.StatusCode.ToString();
        //}


        //// 1. confirm email
        //// 2. purge old code from list
        //// 3. write to global.profile and match email with 
        //[HttpGet("{email}/{code}/{publicKey}")]
        //public async Task<string> Get(string email, string code, string publicKey)
        //{

        //    //@todo check if the code matches...if so you can write to the global profile index
        //    SimpleEncypt simpleEncypt = new SimpleEncypt(password);
        //    // 1. confirm email
        //    var client = new RestClient("https://gaia.blockstack.org/hub/1PoZGGAuQ4yPj72TrXbG4pKbgB9tvCUqQ1/blockusign/email.confirmations.json");
        //    var request = new RestRequest(Method.GET);
        //    IRestResponse response = await client.ExecuteAsync(request);
        //    string encryptedData = response.Content;
        //    string decodedString = simpleEncypt.Decrypt(encryptedData);
        //    EmailConfirmJson emailConfirmList = JsonConvert.DeserializeObject<EmailConfirmJson>(decodedString);
        //    if (emailConfirmList == null)
        //    {
        //        // search in list and addd
        //        return "null list";
        //    }
        //    var emailConfirmation = emailConfirmList.emailConfirms.FirstOrDefault(a => a.email == email);
        //    if (emailConfirmation != null && emailConfirmation.codes.Contains(code) )
        //    {
        //        // write to global profile
        //        var gaiaToken = Config["GaiaToken"];
        //        var client = new RestClient("https://hub.blockstack.org/store/1PoZGGAuQ4yPj72TrXbG4pKbgB9tvCUqQ1/blockusign/global.profile.json");
        //        var request = new RestRequest(Method.POST);

        //        var publicProfile = new PublicProfile{
        //            publicKey = publicKey
        //        }


        //        request.AddHeader("content-type", "application/json");
        //        request.AddHeader("Authorization", gaiaToken);
        //        request.AddParameter("application/json",
        //                             "pdCgfHpx11nXzDE5mfccAH9x+dtpTkObZ4XuxJjNISy5EByl/5FL5XIJ0a+vXx2nKMfCHl5NSUxm4PreDJAWnnnvlnFotDMTNXuYDa1YiQphHwnIKw5p/dHnGRTR/PYj"
        //                             , ParameterType.RequestBody);
        //        IRestResponse response = client.Execute(request);
        //    }
        //    else{
        //        return "bad code";
        //    }

           
        //    return "ok";
        //}



        public class EmailConfirmJson
        {
            public List<EmailConfirm> emailConfirms;
        }

        public class EmailConfirm
        {
            public string email { get; set; }
            public List<string> codes { get; set; }
        }

        public class PublicProfile
        {
            public string email { get; set; }
            public string publicKey { get; set; }
            public string storage { get; set; }
        }
            


    }

}
