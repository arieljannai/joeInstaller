using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.IO.Pipes;
using System.Linq;
using System.Security.AccessControl;
using System.Security.Principal;
using System.ServiceProcess;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace JoeInstallerService
{
    public partial class JoeInstallerService : ServiceBase
    {
        private NamedPipeServerStream pipe;
        private byte[] buffer;
        private IAsyncResult pipeServerListenerResult;
        const int BUFFER_SIZE = 2048;

        public JoeInstallerService()
        {
            InitializeComponent();
            buffer = new byte[BUFFER_SIZE];
        }

        protected override void OnStart(string[] args)
        {
            SecurityIdentifier sec = new SecurityIdentifier(WellKnownSidType.WorldSid, null);
            PipeSecurity pipeSec = new PipeSecurity();
            pipeSec.AddAccessRule(new PipeAccessRule(sec, PipeAccessRights.ReadWrite, AccessControlType.Allow));
            this.pipe = new NamedPipeServerStream("joeInstaller",
                PipeDirection.InOut, 1,
                PipeTransmissionMode.Byte, PipeOptions.Asynchronous, BUFFER_SIZE, BUFFER_SIZE, pipeSec);
            
            this.pipeServerListenerResult = pipe.BeginWaitForConnection(this.JoeInstallerServer, null);
        }

        private void JoeInstallerServer(IAsyncResult ar)
        {
            this.pipe.EndWaitForConnection(ar);
            string downloadUrl;
            CancellationTokenSource cancellationToken = new CancellationTokenSource();
            var installCancellationToken = new CancellationTokenSource();

            this.pipe.Read(buffer, 0, BUFFER_SIZE);
            downloadUrl = Encoding.UTF8.GetString(buffer).TrimEnd('\0');
            this.pipe.ReadAsync(new byte[1024], 0, 1024, cancellationToken.Token)
                .ContinueWith((x) => installCancellationToken.Cancel());

            var autoInstall = AutoInstall.Create(downloadUrl);
            autoInstall.Install(installCancellationToken.Token).Wait(installCancellationToken.Token);

            cancellationToken.Cancel();
            this.pipe.Write(Encoding.UTF8.GetBytes("DONE"), 0, Encoding.UTF8.GetByteCount("DONE"));
            this.pipe.Flush();
            this.pipe.WaitForPipeDrain();
            this.pipe.Disconnect();
            this.pipeServerListenerResult = this.pipe.BeginWaitForConnection(this.JoeInstallerServer, null);
        }

        protected override void OnStop()
        {
            this.pipe.Dispose();
            this.pipe = null;
        }
    }
}
