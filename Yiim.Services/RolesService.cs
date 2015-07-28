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
    public class RolesService : ServiceBase, IRoles
    {
        public GetsResult<RoleDetails> Gets(RoleParams param)
        {
            var result = GetDefault<GetsResult<RoleDetails>>();
            var query = DbEntities.UserRoles.OrderByDescending(x => x.ID).AsQueryable();
            if (!string.IsNullOrWhiteSpace(param.Name))
                query = query.Where(x => x.RoleName.Contains(param.Name));
            if (param.UserId > 0)
                query = query.Where(x => x.UserToUserRoles.Any(z => z.UserId == param.UserId));
            result.Total = query.Count();
            result.Data = query.Skip((param.Current - 1) * param.Size).Take(param.Size).Select(x => new RoleDetails()
            {
                Id = x.ID,
                Name = x.RoleName,
                Funs = x.UserPermissions.Select(f => new IdWithName() { Id = f.UserFunctionality.Id, Name = f.UserFunctionality.Name }).ToList()
            }).ToList();
            return result;
        }
        public PostResult<int> Post(RoleDetails model)
        {
            var result = GetDefault<PostResult<int>>();
            if (isExisted(model.Name, model.Id))
            {
                result.Message = "ROLE_NAME_HAS_EXIST";
                return result;
            }
            UserRole role = new UserRole()
            {
                RoleName = model.Name
            };
            if (model.Funs != null && model.Funs.Count() > 0)
            {
                model.Funs.ForEach(x =>
                    role.UserPermissions.Add(new UserPermission()
                    {
                        FunctionalityId = x.Id
                    }));
            }
            DbEntities.UserRoles.Add(role);
            DbEntities.SaveChanges();
            result.Id = role.ID;
            result.IsCreated = true;
            return result;
        }
        public DeleteResult Delete(int id)
        {
            var result = GetDefault<DeleteResult>();
            var model = DbEntities.UserRoles.FirstOrDefault(x => x.ID == id);
            if (model != null)
            {
                DbEntities.UserToUserRoles.RemoveRange(model.UserToUserRoles);
                DbEntities.UserPermissions.RemoveRange(model.UserPermissions);
                DbEntities.UserRoles.Remove(model);
                DbEntities.SaveChanges();
            }
            result.IsDeleted = true;
            return result;
        }
        protected bool isExisted(string name, int exceptId)
        {
            if (string.IsNullOrWhiteSpace(name))
                return true;
            return DbEntities.UserRoles.Count(x => x.RoleName == name && x.ID != exceptId) > 0;
        }
        public PutResult Put(RoleDetails role)
        {
            var result = GetDefault<PutResult>();
            var model = DbEntities.UserRoles.FirstOrDefault(x => x.ID == role.Id);
            if (model == null)
            {
                result.Message = "ROLE_NOT_EXIST";
                return result;
            }
            if (isExisted(role.Name, role.Id))
            {
                result.Message = "ROLE_NAME_HAS_EXIST";
                return result;
            }
            if (role.Funs != null && role.Funs.Count() > 0)
            {
                var list = model.UserPermissions.ToList();
                foreach (var item in list)
                {
                    if (!role.Funs.Exists(x => x.Id == item.FunctionalityId))
                    {
                        DbEntities.UserPermissions.Remove(item);
                    }
                }
                foreach (var item in role.Funs)
                {
                    if (!list.Exists(x => x.FunctionalityId == item.Id))
                    {
                        model.UserPermissions.Add(new UserPermission() { FunctionalityId = item.Id, UserRoleId = role.Id });
                    }
                }
            }
            model.RoleName = role.Name;
            DbEntities.SaveChanges();
            result.IsSaved = true;
            return result;
        }
    }
}
