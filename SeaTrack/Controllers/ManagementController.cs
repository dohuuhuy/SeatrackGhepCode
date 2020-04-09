using DotNetNuke.Entities.Users;
using SeaTrack.Lib.DTO;
using SeaTrack.Lib.DTO.Admin;
using SeaTrack.Lib.Service;
using System;
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
                return RedirectToAction("Login", "Home");
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
            us.Password = "123456";
            var data = AdminService.CreateUser(us, 4);
            return Json(new { success = true });

        }
        [HttpPost]
        public ActionResult EditUsers(UserInfoDTO us)
        {

            var user = (Users)Session["User"];
            us.CreateBy = user.Username;
            us.CreateDate = DateTime.Now;
            us.UpdateBy = user.Username;
            us.LastUpdateDate = DateTime.Now;
            us.ManageBy = user.Username;
            us.Status = 1;
            us.Password = "123456";
            var data = AdminService.EditUser(us);
            return Json(new { success = true });

        }

        [HttpGet]
        public ActionResult LockUsers(int id)
  
        {
            var data = AdminService.UpdateStatusUser(id, -1);
            return Json("đã khóa", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult UnlockUsers(int id)
        {
            var data = AdminService.UpdateStatusUser(id, 1);
            return Json("đã mở khóa", JsonRequestBehavior.AllowGet);
        }
        public ActionResult Device()
        {
            if (Session["User"] == null)
            {
                return RedirectToAction("Login", "Home");
            }
            return View("ThietBi");
        }

        public ActionResult GetListDeviceByUserID()
        {
            var user = (Users)Session["User"];
            
            var data = AdminService.GetListDeviceByUserID(user.UserID);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Driver()
        {
            if (Session["User"] == null)
            {
                return RedirectToAction("Login", "Home");
            }
            return View("LaiTau");
        }
        public ActionResult GetListDriverByUserID()
        {
            var user = (Users)Session["User"];

            var data = UsersService.GetListDriverByUserID(user.Username);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

    }
}