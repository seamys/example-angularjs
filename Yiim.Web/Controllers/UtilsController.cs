using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Yiim.Web.Controllers
{
    public class UtilsController : Controller
    {
        public ActionResult Html(string dir, string name)
        {
            string html = string.Format("~/App/views/{0}/{1}.html", dir, name);
            if (!System.IO.File.Exists(Server.MapPath(html)))
                return Content(string.Format("当前请求的页面“{0}”不存在！", html));
            return File(html, "text/html; charset=utf-8");
        }
    }
}
