using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SeaTrack.Controllers
{
    public class UtilitiesController : Controller
    {
        // GET: Utilities
        public ActionResult Index()
        {
            if (Session["User"] == null)
            {
               return RedirectToAction("Login", "Home");
            }
            return View("TienIchThietBi");
        }
        public ActionResult Registry()
        {
            if (Session["User"] == null)
            {
                return RedirectToAction("Login", "Home");
            }
            return View("Dangkiem");
        }
        public ActionResult Update()
        {
            if (Session["User"] == null)
            {
                return RedirectToAction("Login", "Home");
            }
            return View("Nangcap");
        }
        public ActionResult Maintenance()
        {
            if (Session["User"] == null)
            {
                return RedirectToAction("Login", "Home");
            }
            return View("Baotri");
        }
    }
}