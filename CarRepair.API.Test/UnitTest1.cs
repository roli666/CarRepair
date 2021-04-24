using CarRepair.Data;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Diagnostics;
using System.IO;
using System.Text;
using Xunit;

namespace CarRepair.API.Test
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            using var myContext = new CarRepairContext(new DbContextOptions<CarRepairContext>(), Options.Create(new OperationalStoreOptions()));
            var path = Path.GetTempFileName() + ".dgml";
            File.WriteAllText(path, myContext.AsDgml(), Encoding.UTF8);
            var startInfo = new ProcessStartInfo(path)
            {
                UseShellExecute = true,
            };
            Process.Start(startInfo);
        }
    }
}