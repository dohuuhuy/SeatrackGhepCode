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
                return RedirectToAction("Login");
            }
            return View("ThongTinCaNhan");
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