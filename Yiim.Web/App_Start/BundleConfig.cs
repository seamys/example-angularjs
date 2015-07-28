using System.Web;
using System.Web.Optimization;

namespace Yiim.Web
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            //清除忽略列表
            //http://stackoverflow.com/questions/11980458/bundler-not-including-min-files
            bundles.IgnoreList.Clear();
            //类库依赖文件
            bundles.Add(new ScriptBundle("~/js/base/library").Include(
                    "~/app/vendor/jquery-1.11.2.min.js",
                    "~/app/vendor/angular/angular.min.js",
                    "~/app/vendor/angular/angular-route.min.js",
                    "~/app/vendor/bootstrap/js/ui-bootstrap-tpls-0.13.0.min.js",
                    "~/app/vendor/bootstrap-notify/bootstrap-notify.min.js"
                   ));
            //angularjs 项目文件
            bundles.Add(new ScriptBundle("~/js/angularjs/app").Include(
                    "~/app/scripts/services/*.js",
                    "~/app/scripts/controllers/*.js",
                    "~/app/scripts/directives/*.js",
                    "~/app/scripts/filters/*.js",
                    "~/app/scripts/app.js"));
            //样式
            bundles.Add(new StyleBundle("~/js/base/style").Include(
                    "~/app/vendor/bootstrap/css/bootstrap.min.css",
                    "~/app/styles/dashboard.css",
                    "~/app/styles/console.css"
                    ));
        }
    }
}