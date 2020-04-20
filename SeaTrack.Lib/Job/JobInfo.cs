using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using Quartz;
using RestSharp;
using SeaTrack.Lib.DTO;
using SeaTrack.Lib.Service;

namespace SeaTrack.Lib.Job
{
    public class JobInfo : IJob
    {
        public void Execute(IJobExecutionContext context)
        {
            var client = new RestClient("http://192.168.1.14/11412");
            client.Authenticator = new HttpBasicAuthenticator("username", "password");

            var request = new RestRequest("statuses/home_timeline.json", DataFormat.Json);

            var timeline = await client.GetAsync<HomeTimeline>(request, cancellationToken);


        }
    }
}
