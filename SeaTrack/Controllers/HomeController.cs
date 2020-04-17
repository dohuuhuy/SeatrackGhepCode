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

namespace SeaTrack.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Demo()
        {
            return View("Demo");
        }
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
            int _userid = user.UserID;

            List<DeviceStatus> data = TrackDataService.GetListDeviceStatus(_userid);
            return Json(new { Result = data }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetLastedLocation(int deviceID)
        {
            TrackData data = TrackDataService.GetLastedLocation(deviceID);
            return Json(new { Result = data }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetRoadmap(int deviceID)
        {
            List<TrackData> data = TrackDataService.GetRoadmap(deviceID);
            return Json(new { Result = data }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetRoadmapByDateTime(int deviceID, string From, string To)
        {
            DateTime fromtime = Convert.ToDateTime(DateTime.ParseExact(From, "dd-M-yyyy HH:mm", CultureInfo.InvariantCulture));
            DateTime totime = Convert.ToDateTime(DateTime.ParseExact(To, "dd-M-yyyy HH:mm", CultureInfo.InvariantCulture));

            //DateTime fromtime = Convert.ToDateTime(From);
            //DateTime totime = Convert.ToDateTime(To);

            List<TrackData> data = TrackDataService.GetRoadmapByDateTime(deviceID, fromtime, totime);
            return Json(new { Result = data }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetRoadmapByDateTimeAndDriver(int deviceID, string From, string To)
        {
            DateTime fromtime = Convert.ToDateTime(DateTime.ParseExact(From, "dd-M-yyyy HH:mm", CultureInfo.InvariantCulture));
            DateTime totime = Convert.ToDateTime(DateTime.ParseExact(To, "dd-M-yyyy HH:mm", CultureInfo.InvariantCulture));

            //DateTime fromtime = Convert.ToDateTime(From);
            //DateTime totime = Convert.ToDateTime(To);

            List<TrackDataAndDriver> data = TrackDataService.GetRoadmapByDateTimeAndDriver(deviceID, fromtime, totime);
            return Json(new { Result = data }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetListDevice()
        {
            List<Device> data = TrackDataService.GetListDevice();
            return Json(new { Result = data }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetCurrentLocation(InfoDTO info)
        {
            if (info.SecretCode ==ConnectData.SecretCode)
            {
                var item = TrackDataService.GetLastedLocationByImei(info.ID);
                RequestInfo returnInfo = new RequestInfo();
                returnInfo.MREF = info.MREF;
                returnInfo.Seqno = info.Seqno;
                returnInfo.ID = info.ID;
                returnInfo.Time = item.TransmitTime.ToString("HH:MM:SS");
                returnInfo.State = item.State;
                returnInfo.Latitude = item.Latitude.ToString();
                returnInfo.ExpSN = item.DirectionSN;
                returnInfo.Longitude = item.Longitude.ToString();
                returnInfo.ExpEW = item.DirectionEW;
                returnInfo.Speed = item.Speed;
                returnInfo.DIR = "";
                returnInfo.Date = item.TransmitTime.ToString("DD/MM/YY");
                return Json(returnInfo, JsonRequestBehavior.AllowGet);
            }
            return Json(null, JsonRequestBehavior.AllowGet);
        }


        public ActionResult UserInfo()
        {
            Users uitem = null;
            if (Request.Cookies["userName"] != null && Request.Cookies["pass"] != null)
            {
                var name = Request.Cookies["userName"].Value;
                var pass = Request.Cookies["pass"].Value;
                uitem = UsersService.CheckUsers(name, pass);
            }
            if (uitem != null)
            {
                return Json(uitem, JsonRequestBehavior.AllowGet);
            }
            return Json("0001", JsonRequestBehavior.AllowGet);
        }
    }
}
