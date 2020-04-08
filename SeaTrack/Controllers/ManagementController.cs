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
    public class ManagementController : Controller
    {
        // GET: Management
        public ActionResult Account()
        {
            if (Session["User"] == null)
            {
                return RedirectToAction("Login");
            }
            return View("ThongTinTaiKhoan");
        }

        [HttpGet]
        public ActionResult GetListUserOfCus()
        {
            var user = (Users)Session["User"];
            string name = user.Username;
            var data = UsersService.GetListUserOfCustomers(name);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult CreateUser(UserInfoDTO us)
        {
          
            var user = (Users)Session["User"];
            us.CreateBy = user.Username;
            us.CreateDate = DateTime.Now;
            us.UpdateBy = user.Username;
            us.LastUpdateDate = DateTime.Now;
            us.ManageBy = user.Username;
            us.Status = 1;
            us.Password = "123";
            var data = AdminService.CreateUser(us,4);
            return Json(new { success = true });

        }
        //[HttpPost]
        //public ActionResult EditUsers(Users Users)
        //{
        //    if (CheckRole(1) == -1 && CheckRole(2) == -1)
        //    {
        //        if (CheckRole(1) == 0 && CheckRole(2) == 0)
        //        {
        //            return RedirectToAction("Login", "Home", new { area = "" });
        //        }
        //        return RedirectToAction("ErrorView", "Home", new { area = "" });
        //    }
        //    var user = (Users)Session["User"];
        //    if (user.RoleID != 1)
        //    {
        //        var res = AdminService.CheckUserUsers(user.UserID, Users.UsersID);
        //        if (res)
        //        {
        //            AdminService.UpdateUsers(Users);
        //            return Json("Đã cập nhật", JsonRequestBehavior.AllowGet);
        //        }
        //        return Json("Không tìm thấy thiết bị", JsonRequestBehavior.AllowGet);
        //    }
        //    var data = AdminService.UpdateUsers(Users);
        //    return Json("Đã cập nhật", JsonRequestBehavior.AllowGet);

        //}

        //[HttpGet]
        //public ActionResult DeleteUsers(int id)
        //{
        //    if (CheckRole(1) == -1 && CheckRole(2) == -1)
        //    {
        //        if (CheckRole(1) == 0 && CheckRole(2) == 0)
        //        {
        //            return RedirectToAction("Login", "Home", new { area = "" });
        //        }
        //        return RedirectToAction("ErrorView", "Home", new { area = "" });
        //    }

        //    var user = (Users)Session["User"];
        //    if (user.RoleID != 1)
        //    {
        //        var res = AdminService.CheckUserUsers(user.UserID, id);
        //        if (res)
        //        {
        //            AdminService.DeleteUsers(id);
        //            return Json("Đã khóa", JsonRequestBehavior.AllowGet);
        //        }
        //        return Json("Không tìm thấy thiết bị", JsonRequestBehavior.AllowGet);
        //    }
        //    var data = AdminService.DeleteUsers(id);
        //    return Json("đã khóa", JsonRequestBehavior.AllowGet);
        //}

        //[HttpGet]
        //public ActionResult UnlockUsers(int id)
        //{
        //    if (CheckRole(1) == -1 && CheckRole(2) == -1)
        //    {
        //        if (CheckRole(1) == 0 && CheckRole(2) == 0)
        //        {
        //            return RedirectToAction("Login", "Home", new { area = "" });
        //        }
        //        return RedirectToAction("ErrorView", "Home", new { area = "" });
        //    }

        //    var user = (Users)Session["User"];
        //    if (user.RoleID != 1)
        //    {
        //        var res = AdminService.CheckUserUsers(user.UserID, id);
        //        if (res)
        //        {
        //            AdminService.UnlockUsers(id);
        //            return Json("Đã kích hoạt", JsonRequestBehavior.AllowGet);
        //        }
        //        return Json("Không tìm thấy thiết bị", JsonRequestBehavior.AllowGet);
        //    }
        //    var data = AdminService.DeleteUsers(id);
        //    return Json("Đã kích hoạt", JsonRequestBehavior.AllowGet);
        //}
        //public ActionResult UsersAndDriver()
        //{
        //    if (Session["User"] == null)
        //    {
        //        return RedirectToAction("Login");
        //    }
        //    return View("ThietBiVaLaiTau");
        //}
    }
}