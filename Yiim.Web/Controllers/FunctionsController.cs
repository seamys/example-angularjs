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
    public class FunctionsController : ApiController
    {
        public IFunctionality Service { get; set; }
        public FunctionsController(IFunctionality service)
        {
            this.Service = service;
        }
        [AcceptVerbs("GET")]
        public ResultBase Gets([FromUri]PageParams param)
        {
            return Service.Get(param);
        }
        [AcceptVerbs("PUT")]
        public ResultBase Put([FromBody]IdWithName model)
        {
            return Service.Put(model);
        }
        [AcceptVerbs("POST")]
        public ResultBase Post([FromBody]IdWithName model)
        {
            return Service.Post(model);
        }
        [AcceptVerbs("DELETE")]
        public ResultBase Delete(int id)
        {
            return Service.Delete(id);
        }
    }
}
