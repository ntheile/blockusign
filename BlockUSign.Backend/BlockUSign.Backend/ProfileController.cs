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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BlockUSign.Backend
{
    [Route("api/[controller]")]
    public class ProfileController : Controller
    {


        // Place to store the Config object and use in this controller
        private readonly IConfiguration Config;

        // Constructor that that takes IConfiguration is called on instantiation thanks to Dependency injection
        public ProfileController(IConfiguration config)
        {
            Config = config;
        }



        // GET: api/profile
        [HttpGet]
        public async Task<string> Get(string subject, string to, string content)
        {

            var client = new RestClient("https://gaia.blockstack.org/hub/1PoZGGAuQ4yPj72TrXbG4pKbgB9tvCUqQ1/blockusign/global.index.json");
            var request = new RestRequest(Method.GET);
            request.AddHeader("postman-token", "9dc194c9-dd62-00ad-6423-3083e862d13a");
            request.AddHeader("cache-control", "no-cache");
            IRestResponse response = await client.ExecuteAsync(request);
           
            return  response.Content.ToString();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public  IEnumerable<string> Post([FromBody]EmailJson value)
        {
            //var token = Config["GaiaToken"];
            //var client = new RestClient("https://hub.blockstack.org/store/1PoZGGAuQ4yPj72TrXbG4pKbgB9tvCUqQ1/blockusign/global.index.json");
            //var request = new RestRequest(Method.POST);
            //request.AddHeader("postman-token", "58f77a8d-e43a-907c-a510-011bbdf2b0f6");
            //request.AddHeader("cache-control", "no-cache");
            //request.AddHeader("content-type", "application/json");
            //request.AddHeader("authorization", token);
            //request.AddParameter("application/json", "\"bye\"", ParameterType.RequestBody);
            //IRestResponse response = client.Execute(request)

            return new string[] { "" };

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

    public static class RestClientExtensions
    {
        public static async Task<RestResponse> ExecuteAsync(this RestClient client, RestRequest request)
        {
            TaskCompletionSource<IRestResponse> taskCompletion = new TaskCompletionSource<IRestResponse>();
            RestRequestAsyncHandle handle = client.ExecuteAsync(request, r => taskCompletion.SetResult(r));
            return (RestResponse)(await taskCompletion.Task);
        }
    }

    public class ProfileJson
    {
        public string email { get; set; }
        public string storagePath { get; set; }
        public string appPublicKey { get; set; }
        public string userId { get; set; }
    }


    // write to blockusign1 global.json using private app key after confimation email is clicked {encrypt: false} , private key stored in client JS 
    // 
    // [
    //  {email: 'ntheile@gmail.com', storagePath: 'gaia.com/23u4523', appPublicKey: '324wvdfsgv', userId: 'nicktee.id'}
    //
    //
    // ]




    // emailConfirmations write to email.confirmations, stored in blockusign1 and can only be viewed by blockusign1 and this backend
    // [ 
    //    { email: 'ntheile@gmail.com', code: ['1232freniofg34', 'sdfhdsiu23489'] }
    // ]





}
