using SeaTrack.Lib.DTO;
using SeaTrack.Lib.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SeaTrack.Areas.Admin.Controllers
{
    public class FeedBackController : Controller
    {

        public ActionResult Index()
        {
            return View("QuanLyPhanHoi");
        }

        public ActionResult ChangeStatusFeed(int? id)
        {
            if (id != null)
            {

                var data = AdminService.UpdateStatusFeed((int)id);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            return Json("Không thành công !", JsonRequestBehavior.AllowGet);

        }
        [HttpGet]
        public ActionResult GetListFeed()
        {

            var data = AdminService.GetListFeed();
            return Json(data, JsonRequestBehavior.AllowGet);
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