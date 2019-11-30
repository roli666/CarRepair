using Client.Interfaces;
using Client.Models;
using log4net;
using Microsoft.AspNet.SignalR.Client;
using SharedKernel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Client.Business_Logic
{
    public class RepositoryController : IRepositoryController
    {
        private readonly string repositoryAddress = $"{Properties.Settings.Default.RepositoryProtocol}://{Properties.Settings.Default.RepositoryAddress}:{Properties.Settings.Default.RepositoryPort}";
        public event EventHandler RepositoryChangedEvent;
        private readonly IHubProxy repoHubProxy;
        private readonly HubConnection connection;
        private static readonly ILog log = LogManager.GetLogger(typeof(RepositoryController));

        public RepositoryController()
        {
            connection = new HubConnection(repositoryAddress)
            {
                TraceLevel = TraceLevels.All,
                TraceWriter = Console.Out
            };
            repoHubProxy = connection.CreateHubProxy("RepositoryHub");
            repoHubProxy.On("RepositoryChanged", () => RepositoryChangedEvent(this, EventArgs.Empty));
            Task.Run(() => ConnectWithRetryAsync());
        }

        public async Task ConnectWithRetryAsync()
        {
            while (true)
            {
                try
                {
                    await connection.Start();
                    if (connection.State == ConnectionState.Connected)
                        break;
                }
                catch(Exception e)
                {
                    log.Error("Could not connect...", e);
                    if(connection.State == ConnectionState.Disconnected)
                        await Task.Delay(5000);
                }
            }
        }

        public async Task<IList<JobViewModel>> GetAllJobs()
        {
            if (await CheckForRepositoryConnection())
            {
                try
                {
                    using (var client = new HttpClient())
                    {
                        IList<JobViewModel> collection = null;

                        client.BaseAddress = new Uri(repositoryAddress);
                        client.DefaultRequestHeaders.Accept.Clear();
                        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                        HttpResponseMessage response = new HttpResponseMessage();

                        response = await client.GetAsync("api/jobs", HttpCompletionOption.ResponseContentRead).ConfigureAwait(false);
                        if (response.IsSuccessStatusCode)
                        {
                            var result = await response.Content.ReadAsAsync<IEnumerable<JobModel>>();
                            collection = result.Select(s => new JobViewModel(s)).ToList();
                        }
                        response.Dispose();
                        return collection;
                    }
                }
                catch
                {
                    return null;
                }
            }
            return null;
        }

        public async Task<bool> AddJob(JobModel m)
        {
            if (await CheckForRepositoryConnection())
            {
                try
                {
                    using (var client = new HttpClient())
                    {
                        client.BaseAddress = new Uri(repositoryAddress);
                        client.DefaultRequestHeaders.Accept.Clear();
                        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                        HttpResponseMessage response = new HttpResponseMessage();

                        response = await client.PostAsJsonAsync<JobModel>("api/jobs", m).ConfigureAwait(false);
                        response.EnsureSuccessStatusCode();
                        response.Dispose();
                        //TODO: remove this ***** when f***** signalr works finally
                        RepositoryChangedEvent(this,EventArgs.Empty);

                        return true;
                    }
                }
                catch
                {
                    return false;
                }
            }
            return false;
        }

        public async Task<bool> UpdateJob(JobModel m)
        {
            if (await CheckForRepositoryConnection())
            {
                try
                {
                    using (var client = new HttpClient())
                    {
                        client.BaseAddress = new Uri(repositoryAddress);
                        client.DefaultRequestHeaders.Accept.Clear();
                        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                        HttpResponseMessage response = new HttpResponseMessage();

                        response = await client.PostAsJsonAsync<JobModel>("api/jobs", m).ConfigureAwait(false);
                        response.EnsureSuccessStatusCode();
                        response.Dispose();
                        //TODO: remove this ***** when f***** signalr works finally
                        RepositoryChangedEvent(this, EventArgs.Empty);

                        return true;
                    }
                }
                catch
                {
                    return false;
                }
            }
            return false;
        }
        public async Task<bool> RemoveJob(JobModel m)
        {
            if (await CheckForRepositoryConnection())
            {
                try
                {
                    using (var client = new HttpClient())
                    {
                        client.BaseAddress = new Uri(repositoryAddress);
                        client.DefaultRequestHeaders.Accept.Clear();
                        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                        HttpResponseMessage response = new HttpResponseMessage();

                        response = await client.DeleteAsync($"api/jobs/{m.ID}").ConfigureAwait(false);
                        response.EnsureSuccessStatusCode();
                        response.Dispose();
                        //TODO: remove this ***** when f***** signalr works finally
                        RepositoryChangedEvent(this, EventArgs.Empty);

                        return true;
                    }
                }
                catch
                {
                    return false;
                }
            }
            return false;
        }

        public async Task<bool> CheckForInternetConnection()
        {
            try
            {
                using (var client = new WebClient())
                using (await client.OpenReadTaskAsync("http://google.com/generate_204"))
                    return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<bool> CheckForRepositoryConnection()
        {
            try
            {
                using (var client = new WebClient())
                using (await client.OpenReadTaskAsync(repositoryAddress))
                    return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
