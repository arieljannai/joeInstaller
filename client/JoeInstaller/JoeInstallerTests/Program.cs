using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Pipes;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace JoeInstallerTests
{
    class Program
    {
        static void Main(string[] args)
        {
            var buffer = new byte[1024];
            using (var pipe = new NamedPipeClientStream(".", "joeInstaller", PipeDirection.InOut, PipeOptions.Asynchronous))
            {
                pipe.Connect();

                pipe.Write(Encoding.UTF8.GetBytes("file:///C:/Users/Shahaf/dev/JoeInstaller/installs.json"), 0,
                    Encoding.UTF8.GetByteCount("file:///C:/Users/Shahaf/dev/JoeInstaller/installs.json"));

                pipe.Flush();

                pipe.Read(buffer, 0, 1024);
            }

            Console.WriteLine(Encoding.UTF8.GetString(buffer).TrimEnd('\0'));
        }
    }
}
