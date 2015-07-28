using System.Web.Http.Controllers;
using System.Web.Mvc;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;

namespace Yiim.Web.CastleDI
{
    public class DependencyInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                Types.FromThisAssembly().BasedOn<IHttpController>().LifestyleTransient(),
                Types.FromThisAssembly().BasedOn<IController>().LifestyleTransient(),
                Types.FromAssemblyNamed("Yiim.Services").Where(type => type.Name.EndsWith("Service")).WithServiceAllInterfaces().LifestyleTransient());

        }

    }
}