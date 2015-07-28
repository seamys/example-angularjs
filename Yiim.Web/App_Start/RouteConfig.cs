using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Yiim.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute("Views", "{dir}-{name}", new { controller = "Utils", action = "Html" });

            routes.MapRoute("Default", "{controller}/{action}/{id}", new { controller = "Console", action = "Index", id = UrlParameter.Optional });
        }
    }
}