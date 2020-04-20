using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SeaTrack.Lib.DTO;
using SeaTrack.Models;
using SeaTrack.Lib.Database;
using SeaTrack.Lib.Service;

namespace SeaTrack.Controllers
{
    public class InfoController : ApiController
    {
        
        [HttpPost]
        public HttpResponseMessage Communication([FromBody]InfoDTO rq)
        {
            switch (rq.MREF)
            {
                case "IMG":
                {
                    Lib.Service.TrackDataService.AddMessage(rq.ID, rq.Message);
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
                case "2":
                    var rs= Lib.Service.TrackDataService.GetLastedLocation(int.Parse(rq.ID));
                    if (rs != null)
                    {
                        return Request.CreateResponse(HttpStatusCode.OK,
                            new
                            {
                                rq.MREF,
                                rq.Seqno,
                                rq.ID,
                                Time = rs.TransmitTime.ToString("hhMMss"),
                                State = rs.State,
                                rs.Latitude,
                                rs.Longitude,
                                rs.Speed,
                                Date = rs.TransmitTime.ToString("ddmmyyyy")
                            });
                    }
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                case "6":
                    var val = Lib.Service.TrackDataService.AddConfigTime(rq.ID,rq.OpCode,rq.Time);
                    return Request.CreateResponse(HttpStatusCode.OK, new {Results = val > 0 ? "OK" : "Fail"});
            

            }
            return Request.CreateResponse(HttpStatusCode.OK);

        }

        [HttpPost]
        public HttpResponseMessage CurrentLocation([FromBody] InfoDTO info)
        {
            if (info.SecretCode == ConnectData.SecretCode && info.CheckNull())
            {
                var item = TrackDataService.GetLastedLocationByImei(info.ID);
                if (item != null)
                {
                    RequestInfo returnInfo = new RequestInfo();
                    returnInfo.MREF = info.MREF;
                    returnInfo.Seqno = info.Seqno;
                    returnInfo.ID = info.ID;
                    returnInfo.Time = item.TransmitTime.ToString("HH:mm:ss");
                    returnInfo.State = "A";
                    returnInfo.Latitude = item.Latitude;
                    returnInfo.ExpSN = item.DirectionSN;
                    returnInfo.Longitude = item.Longitude;
                    returnInfo.ExpEW = item.DirectionEW;
                    returnInfo.Speed = item.Speed;
                    returnInfo.DIR = "";
                    returnInfo.Date = item.TransmitTime.ToString("dd/MM/yyyy");
                    return Request.CreateResponse(HttpStatusCode.OK, returnInfo);
                }
                Request.CreateResponse(HttpStatusCode.BadRequest);

            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        [HttpPost]
        public HttpResponseMessage SetUpDelay([FromBody] InfoDTO info)
        {
            if (info.SecretCode == ConnectData.SecretCode && info.CheckNullDelay())
            {
                if (InfoService.AddInfoDelay(info) == 1 && InfoService.GetInfoDelay(info.ID).Time == info.Time)
                {

                    return Request.CreateResponse(HttpStatusCode.OK, new { MREF = info.MREF, Seqno = info.Seqno, ID = info.ID, Result = "OK" });
                }
                return Request.CreateResponse(HttpStatusCode.OK, new { MREF = info.MREF, Seqno = info.Seqno, ID = info.ID, Result = "Fail" });
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

    }
}
