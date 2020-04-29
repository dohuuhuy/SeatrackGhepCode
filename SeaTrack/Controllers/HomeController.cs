using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using DotNetNuke.Common.Utilities;
using SeaTrack.Lib.DTO;
using SeaTrack.Lib.Service;
using SeaTrack.Models;
using SeaTrack.Lib.Database;
using SeaTrack.Lib.DTO.Admin;

namespace SeaTrack.Controllers
{
    public class HomeController : Controller
    {
       
        public ActionResult Route()
        {
            if (Session["User"] == null)
            {
                return RedirectToAction("Login", "Home");
            }
            return View("Route");
        }

        public ActionResult Map()
        {
            return View();
        }
        public ActionResult Login()
        {
            var user = (Users)Session["User"];
            if (user != null)
            {
                if (user.RoleID == 3 || user.RoleID == 4)
                {
                    return RedirectToAction("Route", "Home");
                }
                else if (user.RoleID == 1)
                {
                    return RedirectToAction("Index", "HomeAdmin", new { area = "Admin" });
                }
                else if (user.RoleID == 2)
                {
                    return RedirectToAction("Customer", "Agency", new { area = "Admin" });
                }
            }
            if (TempData["statusLogin"] != null)
            {
                if ((int)TempData["statusLogin"] == 0)
                {
                    ViewBag.StatusLogin = 0;
                }
                else
                {
                    ViewBag.StatusLogin = -1;

                }
            }
            return View("Login");
        }
        [HttpPost]
        public ActionResult ValidateUser(FormCollection from)
        {
            var user = (Users)Session["User"];
            if (user != null)
            {
                if (user.RoleID == 3 || user.RoleID == 4)
                    return RedirectToAction("Route", "Home");
                else
                {
                    if (user.RoleID == 1)
                    {
                        return RedirectToAction("Index", "HomeAdmin", new { area = "Admin" });
                    }
                    return RedirectToAction("Customer", "Agency", new { area = "Admin" });
                }

            }
            String username_ = from["username"];
            String password_ = from["password"];
            if (!String.IsNullOrEmpty(username_) || !String.IsNullOrEmpty(password_))
            {
                Users useritem = UsersService.CheckUsers(username_, password_);
                if (useritem != null)
                {
                    if (useritem.Status == 1)
                    {
                        Session.Add("User", useritem);
                        if (useritem.RoleID != 1 && useritem.RoleID != 2)
                        {
                            //FormsAuthentication.SetAuthCookie(useritem.Username, true);
                            return RedirectToAction("Route", "Home");
                        }
                        else
                        {
                            if (useritem.RoleID == 1)
                            {
                                return RedirectToAction("Index", "HomeAdmin", new { area = "Admin" });
                            }
                            return RedirectToAction("Customer", "Agency", new { area = "Admin" });
                        }
                    }
                    TempData["statusLogin"] = -1;
                    return RedirectToAction("Login", "Home");
                }
                TempData["statusLogin"] = 0;
                return RedirectToAction("Login", "Home");
            }
            TempData["statusLogin"] = 0;
            return RedirectToAction("Login", "Home");
        }

        [AllowAnonymous]
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            //Session["userName"] = null;
            //Session["pass"] = null;
            Session.Remove("User");
            return RedirectToAction("Login", "Home");
        }
        [HttpGet]
        public ActionResult GetListDeviceStatus()
        {
            var user = (Users)Session["User"];
            if (user == null)
            {
                RedirectToAction("Login", "Home");
            }
            int _userid = user.UserID;

            List<DeviceStatus> data = TrackDataService.GetListDeviceStatus(_userid);
            return Json(new { Result = data }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetListDeviceExprise()
        {
            var user = (Users)Session["User"];
            if (user == null)
            {
                RedirectToAction("Login", "Home");
            }
            int _userid = user.UserID;

            var data = AdminService.GetListDeviceByUserID(_userid);
            return Json(new { Result = data }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetLastedLocation(int deviceID)
        {
            var user = (Users)Session["User"];
            if (user == null)
            {
                RedirectToAction("Login", "Home");
            }
            TrackData data = TrackDataService.GetLastedLocation(deviceID);
            return Json(new { Result = data }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetRoadmap(int deviceID)
        {
            var user = (Users)Session["User"];
            if (user == null)
            {
                RedirectToAction("Login", "Home");
            }
            List<TrackData> data = TrackDataService.GetRoadmap(deviceID);
            return Json(new { Result = data }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetRoadmapByDateTime(int deviceID, string From, string To)
        {
            var user = (Users)Session["User"];
            if (user == null)
            {
                RedirectToAction("Login", "Home");
            }
            DateTime fromtime = Convert.ToDateTime(DateTime.ParseExact(From, "dd-M-yyyy HH:mm", CultureInfo.InvariantCulture));
            DateTime totime = Convert.ToDateTime(DateTime.ParseExact(To, "dd-M-yyyy HH:mm", CultureInfo.InvariantCulture));

            //DateTime fromtime = Convert.ToDateTime(From);
            //DateTime totime = Convert.ToDateTime(To);

            List<TrackData> data = TrackDataService.GetRoadmapByDateTime(deviceID, fromtime, totime);
            return Json(new { Result = data }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetRoadmapByDateTimeAndDriver(int deviceID, string From, string To)
        {
            var user = (Users)Session["User"];
            if (user == null)
            {
                RedirectToAction("Login", "Home");
            }
            DateTime fromtime = Convert.ToDateTime(DateTime.ParseExact(From, "dd-M-yyyy HH:mm", CultureInfo.InvariantCulture));
            DateTime totime = Convert.ToDateTime(DateTime.ParseExact(To, "dd-M-yyyy HH:mm", CultureInfo.InvariantCulture));

            //DateTime fromtime = Convert.ToDateTime(From);
            //DateTime totime = Convert.ToDateTime(To);

            List<TrackDataAndDriver> data = TrackDataService.GetRoadmapByDateTimeAndDriver(deviceID, fromtime, totime);
            return Json(new { Result = data }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetListDevice()
        {
            var user = (Users)Session["User"];
            if (user == null)
            {
                RedirectToAction("Login", "Home");
            }
            List<Device> data = TrackDataService.GetListDevice();
            return Json(new { Result = data }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult CheckDriver(List<TrackData> list)
        {
            var user = (Users)Session["User"];
            if (user == null)
            {
                RedirectToAction("Login", "Home");
            }
            List<string> Names = new List<string>();
            foreach (var i in list)
            {
                List<DataDriver> data = TrackDataService.CheckDriver(i.ID);
                foreach (var item in data)
                {
                    if (item.TuNgay < item.TransmitTime && item.TransmitTime < item.DenNgay)
                    {
                        Names.Add(item.DriverName);
                    }
                }
            }
            return Json( new { Result = Names }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UserInfo()
        {
            var user = (Users)Session["User"];
            if (user == null)
            {
                RedirectToAction("Login", "Home");
            }

            if (user.Username != null && user.Password != null )
            {
                
               var data = UsersService.CheckUsers(user.Username, user.Password);
                return Json(new { Result = data }, JsonRequestBehavior.AllowGet);
            }
            return Json("Không có dữ liệu", JsonRequestBehavior.AllowGet);
        }

        public ActionResult ErrorView()
        {
            return View();
        }
    }
}
