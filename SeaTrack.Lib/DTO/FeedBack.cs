using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeaTrack.Lib.DTO
{
    class FeedBack
    {
        public int FeedID { get; set; }
        public String Name { get; set; }
        public String Email { get; set; }
        public String Title { get; set; }
        public String Comment { get; set; }
        public int Quality { get; set; }
        public DateTime CreateDatime { get; set; }


    }
}
