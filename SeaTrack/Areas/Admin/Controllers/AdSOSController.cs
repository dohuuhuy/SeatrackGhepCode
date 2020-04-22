using SeaTrack.Lib.DTO;
using SeaTrack.Lib.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SeaTrack.Areas.Admin.Controllers
{
    public class AdSOSController : Controller
    {
        // GET: Admin/AdSOS
        public ActionResult Index()
        {
            return View("ListSOS");
        }

        public ActionResult ChangeStatusSOS(int? id)
        {
            if (id != null)
            {

                var data = SOSService.UpdateStatusSOSbyID((int)id, -1);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
                return Json("Không thành công !", JsonRequestBehavior.AllowGet);
          
        }
        [HttpGet]
        public ActionResult GetListSOS()
        {
            var user = (Users)Session["User"];

            if(user.RoleID == 1)
            {
                var data = SOSService.GetSOSPending();
                return Json(data, JsonRequestBehavior.AllowGet);
            }   
            if(user.RoleID == 2)
            {
                var data = SOSService.GetSOSPendingByUserID(user.UserID);
                return Json(data, JsonRequestBehavior.AllowGet);
            }

            return Json("Không thành công !", JsonRequestBehavior.AllowGet);
        }

        public int CheckRole(int role)
        {
            var user = (Users)Session["User"];
            if (user != null)
            {
                if (user.RoleID != role)
                {
                    return -1; //sai quyền
                }
                return 1; //Hợp lệ
            }
            return 0; //Chưa đăng nhập
        }
    }
}