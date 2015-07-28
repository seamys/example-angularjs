using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yiim.ViewModels
{
    public class RoleDetails : IdWithName
    {
        public List<IdWithName> Funs { get; set; }
    }
}
