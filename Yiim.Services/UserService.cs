using Yiim.Interfaces;
using Yiim.Models;
using Yiim.Services;
using Yiim.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yiim.Services
{
    public class UserService : ServiceBase, IUsers
    {
        public GetsResult<UserDetails> Gets(PageParams param)
        {
            var result = GetDefault<GetsResult<UserDetails>>();
            var query = DbEntities.Users.OrderByDescending(x => x.Id).AsQueryable();
            if (!string.IsNullOrWhiteSpace(param.Name))
            {
                switch (param.Type)
                {
                    case 0:
                        query = query.Where(x => x.Name.Contains(param.Name) || x.Email.Contains(param.Name));
                        break;
                    case 1:
                        query = query.Where(x => x.Name.Contains(param.Name));
                        break;
                    case 2:
                        query = query.Where(x => x.Email.Contains(param.Name));
                        break;
                }

            }
            result.Total = query.Count();
            result.Data = query.Skip((param.Current - 1) * param.Size).Take(param.Size).Select(x => new UserDetails()
            {
                CreateTime = x.CreateTime,
                Email = x.Email,
                Id = x.Id,
                State = x.State,
                Name = x.Name,
                RealName = x.RealName,
                Password = "*******",
                Roles = x.UserToUserRoles.Take(4).Select(z => new IdWithName()
                {
                    Id = z.UserRole.ID,
                    Name = z.UserRole.RoleName
                }).ToList(),
                TotalRole = x.UserToUserRoles.Count()
            }).ToList();
            return result;
        }
        public PutResult Put(UserDetails user)
        {
            var result = GetDefault<PutResult>();
            var model = DbEntities.Users.FirstOrDefault(x => x.Id == user.Id);
            if (isHas(user.Name, user.Id))
            {
                result.Message = "USER_NAME_HAS_EXIST";
                result.StateCode = 0x00302;
                return result;
            }
            if (model == null)
            {
                result.Message = "USER_NOT_EXIST";
                result.StateCode = 0x00303;
                return result;
            }
            model.RealName = user.RealName;
            model.Name = user.Name;
            model.State = user.State;
            model.Email = user.Email;
            DbEntities.SaveChanges();
            result.IsSaved = true;
            return result;
        }
        public PostResult<int> Post(UserDetails user)
        {
            var result = GetDefault<PostResult<int>>();
            if (isHas(user.Name, user.Id))
            {
                result.Message = "USER_NAME_HAS_EXIST";
                result.StateCode = 0x00302;
                return result;
            }
            var model = new User()
            {
                CreateTime = DateTime.Now,
                Password = "",
                Email = user.Email,
                State = user.State,
                RealName = user.RealName,
                Name = user.Name
            };
            DbEntities.Users.Add(model);
            DbEntities.SaveChanges();
            result.Id = model.Id;
            result.IsCreated = true;
            return result;
        }
        protected bool isHas(string name, int exceptId)
        {
            if (string.IsNullOrWhiteSpace(name))
                return false;
            return DbEntities.Users.Count(x => x.Name == name && exceptId != x.Id) > 0;
        }
        public DeleteResult Delete(int id)
        {
            var result = GetDefault<DeleteResult>();
            var model = DbEntities.Users.FirstOrDefault(x => x.Id == id);
            if (model != null)
            {
                DbEntities.UserToUserRoles.RemoveRange(model.UserToUserRoles);
                DbEntities.Users.Remove(model);
                DbEntities.SaveChanges();
            }
            result.IsDeleted = true;
            return result;
        }
        public PutResult PwdPut(UserDetails user)
        {
            var result = GetDefault<PutResult>();
            var model = DbEntities.Users.FirstOrDefault(x => x.Id == user.Id);
            if (model == null)
            {
                result.Message = string.Format("当前编辑的用户“{0}”已经不存在", user.Name);
                return result;
            }
            model.Password = user.Password;
            DbEntities.SaveChanges();
            result.IsSaved = true;
            return result;
        }
        public PutResult RolesPut(UserDetails user)
        {
            var result = GetDefault<PutResult>();
            var model = DbEntities.Users.FirstOrDefault(x => x.Id == user.Id);
            if (model == null)
            {
                result.Message = string.Format("当前编辑的用户“{0}”已经不存在", user.Name);
                return result;
            }

            var list = model.UserToUserRoles.ToList();
            DbEntities.UserToUserRoles.RemoveRange(list.Where(x => !user.Roles.Exists(z => z.Id == x.UserRoleId)));
            var appends = user.Roles.Where(x => !list.Exists(z => z.UserRoleId == x.Id));
            DbEntities.UserToUserRoles.AddRange(appends.Select(x => new UserToUserRole()
            {
                UserId = user.Id,
                UserRoleId = x.Id
            }));
            DbEntities.SaveChanges();
            result.IsSaved = true;
            return result;
        }
        public GetResult<UserDetails> Get(int id)
        {
            var result = GetDefault<GetResult<UserDetails>>();
            var model = DbEntities.Users.FirstOrDefault(x => x.Id == id);
            if (model == null)
            {
                result.Message = "USE_NOT_EXIST";
                result.StateCode = 0x00402;
                return result;
            }
            result.Data = new UserDetails()
            {
                CreateTime = model.CreateTime,
                Email = model.Email,
                Id = model.Id,
                RealName = model.RealName,
                State = model.State,
                Name = model.Name,
                Password = "*******"
            };
            return result;
        }


        public PutResult PutRoles(UserDetails userDetails)
        {
            var result = GetDefault<PutResult>();
            var model = DbEntities.Users.FirstOrDefault(x => x.Id == userDetails.Id);
            if (model == null)
            {
                result.Message = "USE_NOT_EXIST";
                result.StateCode = 0x00402;
                return result;
            }
            var list = model.UserToUserRoles.ToList();
            if (userDetails.Roles != null)
            {
                foreach (var item in userDetails.Roles)
                {
                    if (!list.Exists(x => x.UserRoleId == item.Id))
                    {
                        model.UserToUserRoles.Add(new UserToUserRole() { UserRoleId = item.Id, UserId = model.Id });
                    }
                }
                foreach (var item in list)
                {
                    if (!userDetails.Roles.Exists(x => x.Id == item.UserRoleId))
                    {
                        model.UserToUserRoles.Remove(item);
                    }
                }
                DbEntities.SaveChanges();
            }
            result.IsSaved = true;
            return result;
        }


        public DeleteResult DeleteRole(int id, int roleId)
        {
            var result = GetDefault<DeleteResult>();
            var model = DbEntities.UserToUserRoles.FirstOrDefault(x => x.UserId == id && x.UserRoleId == roleId);
            if (model != null)
            {
                DbEntities.UserToUserRoles.Remove(model);
                DbEntities.SaveChanges();
            }
            result.IsDeleted = true;
            return result;
        }
    }
}
