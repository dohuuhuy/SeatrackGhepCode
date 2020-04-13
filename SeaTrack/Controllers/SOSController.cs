using SeaTrack.Lib.DTO;
using SeaTrack.Lib.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SeaTrack.Controllers
{
    public class SOSController : Controller
    {
        // GET: SOS
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult GetSOS()
        {
            var user = (Users)Session["User"];
            if (user == null)
            {
                return RedirectToAction("Login", "Home", new { area = "" });
            }
            var data = SOSService.GetSOSPendingByUserID(user.UserID);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}