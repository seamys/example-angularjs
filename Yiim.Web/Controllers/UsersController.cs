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
    public class UsersController : ApiController
    {
        public IUsers Service { get; set; }
        public UsersController(IUsers service)
        {
            Service = service;
        }
        [AcceptVerbs("GET")]
        public ResultBase Gets([FromUri]PageParams param)
        {
            return Service.Gets(param);
        }
        [AcceptVerbs("GET")]
        public ResultBase Get(int id)
        {
            return Service.Get(id);
        }
        [AcceptVerbs("POST")]
        public ResultBase Post(UserDetails user)
        {
            return Service.Post(user);
        }
        [AcceptVerbs("PUT")]
        public ResultBase Put(UserDetails user)
        {
            return Service.Put(user);
        }
        [AcceptVerbs("DELETE")]
        public ResultBase Delete(int id)
        {
            return Service.Delete(id);
        }
        [AcceptVerbs("PUT")]
        public ResultBase PutRoles([FromBody]UserDetails model)
        {
            return Service.PutRoles(model);
        }
        [AcceptVerbs("DELETE")]
        public ResultBase DeleteRole(int id, int roleId)
        {
            return Service.DeleteRole(id, roleId);
        }
    }
}
