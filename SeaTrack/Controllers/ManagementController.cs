using SeaTrack.Lib.DTO;
using SeaTrack.Lib.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SeaTrack.Controllers
{
    public class ManagementController : Controller
    {
        // GET: Management
        public ActionResult Account()
        {
            if (Session["User"] == null)
            {
                return RedirectToAction("Login");
            }
            return View("ThongTinTaiKhoan");
        }

        [HttpGet]
        public ActionResult GetListUserOfCus()
        {
            var user = (Users)Session["User"];
            string name = user.Username;
            var data = UsersService.GetListUserOfCustomers(name);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DeviceAndDriver()
        {
            if (Session["User"] == null)
            {
                return RedirectToAction("Login");
            }
            return View("ThietBiVaLaiTau");
        }
    }
}