using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Quartz;
using RestSharp;
using SeaTrack.Lib.Service;

namespace SeaTrack.Lib.Job
{
    public class JobSOS : IJob
    {
        public void Execute(IJobExecutionContext context)
        {
            Console.WriteLine("Hello, JOb executed");
            var lstSOS = SOSService.GetSOSPending();
            if (lstSOS != null)
            {
                foreach (var item in lstSOS)
                {
                    try
                    {
                        var client = new RestClient("http://hkt01.demowebmau.com");
                        var request = new RestRequest("post/iridiums", Method.POST);
                        request.RequestFormat = DataFormat.Json;
                        request.AddJsonBody(new
                        {
                            MREF = "SOS",
                            ID = item.DeviceImei,
                            Space = " ",
                            Latitude = item.Latitude,
                            ExpSN = item.DirectionSN,
                            Longitude = item.Longitude,
                            ExpEW = item.DirectionEW,
                            date = item.DateRequest.ToString("dd/MM/yyyy"),
                            time = item.DateRequest.ToString("HH:mm:ss"),
                            GMT = item.GMT
                        });
                        request.Timeout = 30 * 1000;
                        var rs = client.Execute(request);
                        if (rs.StatusCode == HttpStatusCode.OK)
                        {
                            item.Status = 2;
                            SOSService.UpdateStatusSOSbyID((int)item.SOSID, 2);
                        }
                    }
                    catch (Exception)
                    {

                    }
                    
                }
            }
        }
    }
}
