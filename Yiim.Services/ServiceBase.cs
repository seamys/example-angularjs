using Yiim.Models;
using System;
using System.Runtime.Remoting.Messaging;

namespace Yiim.Services
{
    public class ServiceBase
    {
        private DbEntities _entities;
        protected DbEntities DbEntities
        {
            get
            {
                if (_entities == null)
                {
                    _entities = CallContext.LogicalGetData("DbEntities") as DbEntities;
                    if (_entities == null)
                    {
                        _entities = new DbEntities();
                        CallContext.LogicalSetData("DbEntities", _entities);
                    }
                }
                return _entities;
            }
        }
        protected T GetDefault<T>() where T : new()
        {
            return new T();
        }
        protected T GetDefault<T>(Action<T> call) where T : new()
        {
            T obj = this.GetDefault<T>();
            call(obj);
            return obj;
        }
    }
}
