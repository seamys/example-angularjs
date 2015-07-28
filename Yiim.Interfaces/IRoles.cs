using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yiim.ViewModels;

namespace Yiim.Interfaces
{
    public interface IRoles
    {
        GetsResult<RoleDetails> Gets(RoleParams param);

        PostResult<int> Post(RoleDetails model);

        PutResult Put(RoleDetails model);

        DeleteResult Delete(int id);
    }
}
