using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebServer.Interfaces
{
    public interface IRepositoryHub
    {
        Task RepositoryChanged();
    }
}
