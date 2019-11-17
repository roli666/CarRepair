using Client.Interfaces;
using Client.Models;
using SharedKernel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Client.Business_Logic
{
    public class RepositoryController : IRepositoryController
    {
        private readonly string repositoryAddress = $"{Properties.Settings.Default.RepositoryProtocol}://{Properties.Settings.Default.RepositoryAddress}:{Properties.Settings.Default.RepositoryPort}";

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
