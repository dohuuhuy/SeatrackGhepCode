using Quartz;
using SeaTrack.Lib.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeaTrack.Lib.Job
{
    public class JobCheckExpired : IJob
    {
        public void Execute(IJobExecutionContext context)
        {
            AdminService.CheckExpired();
        }
    }
}
