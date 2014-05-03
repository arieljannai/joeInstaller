using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using tar_cs;

namespace JoeInstallerService
{
    public class Applications
    {
        private string name;
        private string version;
        private string checksum;
        private string location;
        private string installerName;   
        private DirectoryInfo workingDir;

        public Applications(string name, string version,
                            string checksum, string location,
                            string installerName, string autoInstallWorkingDir)
        {
            this.name = name;
            this.version = version;
            this.checksum = checksum;
            this.location = location;
            this.installerName = installerName;
            this.workingDir = Directory.CreateDirectory(Path.Combine(autoInstallWorkingDir, Path.GetRandomFileName()));
        }

        public async Task PrepareForInstallation(string workingDir, CancellationToken cancellationToken)
        {
            var downloader = new WebClient();

            var localFileName = Path.Combine(this.workingDir.FullName, Path.GetRandomFileName());

            await downloader.DownloadFileTaskAsync(this.location, localFileName);
            using (FileStream installPackage = File.OpenRead(localFileName))
            {
                using (SHA1Managed sha1 = new SHA1Managed())
                {
                    var actualChecksum =
                        BitConverter.ToString(sha1.ComputeHash(installPackage))
                            .Replace("-", string.Empty).ToLower();

                    if (actualChecksum != this.checksum.ToLower())
                    {
                        throw new Exception("Checksums doesn't match");
                    }
                }

                installPackage.Position = 0;

                TarReader reader = new TarReader(installPackage);
                reader.ReadToEnd(this.workingDir.FullName);
            }
        }

        public void Install()
        {
            ProcessStartInfo installer = new ProcessStartInfo();
            installer.WorkingDirectory = this.workingDir.FullName;
            installer.FileName = Path.Combine(this.workingDir.FullName, this.installerName);
            installer.RedirectStandardOutput = true;
            installer.UseShellExecute = false;
            installer.CreateNoWindow = true;
            Process installerProcess = Process.Start(installer);
            installerProcess.WaitForExit();
        }
    }
}
