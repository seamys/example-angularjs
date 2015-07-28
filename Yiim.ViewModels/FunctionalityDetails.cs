using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yiim.ViewModels
{
    public class FunctionalityDetails : IdWithName
    {
        public List<IdWithName> Roles { get; set; }
        public List<IdWithName> Users { get; set; }
    }
}
