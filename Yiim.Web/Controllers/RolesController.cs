using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Yiim.Interfaces;
using Yiim.ViewModels;

namespace Yiim.Web.Controllers
{
    public class RolesController : ApiController
    {
        public IRoles Service { get; set; }
        public RolesController(IRoles service)
        {
            Service = service;
        }
        [AcceptVerbs("GET")]
        public ResultBase Gets([FromUri]RoleParams param)
        {
            return Service.Gets(param);
        }
        [AcceptVerbs("Post")]
        public ResultBase Post([FromBody] RoleDetails model)
        {
            return Service.Post(model);
        }
        [AcceptVerbs("PUT")]
        public ResultBase Put([FromBody] RoleDetails model)
        {
            return Service.Put(model);
        }
        [AcceptVerbs("DELETE")]
        public ResultBase Delete(int id)
        {
            return Service.Delete(id);
        }
    }
}
