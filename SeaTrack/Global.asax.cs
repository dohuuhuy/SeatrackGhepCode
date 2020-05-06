using SeaTrack.Lib.Database;
using SeaTrack.Lib.Job;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace SeaTrack
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            if (ConnectData.StartSOS == 1)
            {
                JobScheduler.StartJobSOS();
            }
            if (ConnectData.StartInfo == 1)
            {
                JobScheduler.StartJobInfo();
            }
            if (ConnectData.StartExpiredCheck == 1)
            {
                JobScheduler.StarJobCheckExpired();
            }
        }
    }
}
