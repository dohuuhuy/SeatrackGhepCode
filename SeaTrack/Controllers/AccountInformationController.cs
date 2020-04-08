using SeaTrack.Lib.DTO;
using SeaTrack.Lib.DTO.Admin;
using SeaTrack.Lib.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SeaTrack.Controllers
{
    public class AccountInformationController : Controller
    {
        // GET: AccountInformation
        public ActionResult AccountInfo()
        {
            if (Session["User"] == null)
            {
                return RedirectToAction("Login","Home", new {area = "" });
            }
            return View("ThongTinCaNhan");
        }
        public ActionResult GetUserInfo()
        {
            Users user = (Users)Session["User"];
            return Json(user, JsonRequestBehavior.AllowGet); 
        }

        public ActionResult ExpiredDevice()
        {
            if (Session["User"] == null)
            {
                return RedirectToAction("Login");
            }
            return View("DichVuHetHan");
        }

    }
}