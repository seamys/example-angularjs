using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yiim.ViewModels;

namespace Yiim.Interfaces
{
    public interface IUsers
    {
        GetsResult<UserDetails> Gets(PageParams param);

        PostResult<int> Post(UserDetails user);

        GetResult<UserDetails> Get(int Id);

        PutResult Put(UserDetails user);

        DeleteResult Delete(int id);


        PutResult PutRoles(UserDetails model);

        DeleteResult DeleteRole(int id, int roleId);
    }
}
