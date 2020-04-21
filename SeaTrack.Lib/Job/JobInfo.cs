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
using System.IO;
using SeaTrack.Lib.Database;

namespace SeaTrack.Lib.Job
{
    public class JobInfo : IJob
    {

        public async void Execute(IJobExecutionContext context)
        {
            var lstDelayInfo = InfoService.GetAllDelayInfo();
            foreach (var item in lstDelayInfo)
            {
                if (item.Time < (DateTime.Now - item.LastSend).TotalSeconds)
                {
                    var data = InfoService.GetDataByDelayTime(item.ID, item.MREF, item.Seqno);
                    if (data != null)
                    {
                        foreach (var i in data)
                        {
                            HttpClient client = new HttpClient();
                            var value = new Dictionary<string, string>
                        {
                            {"MREF","A" },
                            {"Seqno",i.Seqno },
                            {"ID",item.ID },
                            {"Time", i.Time },
                            {"Latitude", i.Latitude.ToString() },
                            {"ExpSN",i.ExpSN },
                            {"Longitude", i.Longitude.ToString() },
                            {"ExpEW",i.ExpEW },
                            {"Speed",i.Speed.ToString() },
                            {"DIR","" },
                            {"Date",i.Date },
                        };
                            var content = new FormUrlEncodedContent(value);
                            //var emptyContent = new StringContent("{}", Encoding.UTF8, "application/json");
                            var res = await client.PostAsync(ConnectData.URLBaoCaoDinhKy, content);
                            //var res = await client.PostAsync("http://192.168.1.14:11413", emptyContent);
                            var responseString = await res.Content.ReadAsStringAsync();

                            //var client = new RestClient("http://hkt01.demowebmau.com");
                            //var request = new RestRequest("post/iridiums", Method.POST);
                            //request.RequestFormat = DataFormat.Json;
                            ////var senddata = JsonConvert.SerializeObject(i);
                            ////System.Diagnostics.Debug.WriteLine(senddata);
                            //request.AddJsonBody(new {MREF = i.MREF, Seqno = i.Seqno, ID = i.ID, Time = i.Time, Latitude = i.Latitude, ExpSN = i.ExpSN, Longitude = i.Longitude, ExpEW = i.ExpEW, Speed = i.Speed, DIR = "", Date = i.Date});
                            //var rs = client.Execute(request);
                            //System.Diagnostics.Debug.WriteLine(rs.Content);
                        System.Diagnostics.Debug.WriteLine(DateTime.Now);
                        InfoService.UpdateLastSend(item.ID, DateTime.Now);

                        }

                    }
                    //
                }
            }
            //InfoDTO info = new InfoDTO();
            //info.MREF = "Alo";
            //info.ID = "869247042912003";
            //info.Seqno = "A";
            //info.SecretCode = "A";

            //var data = new { data = "Sida quá" };
            //string URI = "http://hkt01.demowebmau.com/post/iridiums";
            //var content = JsonConvert.SerializeObject(data);
            //var strContent = new StringContent(content, Encoding.UTF8, "application/json");
            //using (var client = new HttpClient())
            //{
            //    using (var res = await client.PostAsync(URI, strContent))
            //    {
            //        var kq = await res.Content.ReadAsStringAsync();
            //        RequestInfo rf = JsonConvert.DeserializeObject<RequestInfo>(kq);
            //        Console.Write(rf);
            //    }
            //}
            //
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
