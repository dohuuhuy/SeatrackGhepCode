using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SeaTrack.Controllers
{
    public class ReportController : Controller
    {
        // GET: Report
        public ActionResult Ministry()
        {
            if (Session["User"] == null)
            {
               return RedirectToAction("Login", "Home");
            }
            return View("HanhTrinhTauChay");
        }
        public ActionResult Business()
        {
            if (Session["User"] == null)
            {
               return RedirectToAction("Login", "Home");
            }
            return View("BaoCaoTongHopHoatDong");
        }
        public ActionResult JourneyBoatRun()
        {
            if (Session["User"] == null)
            {
               return RedirectToAction("Login", "Home");
            }
            return View("HanhTrinhTauChay");
        }
        public ActionResult SpeedOfBoat()
        {
            if (Session["User"] == null)
            {
               return RedirectToAction("Login", "Home");
            }
            return View("TocDoCuaTau");
        }
        public ActionResult ExceedScopeCatch()
        {
            if (Session["User"] == null)
            {
               return RedirectToAction("Login", "Home");
            }
            return View("VuotPhamViDanhBat");
        }
        public ActionResult SynthesisReportByBoat()
        {
            if (Session["User"] == null)
            {
               return RedirectToAction("Login", "Home");
            }
            return View("BaoCaoTongHopTheoTau");
        }
        public ActionResult SynthesisReportByDriver()
        {
            if (Session["User"] == null)
            {
               return RedirectToAction("Login", "Home");
            }
            return View("BaoCaoTongHopTheoLaiTau");
        }
        public ActionResult SummaryActivityReport()
        {
            if (Session["User"] == null)
            {
               return RedirectToAction("Login", "Home");
            }
            return View("BaoCaoTongHopHoatDong");
        }
        public ActionResult DetailedActivityReport()
        {
            if (Session["User"] == null)
            {
               return RedirectToAction("Login", "Home");
            }
            return View("BaoCaoChiTietHoatDong");
        }
        public ActionResult SummaryReportOfScopeOfActivities()
        {
            if (Session["User"] == null)
            {
               return RedirectToAction("Login", "Home");
            }
            return View("BaoCaoTongHopPhamViHoatDong");
        }
    }

}