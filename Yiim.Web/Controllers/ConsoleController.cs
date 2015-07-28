using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Yiim.Interfaces;

namespace Yiim.Web.Controllers
{
    public class ConsoleController : _BaseController
    {
        //
        // GET: /Console/

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        public ActionResult UnLogin()
        {
            return Redirect("Login");
        }
    }
}
