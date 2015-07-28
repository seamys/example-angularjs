using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Yiim.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                "APIDefault", //路由名称
                "api/{controller}/{action}/{id}", //添加对action的引用
                new
                {
                    id = RouteParameter.Optional
                });
        }
    }
}
