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
            return View("ThongTinCaNhan");
        }
        public ActionResult GetUserInfo()
        {
            Users user = (Users)Session["User"];
            if (user != null)
            {
                //Users us = UsersService.CheckUsers(user.Username, user.Password);
                return Json(user, JsonRequestBehavior.AllowGet);
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
            
            if (file != null && file.ContentLength > 0 )
            {

                Users user = (Users)Session["User"];
                var filename = user.Username + ".jpg";
                var path = Path.Combine(Server.MapPath("~/Content/images/UserAvatar"), filename);
                file.SaveAs(path);
                AdminService.UpdateAvatar(user.UserID, filename);
            }
            return RedirectToAction("AccountInfo");
            //return Json("OK", JsonRequestBehavior.AllowGet);
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