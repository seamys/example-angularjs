using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yiim.ViewModels
{
    public class UserDetails : IdWithName
    {
        public string RealName { get; set; }
        public string Password { get; set; }
        public DateTime CreateTime { get; set; }
        public string Email { get; set; }
        public int State { get; set; }
        public List<IdWithName> Roles { get; set; }
        public int TotalRole { get; set; }
    }
}
