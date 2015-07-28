using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Web;
using System.Web.Mvc;
using Yiim.ViewModels;

namespace Yiim.Web.Controllers
{
    /// <summary>
    /// 整个 MVC 控制器的抽象基类
    /// </summary>
    public abstract class _BaseController : Controller
    {
        /// <summary>
        /// WebAPI 访问Key
        /// <URL></URL>
        /// </summary>
        public string AccessKey { get; set; }
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (filterContext.HttpContext.Request.IsAjaxRequest()) return;
            filterContext.Controller.ViewData["WebTitle"] = "Yiim 简易权限管理系统";
            HttpCookie cookie = filterContext.HttpContext.Request.Cookies["AccessKey"];
            if (cookie == null)
            {
                AccessKey = Guid.NewGuid().ToString();
                cookie = new HttpCookie("AccessKey", AccessKey);
                filterContext.HttpContext.Response.SetCookie(cookie);
            }
            else
            {
                AccessKey = cookie.Value;
            }
            filterContext.Controller.ViewData["AccessKey"] = AccessKey;
            filterContext.Controller.ViewData["UserState"] = MemoryCache.Default.Get(AccessKey) as UserState;
        }
    }
}
