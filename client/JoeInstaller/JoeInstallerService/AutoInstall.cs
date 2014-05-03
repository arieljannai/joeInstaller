using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace JoeInstallerService
{
    public class AutoInstall
    {
        private string userName;
        private string token;
        private Applications[] applications;
        private string url;
        private DirectoryInfo workingDir;

        private AutoInstall(string url)
        {
            this.url = url;
        }

        public static AutoInstall Create(string url)
        {
            return new AutoInstall(url);
        }

        public async Task Install(CancellationToken cancellationToken)
        {
            this.workingDir = Directory.CreateDirectory(Path.Combine(Path.GetTempPath(), Path.GetRandomFileName()));

            try
            {
                getAutoinstallData();
                await PrepareForInstallation(cancellationToken);
                InstallApplications(cancellationToken);
            }
            finally
            {
                this.workingDir.Delete(true);
            }
        }

        private void getAutoinstallData()
        {
            var autoInstallDataDownloader = new WebClient();
            var autoInstallData = autoInstallDataDownloader.DownloadString(url);
            var autoInstallDataJson = JToken.Parse(autoInstallData);
            userName = autoInstallDataJson["userName"].ToString();
            token = autoInstallDataJson["token"].ToString();

            applications = autoInstallDataJson["applications"].Select(app => new Applications(
                app["name"].ToString(),
                app["version"].ToString(),
                app["checksum"].ToString(),
                app["location"].ToString(),
                app["installerName"].ToString(),
                this.workingDir.FullName)).ToArray();
        }

        private async Task PrepareForInstallation(CancellationToken cancellationToken)
        {
            await Task.WhenAll(applications
                .Select(app => app.PrepareForInstallation(this.workingDir.FullName, cancellationToken)));
        }

        private void InstallApplications(CancellationToken cancellationToken)
        {
            foreach (var app in applications)
            {
                app.Install();
            }
        }
    }
}