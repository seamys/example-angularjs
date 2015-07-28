using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yiim.Interfaces;
using Yiim.Models;
using Yiim.ViewModels;

namespace Yiim.Services
{
    public class FunctionalityService : ServiceBase, IFunctionality
    {
        public GetsResult<IdWithName> Get(PageParams param)
        {
            var result = GetDefault<GetsResult<IdWithName>>();
            var query = DbEntities.UserFunctionalities.OrderByDescending(x => x.Id).AsQueryable();
            if (!string.IsNullOrWhiteSpace(param.Name))
                query = query.Where(x => x.Name.Contains(param.Name));
            result.Total = query.Count();
            result.Data = query.Skip((param.Current - 1) * param.Size).Take(param.Size).Select(x => new IdWithName()
            {
                Id = x.Id,
                Name = x.Name
            }).ToList();
            return result;
        }
        public PutResult Put(IdWithName role)
        {
            var result = GetDefault<PutResult>();
            var model = DbEntities.UserFunctionalities.FirstOrDefault(x => x.Id == role.Id);
            if (model == null)
            {
                result.Message = "FUNC_NOT_EXIST";
                return result;
            }
            if (isExisted(role.Name, role.Id))
            {
                result.Message = "FUNC_NAME_HAS_EXIST";
                return result;
            }
            model.Name = role.Name;
            DbEntities.SaveChanges();
            result.IsSaved = true;
            return result;
        }
        protected bool isExisted(string name, int exceptId)
        {
            if (string.IsNullOrWhiteSpace(name))
                return true;
            return DbEntities.UserFunctionalities.Count(x => x.Name == name && x.Id != exceptId) > 0;
        }
        public PostResult<int> Post(IdWithName model)
        {
            var result = GetDefault<PostResult<int>>();
            if (isExisted(model.Name, model.Id))
            {
                result.Message = "FUNC_NAME_HAS_EXIST";
                return result;
            }
            UserFunctionality func = new UserFunctionality()
            {
                Name = model.Name
            };
            DbEntities.UserFunctionalities.Add(func);
            DbEntities.SaveChanges();
            result.IsCreated = true;
            result.Id = func.Id;
            return result;
        }
        public DeleteResult Delete(int id)
        {
            var result = GetDefault<DeleteResult>();
            var model = DbEntities.UserFunctionalities.FirstOrDefault(x => x.Id == id);
            if (model != null)
            {
                DbEntities.UserPermissions.RemoveRange(model.UserPermissions);
                DbEntities.UserFunctionalities.Remove(model);
                DbEntities.SaveChanges();
            }
            result.IsDeleted = true;
            return result;
        }
    }
}
