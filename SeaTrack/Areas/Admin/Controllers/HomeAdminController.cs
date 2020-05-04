using SeaTrack.Lib.DTO;
using SeaTrack.Lib.DTO.Admin;
using SeaTrack.Lib.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SeaTrack.Areas.Admin.Controllers
{
    public class HomeAdminController : Controller
    {
        // GET: Admin/HomeAdmin
        public ActionResult Index() //Quản lý đại lý
        {
            if (CheckRole(1) != 1)
            {
                if (CheckRole(1) == 0)
                {
                    return RedirectToAction("Login", "Home", new { area = "" });
                }
                return RedirectToAction("ErrorView", "Home", new { area = "" });
            }
            if (TempData["EditResult"] != null)
            {
                ViewBag.EditResult = 0;
            }
            return View();
        }

        public ActionResult Customer()
        {
           if (CheckRole(1) != 1)
            {
                if (CheckRole(1) == 0)
                {
                    return RedirectToAction("Login", "Home", new { area = "" });
                }
                return RedirectToAction("ErrorView", "Home", new { area = "" });
            }
            return View();
        }

        public new ActionResult User()
        {
           if (CheckRole(1) != 1)
            {
                if (CheckRole(1) == 0)
                {
                    return RedirectToAction("Login", "Home", new { area = "" });
                }
                return RedirectToAction("ErrorView", "Home", new { area = "" });
            }
            return View();
        }

        [HttpGet]
        public ActionResult ListUser(int id) //id = roleID
        {
           if (CheckRole(1) != 1)
            {
                if (CheckRole(1) == 0)
                {
                    return RedirectToAction("Login", "Home", new { area = "" });
                }
                return RedirectToAction("ErrorView", "Home", new { area = "" });
            }
            var rs = AdminService.GetListUser(id);
            return Json(rs, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CreateUser(UserInfoDTO user, int roleID)
        {
            if (CheckRole(1) == -1 && CheckRole(2) == -1)
            {
                if (CheckRole(1) == 0 && CheckRole(2) == 0)
                {
                    return RedirectToAction("Login", "Home", new { area = "" });
                }
                return RedirectToAction("ErrorView", "Home", new { area = "" });
            }
            var us = (Users)Session["User"];
            user.CreateBy = us.Username;
            user.CreateDate = DateTime.Now;
            user.UpdateBy = "";
            user.LastUpdateDate = DateTime.Now;
            user.Status = 1;
            if (user.ManageBy==null)
            {
                user.ManageBy = us.Username;
            }
            var rs = AdminService.CreateUser(user, roleID);
            return Json(new { success = true });
        }

        [HttpGet]
        public ActionResult Detail(int id)
        {
           if (CheckRole(1) != 1)
            {
                if (CheckRole(1) == 0)
                {
                    return RedirectToAction("Login", "Home", new { area = "" });
                }
                return RedirectToAction("ErrorView", "Home", new { area = "" });
            }
            if (TempData["EditResult"] != null)
            {
                ViewBag.EditResult = TempData["EditResult"];
            }
            UserInfoDTO us = new UserInfoDTO();
            us = AdminService.GetUserByID(id);
            if (us != null)
            {
                return View(us);

            }
            TempData["EditResult"] = 0;
            return RedirectToAction("Index", "HomeAdmin");
        }

        [HttpPost]
        public ActionResult EditUser(UserInfoDTO user)
        {
            if (CheckRole(1) == -1 && CheckRole(2) == -1)
            {
                if (CheckRole(1) == 0 && CheckRole(2) == 0)
                {
                    return RedirectToAction("Login", "Home", new { area = "" });
                }
                return RedirectToAction("ErrorView", "Home", new { area = "" });
            }
            var u = Session["User"] as Users;
            try
            {
                user.UpdateBy = u.Username;
                //UserEdit.ManageBy = user.ManageBy;
                user.LastUpdateDate = DateTime.Now;
                bool res = AdminService.EditUser(user);
                if (res)
                {
                    TempData["EditResult"] = 1;
                    if (u.RoleID==2)
                    {
                        return RedirectToAction("Detail", "Agency", new { id = user.UserID });
                    }
                    return RedirectToAction("Detail", "HomeAdmin",new { id = user.UserID });
                }
                else
                {
                    TempData["EditResult"] = -1;
                    if (u.RoleID == 2)
                    {
                        return RedirectToAction("Detail", "Agency", new { id = user.UserID });
                    }
                    return RedirectToAction("Detail", "HomeAdmin", new { id = user.UserID });
                }
            }
            catch (Exception)
            {
                TempData["EditResult"] = 0;
                if (u.RoleID == 2)
                {
                    return RedirectToAction("Detail", "Agency", new { id = user.UserID });
                }
                return RedirectToAction("Detail", "HomeAdmin", new { id = user.UserID });
                throw;
            }
        }


        [HttpGet]
        public ActionResult LockUser(int id)
        {
            if (CheckRole(1) == -1 && CheckRole(2) == -1)
            {
                if (CheckRole(1) == 0 && CheckRole(2) == 0)
                {
                    return RedirectToAction("Login", "Home", new { area = "" });
                }
                return RedirectToAction("ErrorView", "Home", new { area = "" });
            }

            var user = (Users)Session["User"];
            if (user.RoleID != 1)
            {
                var r = AdminService.GetUserByID(id).ManageBy == user.Username ? true : false;
                if (r || AdminService.CheckUserManage(id, user.Username))
                {
                    AdminService.UpdateStatusUser(id, -1);
                    return Json("Đã khóa", JsonRequestBehavior.AllowGet);
                }
                return Json("Không tìm thấy người dùng", JsonRequestBehavior.AllowGet);
            }
            AdminService.UpdateStatusUser(id, -1);
            return Json("Đã khóa", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult UnLockUser(int id)
        {
            if (CheckRole(1) == -1 && CheckRole(2) == -1)
            {
                if (CheckRole(1) == 0 && CheckRole(2) == 0)
                {
                    return RedirectToAction("Login", "Home", new { area = "" });
                }
                return RedirectToAction("ErrorView", "Home", new { area = "" });
            }
            var user = (Users)Session["User"];
            if (user.RoleID != 1)
            {
                var r = AdminService.GetUserByID(id).ManageBy == user.Username ? true : false;
                if (r || AdminService.CheckUserManage(id, user.Username))
                {
                    AdminService.UpdateStatusUser(id, 1);
                    return Json("Đã kích hoạt", JsonRequestBehavior.AllowGet);
                }
                return Json("Không tìm thấy người dùng", JsonRequestBehavior.AllowGet);
            }
            AdminService.UpdateStatusUser(id, 1);
            return Json("Đã kích hoạt", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult DeleteUser(int id)
        {
            if (CheckRole(1) == -1 && CheckRole(2) == -1)
            {
                if (CheckRole(1) == 0 && CheckRole(2) == 0)
                {
                    return RedirectToAction("Login", "Home", new { area = "" });
                }
                return RedirectToAction("ErrorView", "Home", new { area = "" });
            }
            var user = (Users)Session["User"];
            if (user.RoleID != 1)
            {
                var r = AdminService.GetUserByID(id).ManageBy == user.Username ? true : false;
                if (r || AdminService.CheckUserManage(id, user.Username))
                {
                    AdminService.DeleteUser(id);
                    return Json("Đã xóa", JsonRequestBehavior.AllowGet);
                }
                return Json("Không tìm thấy người dùng", JsonRequestBehavior.AllowGet);
            }
            AdminService.DeleteUser(id);
            return Json("Đã xóa", JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public ActionResult CheckUsername(Users user)
        {
            var res = AdminService.CheckUserExist(user.Username);
            if (res == null)
            {
                res = "OK";
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public int CheckRole(int role)
        {
            var user = (Users)Session["User"];
            if (user != null)
            {
                if (user.RoleID != role)
                {
                    return -1; //sai quyền
                }
                return 1; //Hợp lệ
            }
            return 0; //Chưa đăng nhập
        }

    }
}