using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using WebServer.Interfaces;

namespace WebServer.Services
{
    [HubName("RepositoryHub")]
    public class RepositoryHub : Hub<IRepositoryHub>
    {
        public async Task RepositoryChanged()
        {
            await Clients.All.RepositoryChanged();
        }
        public override Task OnConnected()
        {
            return base.OnConnected();
        }
        public override Task OnDisconnected(bool stopCalled)
        {
            return base.OnDisconnected(stopCalled);
        }
        public override Task OnReconnected()
        {
            return base.OnReconnected();
        }
    }
}