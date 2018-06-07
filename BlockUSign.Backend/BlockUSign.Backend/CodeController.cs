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
    public class CodeController : Controller
    {


        // Place to store the Config object and use in this controller
        private readonly IConfiguration Config;


        // Constructor that that takes IConfiguration is called on instantiation thanks to Dependency injection
        public CodeController(IConfiguration config)
        {
            Config = config;
        }


        /// <summary>
        /// Writes the specified code for the docGuid passed in, if one already exists it return fail .
        /// 
        /// http://localhost:5000/api/Code?docGuid=12345&code=12345
        /// 
        /// </summary>
        /// <returns>The get.</returns>
        /// <param name="docGuid">Document GUID.</param>
        /// <param name="code">Code.</param>
        [HttpGet]
        public async Task<string> Get(string docGuid, string code)
        {

            var results = await writeCode(docGuid, code);
            return results;
        }
  


        public async Task<string> writeCode(string docGuid, string code)
        {

            var password = Config["EmailConfirmKey"];
            var gaiaToken = Config["GaiaToken"];
            SimpleEncypt simpleEncypt = new SimpleEncypt(password);

            var existingCode = await getCode(docGuid);
            if (existingCode != "fail"){
                return "code already exists";
            }
                      
           
            string json = simpleEncypt.Encrypt(code);
            var client2 = new RestClient($"https://hub.blockstack.org/store/1PoZGGAuQ4yPj72TrXbG4pKbgB9tvCUqQ1/blockusign/{docGuid}.code.json");
            var request2 = new RestRequest(Method.POST);
            request2.AddHeader("Content-Type", "application/json");
            request2.AddHeader("Authorization", gaiaToken);
            request2.AddParameter("application/json", json, ParameterType.RequestBody);
            IRestResponse response2 = client2.Execute(request2);

            return "ok";
        }

        public async Task<string> getCode(string docGuid)
        {

            var password = Config["EmailConfirmKey"];
            var gaiaToken = Config["GaiaToken"];


            SimpleEncypt simpleEncypt = new SimpleEncypt(password);
            var client = new RestClient($"https://gaia.blockstack.org/hub/1PoZGGAuQ4yPj72TrXbG4pKbgB9tvCUqQ1/blockusign/{docGuid}.code.json");
            var request = new RestRequest(Method.GET);
            IRestResponse response = await client.ExecuteAsync(request);

            if (response.IsSuccessful){
                string encryptedData = response.Content;
                string decodedString = simpleEncypt.Decrypt(encryptedData);
                return decodedString;
            }
            else{
                return "fail";    
            }
        }

     


    }

}
