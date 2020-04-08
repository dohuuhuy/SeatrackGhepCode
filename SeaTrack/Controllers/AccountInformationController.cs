using SeaTrack.Lib.DTO;
using SeaTrack.Lib.DTO.Admin;
using SeaTrack.Lib.Service;
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


        public ActionResult ExpiredDevice()
        {
            if (Session["User"] == null)
            {
               return RedirectToAction("Login", "Home");
            }
            return View("DichVuHetHan");
        }

    }
}