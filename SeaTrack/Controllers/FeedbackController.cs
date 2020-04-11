using SeaTrack.Lib.DTO;
using SeaTrack.Lib.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace SeaTrack.Controllers
{
    public class FeedbackController : Controller
    {
        // GET: Feedback
        public ActionResult Index()
        {
            if (Session["User"] == null)
            {
                return RedirectToAction("Login", "Home");
            }
            return View("PhanHoi");
        }
        [HttpPost]
        public ActionResult Save(FeedBack fb)
        {
            var data = AdminService.SaveFeedBack(fb);
            return Json(new { success = true });
        }
    }
}