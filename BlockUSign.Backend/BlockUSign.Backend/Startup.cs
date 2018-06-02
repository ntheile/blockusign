using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Rewrite;
using System.Text;

namespace BlockUSign.Backend
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            services.AddSingleton<IConfiguration>(Configuration);

            services.AddMvc();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            app.UseRewriter(new RewriteOptions().Add(new RedirectWwwRule()));

            app.UseCors("CorsPolicy");
            DefaultFilesOptions options = new DefaultFilesOptions();
            options.DefaultFileNames.Clear();
            options.DefaultFileNames.Add("index.html");
            options.DefaultFileNames.Add("signup.html");
            app.UseDefaultFiles(options);
            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

        }
    }

    public class RedirectWwwRule : Microsoft.AspNetCore.Rewrite.IRule
    {
        public int StatusCode { get; } = (int)System.Net.HttpStatusCode.MovedPermanently;
        public bool ExcludeLocalhost { get; set; } = true;

        public void ApplyRule(RewriteContext context)
        {
            var request = context.HttpContext.Request;
            var host = request.Host;
            if (host.Host.StartsWith("www", StringComparison.OrdinalIgnoreCase))
            {
                context.Result = RuleResult.ContinueRules;
                string newPath = request.Scheme + "://" + host.Value.Replace("www.", "") + request.PathBase + request.Path + request.QueryString;
                var response = context.HttpContext.Response;
                response.StatusCode = StatusCode;
                response.Headers[Microsoft.Net.Http.Headers.HeaderNames.Location] = newPath;
                context.Result = RuleResult.EndResponse; // Do not continue processing the request      

                return;
            }
            else{
                context.Result = RuleResult.ContinueRules;
                return;
            }

     
        }

    }


}
