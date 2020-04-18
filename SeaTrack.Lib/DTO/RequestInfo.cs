using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeaTrack.Lib.DTO
{
    public class RequestInfo
    {
        public string MREF { get; set; }
        public string ID { get; set; }
        //public string Message { get; set; }
        public string Seqno { get; set; }
        public string Time { get; set; }
        public string State { get; set; }
        public string Latitude { get; set; }
        public string ExpSN { get; set; }
        public string Longitude { get; set; }
        public string ExpEW { get; set; }
        public float Speed { get; set; }
        public string DIR { get; set; }
        public string Date { get; set; }
    }
}
