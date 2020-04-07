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