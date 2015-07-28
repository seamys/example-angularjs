using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yiim.ViewModels;

namespace Yiim.Interfaces
{
    public interface IFunctionality
    {
        GetsResult<IdWithName> Get(PageParams param);

        PutResult Put(IdWithName model);

        PostResult<int> Post(IdWithName model);

        DeleteResult Delete(int id);
    }
}
