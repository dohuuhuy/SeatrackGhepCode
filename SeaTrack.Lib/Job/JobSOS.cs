using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Quartz;
using RestSharp;
using SeaTrack.Lib.Service;
using SeaTrack.Lib.Database;
using System.Net.Http;
using Newtonsoft.Json;

namespace SeaTrack.Lib.Job
{
    public class JobSOS : IJob
    {
        public async void Execute(IJobExecutionContext context)
        {
            Console.WriteLine("Hello, JOb executed");
            var lstSOS = SOSService.GetSOSPending();
            if (lstSOS != null)
            {
                foreach (var i in lstSOS)
                {
                    HttpClient client = new HttpClient();
                    var value = new Dictionary<string, string>
                        {
                            {"MREF","SOS" },
                            {"ID",i.DeviceImei },
                            {"Space"," " },
                            {"Latitude", i.Latitude.ToString() },
                            {"ExpSN",i.DirectionSN },
                            {"Longitude", i.Longitude.ToString() },
                            {"ExpEW",i.DirectionEW },
                            {"Date",i.DateRequest.ToString("dd/MM/yyyy") },
                            {"Time",i.DateRequest.ToString("HH:mm:ss") },
                            {"GMT",i.GMT },
                        };
                    var content = new FormUrlEncodedContent(value);
                    //var emptyContent = new StringContent("{}", Encoding.UTF8, "application/json");
                    var res = await client.PostAsync(ConnectData.URLSOS, content);
                    //var res = await client.PostAsync("http://192.168.1.14:11413", emptyContent);
                    var responseString = await res.Content.ReadAsStringAsync();
                    if (res.StatusCode == HttpStatusCode.OK)
                    {
                        SOSService.UpdateStatusSOSbyID((int)i.SOSID, 2);
                    }

                    //var value = await Task.Run(() => JsonConvert.SerializeObject(i));
                    //var content = new StringContent(value, Encoding.UTF8, "application/json");
                    //using (HttpClient client = new HttpClient())
                    //{
                    //    var res = await client.PostAsync(ConnectData.URLSOS, content);
                    //    var responseString = await res.Content.ReadAsStringAsync();
                    //    if (res.StatusCode == HttpStatusCode.OK)
                    //    {
                    //        SOSService.UpdateStatusSOSbyID((int)i.SOSID, 2);
                    //    }

                    //}
                }
            }
            //    foreach (var item in lstSOS)
            //{
            //    try
            //    {
            //        var client = new RestClient(ConnectData.URLSOS);
            //        var request = new RestRequest(ConnectData.SOSResource, Method.POST);
            //        request.RequestFormat = DataFormat.Json;
            //        request.AddJsonBody(new
            //        {
            //            MREF = "SOS",
            //            ID = item.DeviceImei,
            //            Space = " ",
            //            Latitude = item.Latitude,
            //            ExpSN = item.DirectionSN,
            //            Longitude = item.Longitude,
            //            ExpEW = item.DirectionEW,
            //            date = item.DateRequest.ToString("dd/MM/yyyy"),
            //            time = item.DateRequest.ToString("HH:mm:ss"),
            //            GMT = item.GMT
            //        });
            //        request.Timeout = 30 * 1000;
            //        var rs = client.Execute(request);
            //        if (rs.StatusCode == HttpStatusCode.OK)
            //        {
            //            item.Status = 2;
            //            
            //        }
            //    }

        }
    }
}
