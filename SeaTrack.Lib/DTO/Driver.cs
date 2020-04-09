using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeaTrack.Lib.DTO
{
    public class Driver
    {
        public int DriverID { get; set; }
        public String DriverName { get; set; }
        public String Phone { get; set; }
        public String Address { get; set; }
        public String GPLT { get; set; }
        public String IssuedBy { get; set; }
        public String CMND { get; set; }
        public String Rank { get; set; }
        public DateTime CreateDate { get; set; }
        public string ManageBy { get; set; }
        public int Status { get; set; }

    }
}
//public String CreateBy { get; set; }
//public string UpdateBy { get; set; }
//public DateTime LastUpdateDate { get; set; }
//public string Image { get; set; }
