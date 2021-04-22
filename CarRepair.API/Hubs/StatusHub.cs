using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace CarRepair.API.Hubs
{
    public class StatusHub : Hub
    {
        public async Task GetStatus()
        {
            await Clients.All.SendAsync("APIRunning", true);
        }
    }
}