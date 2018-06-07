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

namespace BlockUSign.Backend
{
    [Route("api/[controller]")]
    public class DocStorageMapController: Controller
    {

        // Place to store the Config object and use in this controller
        private readonly IConfiguration Config;

        public DocStorageMapController(IConfiguration config)
        {
            Config = config;
        }

        /// <summary>
        /// Write a new storage Path to a doc guid with a valid code
        /// 
        ///  /api/DocStorageMap?docGuid=12345&code=12345&storagePath=12345
        /// 
        /// </summary>
        /// <returns>The get.</returns>
        /// <param name="docGuid">Document GUID.</param>
        /// <param name="code">Code.</param>
        /// <param name="storagePath">Storage path.</param>
        [HttpGet]
        public async Task<string> Get(string docGuid, string code, string storagePath)
        {

            // 1. Verify code matched for doc
            var codeController = new CodeController(Config);
            var verifiedCode = await codeController.getCode(docGuid);

            if (verifiedCode == code){
                // 2. Get existing blockusign1/{docGuid}.doc.storage.map.json
                DocStorageMapModel docStorageMap = await GetDocStorageMap(docGuid);

                if ( !docStorageMap.storagePaths.Contains(storagePath) ){
                    docStorageMap.storagePaths.Add(storagePath);    
                }

                // 3. Write to blockusign1/{docGuid}.doc.storage.map.json
                var results = WriteDocStorageMap(docGuid, docStorageMap);
                return JsonConvert.SerializeObject(results);
            }
            else{
                return "code not verified";
            }

        }


        public async Task<DocStorageMapModel> GetDocStorageMap(string docGuid){

            var client = new RestClient($"https://gaia.blockstack.org/hub/1PoZGGAuQ4yPj72TrXbG4pKbgB9tvCUqQ1/blockusign/{docGuid}.doc.storage.map.json");
            var request = new RestRequest(Method.GET);
            IRestResponse response = await client.ExecuteAsync(request);

            if (response.IsSuccessful){

                DocStorageMapModel docStoreMap = JsonConvert.DeserializeObject<DocStorageMapModel>(response.Content);

                if( docStoreMap.storagePaths.Count() > 0) {
                    return docStoreMap;
                }
                else{
                    return new DocStorageMapModel() { storagePaths = new List<string> { } };
                }

            }
            else if (response.StatusCode == System.Net.HttpStatusCode.NotFound){
                return new DocStorageMapModel() { storagePaths = new List<string> {} };
            }
            else{
                throw new Exception("Error fetching DocStorageMap");
            }

        }


        public async Task<DocStorageMapModel> WriteDocStorageMap(string docGuid, DocStorageMapModel docStorageMap)
        {

            var password = Config["EmailConfirmKey"];
            var gaiaToken = Config["GaiaToken"];

            string json = JsonConvert.SerializeObject(docStorageMap);
            var client2 = new RestClient($"https://hub.blockstack.org/store/1PoZGGAuQ4yPj72TrXbG4pKbgB9tvCUqQ1/blockusign/{docGuid}.doc.storage.map.json");
            var request2 = new RestRequest(Method.POST);
            request2.AddHeader("Content-Type", "application/json");
            request2.AddHeader("Authorization", gaiaToken);
            request2.AddParameter("application/json", json, ParameterType.RequestBody);
            IRestResponse response2 = client2.Execute(request2);

            if (response2.IsSuccessful){

              
                return await GetDocStorageMap(docGuid);

            }
            else{
                return null;
            }


        }

        public class DocStorageMapModel{
            public List<string> storagePaths { get; set; }
        }

    }
}
