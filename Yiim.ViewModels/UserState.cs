using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yiim.ViewModels
{
    public class UserState : IdWithName
    {
        public List<int> Permissions { get; set; }
    }
}
