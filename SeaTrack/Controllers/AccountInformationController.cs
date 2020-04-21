using SeaTrack.Lib.DTO;
using SeaTrack.Lib.DTO.Admin;
using SeaTrack.Lib.Service;
using System;
using System.Collections.Generic;
using System.IO;
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
            if  ( Convert.ToInt32 (TempData["uploadresult"]) == 1)
            {
                ViewBag.uploadresult = 1;
            }
            if (Convert.ToInt32(TempData["uploadresult"]) == -1)
            {
                ViewBag.uploadresult = -1;
            }
            return View("ThongTinCaNhan");
        }
        public ActionResult GetUserInfo()
        {
            Users user = (Users)Session["User"];
            Session["User"] = UsersService.CheckUsers(user.Username, user.Password);
            var us = (Users)Session["User"];
            if (user != null)
            {
                //Users us = UsersService.CheckUsers(user.Username, user.Password);
                return Json(us, JsonRequestBehavior.AllowGet);
            }

            return RedirectToAction("Login", "Home", new { area = "" });
        }
        public ActionResult UpdateUser(UserInfoDTO us)
        {
            Users user = (Users)Session["User"];
            if (user != null)
            {
                if (user.RoleID == us.RoleID)
                {
                    us.CreateDate = user.CreateDate;
                    us.LastUpdateDate = DateTime.Now;
                    us.UpdateBy = user.Username;
                    AdminService.EditUser(us);
                    Session["User"] = UsersService.CheckUsers(user.Username, user.Password);
                    return Json("Đã cập nhật", JsonRequestBehavior.AllowGet);
                }
                return RedirectToAction("ErrorView", "Home", new { area = "" });
            }
            return RedirectToAction("Login", "Home", new { area = "" });
        }
        [HttpPost]
        public ActionResult Upload(HttpPostedFileBase file)
        {

            if (file != null && file.ContentLength < 1024000)
            {
                
                Users user = (Users)Session["User"];
                var filename = user.Username + ".jpg";
                var path = Path.Combine(Server.MapPath("~/Content/images/UserAvatar"), filename);
                file.SaveAs(path);
                AdminService.UpdateAvatar(user.UserID, filename);
                TempData["uploadresult"] = 1;
                return RedirectToAction("AccountInfo");
            }
            else
            {
                TempData["uploadresult"] = -1;
                return RedirectToAction("AccountInfo");
            }    
          
           
        }

        [HttpPost]
        public ActionResult ChangePassword(Users user)
        {
            var us = (Users)Session["User"];
            if (us != null && us.UserID != user.UserID)
            {
                return RedirectToAction("Login", "Home", new { area = "" });
            }
            var res = UsersService.ChangePassword(user.UserID, user.Password);
            Session["User"] = UsersService.CheckUsers(user.Username, user.Password);
            return Json(res, JsonRequestBehavior.AllowGet);
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