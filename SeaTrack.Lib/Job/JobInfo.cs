using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Quartz;
using RestSharp;
using SeaTrack.Lib.DTO;
using SeaTrack.Lib.Service;

using Newtonsoft.Json;
using System.Net.Http;

namespace SeaTrack.Lib.Job
{
    public class JobInfo : IJob
    {

        public async void Execute(IJobExecutionContext context)
        {
            InfoDTO info = new InfoDTO();
            info.MREF = "Alo";
            info.ID = "869247042912003";
            info.Seqno = "A";
            info.SecretCode = "A";

            var data = new { data = "Sida quá" };
            string URI = "http://hkt01.demowebmau.com/post/iridiums";
            var content = JsonConvert.SerializeObject(data);
            var strContent = new StringContent(content, Encoding.UTF8, "application/json");
            using (var client = new HttpClient())
            {
                using (var res = await client.PostAsync(URI, strContent))
                {
                    var kq = await res.Content.ReadAsStringAsync();
                    Console.Write(res);
                }
            }
            //var lstDelayInfo = InfoService.GetAllDelayInfo();
            //using (var clients = new HttpClient())
            //{
            //    string URI = "http://192.168.1.14:11412";
            //    var content = JsonConvert.SerializeObject(lstDelayInfo[0]);
            //    var strContent = new StringContent(content, Encoding.UTF8, "application/json");

            //    var postTask = await clients.PostAsync(URI, strContent);

            //}
            //foreach (var item in lstDelayInfo)
            //{
            //    var content = JsonConvert.SerializeObject(item);
            //    var client = new RestClient("http://192.168.1.14:11412");
            //    var request = new RestRequest("", Method.POST);
            //request.Method = Method.POST;

            //request.AddParameter("application/json", content, ParameterType.RequestBody);
            //request.RequestFormat = DataFormat.Json;
            //request.AddBody(new { ID = 123456 });
            //request.AddHeader("", "application/json");
            //request.Parameters.Clear();
            //request.AddParameter("application/json", content, ParameterType.RequestBody);

            //var response = client.Execute(request);
            //var ct = response.Content;




            //    if (item.Time < (DateTime.Now - item.LastSend).TotalMilliseconds)
            //    {
            //        gửi data
            //var data = TrackDataService.GetDataByDelayTime(item.ID);
            //        var client = new RestClient("http://192.168.1.14:11412");

            //        var request = new RestRequest("/", Method.POST);
            //        request.RequestFormat = DataFormat.Json;
            //        request.AddJsonBody(new { gg = "l" });
            //        {
            //            MRFF = "1",
            //Seqno = "1",
            //ID = item.ID,
            //Time = item.TransmitTime.ToString("HHmmss"),
            //State = item.State,
            //Latitude = item.Latitude,
            //ExpSN = item.DirectionSN,
            //Longitude = item.Longitude,
            //ExpEW = item.DirectionEW,
            //Speed = item.Speed,
            //DIR = "",
            //Date = item.TransmitTime.ToString("ddMMyyyy")
            //        });
            //        request.Timeout = 30 * 1000;
            //        var rs = client.Execute(request);

            //    }
        }
    }

        // public void Execute(IJobExecutionContext context)
        // {
        //     Console.WriteLine("Hello, JOb info");


        //     var lstDevice = TrackDataService.GetListDeviceStatus(1); // 1 la gì 
        //     if (lstDevice != null)
        //     {
        //         foreach (var item in lstDevice)
        //         {
        //             try
        //             {
        //                 var client = new RestClient("http://192.168.1.1");
        //                 var request = new RestRequest("", Method.POST);
        //                 request.RequestFormat = DataFormat.Json;
        //                 request.AddBody(new
        //                 {
        //                     MRFF = "1",
        //                     Seqno = "1",
        //                     ID = item.DeviceID,
        //                     Time = item.TransmitTime.ToString("HHmmss"),
        //                     State = item.State,
        //                     Latitude = item.Latitude,
        //                     ExpSN = item.DirectionSN,
        //                     Longitude = item.Longitude,
        //                     ExpEW = item.DirectionEW,
        //                     Speed = item.Speed,
        //                     DIR = "",
        //                     Date = item.TransmitTime.ToString("ddMMyyyy")
        //                 });
        //                 request.Timeout = 30 * 1000;
        //                 var rs = client.Execute(request);
        //                 if (rs.StatusCode == HttpStatusCode.OK)
        //                 {
        //                 }
        //             }
        //             catch (Exception)
        //             {

        //             }

        //         }
        //     }
        // }
    
}
