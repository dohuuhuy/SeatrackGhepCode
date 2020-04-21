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
        public JsonResult PostCurrentLocation(InfoDTO info)
        {
            if (info.SecretCode == ConnectData.SecretCode && info.CheckNull())
            {
                var item = TrackDataService.GetLastedLocationByImei(info.ID);
                RequestInfo returnInfo = new RequestInfo();
                returnInfo.MREF = info.MREF;
                returnInfo.Seqno = info.Seqno;
                returnInfo.ID = info.ID;
                returnInfo.Time = item.TransmitTime.ToString("HHMMss");
                returnInfo.State = "A";
                returnInfo.Latitude = item.Latitude;
                returnInfo.ExpSN = item.DirectionSN;
                returnInfo.Longitude = item.Longitude;
                returnInfo.ExpEW = item.DirectionEW;
                returnInfo.Speed = item.Speed;
                returnInfo.DIR = "";
                returnInfo.Date = item.TransmitTime.ToString("ddMMyy");
                return Json(returnInfo, JsonRequestBehavior.AllowGet);
            }
            return Json(null, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetCurrentLocation(InfoDTO info)
        {
            if (info.SecretCode == ConnectData.SecretCode && info.CheckNull())
            {
                var item = TrackDataService.GetLastedLocationByImei(info.ID);
                RequestInfo returnInfo = new RequestInfo();
                returnInfo.MREF = info.MREF;
                returnInfo.Seqno = info.Seqno;
                returnInfo.ID = info.ID;
                returnInfo.Time = item.TransmitTime.ToString("HHMMss");
                returnInfo.State = "A";
                returnInfo.Latitude = item.Latitude;
                returnInfo.ExpSN = item.DirectionSN;
                returnInfo.Longitude = item.Longitude;
                returnInfo.ExpEW = item.DirectionEW;
                returnInfo.Speed = item.Speed;
                returnInfo.DIR = "";
                returnInfo.Date = item.TransmitTime.ToString("ddMMyy");
                return Json(returnInfo, JsonRequestBehavior.AllowGet);
            }
            return Json(null, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult SetUpDelay(InfoDTO info)
        {
            if (info.SecretCode == ConnectData.SecretCode && info.CheckNullDelay())
            {
                if (InfoService.AddInfoDelay(info) == 1 && InfoService.GetInfoDelay(info.ID).Time == info.Time)
                {

                    return Json(new { MREF = info.MREF, Seqno = info.Seqno, ID = info.ID, Result = "OK" });
                }
                return Json(new { MREF = info.MREF, Seqno = info.Seqno, ID = info.ID, Result = "Fail" });
            }
            return Json(null);
        }

        public ActionResult UserInfo()
        {
            var user = (Users)Session["User"];
            if (user.Username != null && user.Password != null )
            {
                
               var data = UsersService.CheckUsers(user.Username, user.Password);
            } 
            return Json("0001", JsonRequestBehavior.AllowGet);
        }
    }
}
