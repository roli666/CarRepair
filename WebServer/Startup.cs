using Autofac;
using Autofac.Integration.SignalR;
using Autofac.Integration.WebApi;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.SignalR.Infrastructure;
using Owin;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using WebServer.Interfaces;
using WebServer.Services;

namespace WebServer
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var builder = new ContainerBuilder();
            var signalRConfig = new HubConfiguration
            {
                EnableJavaScriptProxies = false,
#if debug
                EnableDetailedErrors = true,
#endif
            };

            try
            {
                GlobalHost.HubPipeline.AddModule(new ErrorHandlingPipelineModule());
                app.MapSignalR(signalRConfig);
            }
            catch (Exception)
            {

                throw;
            }

            // Get your HttpConfiguration.
            var config = GlobalConfiguration.Configuration;

            // Register your Web API controllers.
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterHubs(Assembly.GetExecutingAssembly());

            // OPTIONAL: Register the Autofac filter provider.
            builder.RegisterWebApiFilterProvider(config);

            // OPTIONAL: Register the Autofac model binder provider.
            builder.RegisterWebApiModelBinderProvider();

            //Repo
            builder.Register(c => new Repository(Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "CarRepairDB.db"))).As<IRepository>();

            builder.Register(i => signalRConfig.Resolver.Resolve<IConnectionManager>().GetHubContext<RepositoryHub, IRepositoryHub>()).ExternallyOwned();

            // Set the dependency resolver to be Autofac.
            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            signalRConfig.Resolver = new Autofac.Integration.SignalR.AutofacDependencyResolver(container);

            app.UseAutofacWebApi(config);
            app.UseAutofacMiddleware(container);
        }
        public class ErrorHandlingPipelineModule : HubPipelineModule
        {
            protected override void OnIncomingError(Microsoft.AspNet.SignalR.Hubs.ExceptionContext exceptionContext, IHubIncomingInvokerContext invokerContext)
            {
                Debug.WriteLine("=> Exception " + exceptionContext.Error.Message);
                if (exceptionContext.Error.InnerException != null)
                {
                    Debug.WriteLine("=> Inner Exception " + exceptionContext.Error.InnerException.Message);
                }
                base.OnIncomingError(exceptionContext, invokerContext);

            }
        }
    }
}