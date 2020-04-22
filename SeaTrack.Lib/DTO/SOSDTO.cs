using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeaTrack.Lib.DTO
{
    public class SOSDTO
    {
        public Int64 SOSID { get; set; }
        public int DeviceID { get; set; }
        public string DeviceImei { get; set; }
        public string DeviceName { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string DirectionSN { get; set; }
        public string DirectionEW { get; set; }
        public DateTime DateRequest { get; set; }
        public string GMT { get; set; }
        public int Status { get; set; }
    }
}
