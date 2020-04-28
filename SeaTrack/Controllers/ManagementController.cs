using DotNetNuke.Entities.Users;
using SeaTrack.Lib.DTO;
using SeaTrack.Lib.DTO.Admin;
using SeaTrack.Lib.Service;
using SeaTrack.Models;
using System;
using System.Web.Mvc;

namespace SeaTrack.Controllers
{
    public class ManagementController : Controller
    {
        // GET: Management

        public ActionResult CheckUsername(Users user)
        {
            var res = AdminService.CheckUserExist(user.Username);
            if (res == null)
            {
                res = "OK";
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult CheckCMND(Driver driver)
        {
            var res = AdminService.CheckCMND(driver.CMND);
            if (res == null)
            {
                res = "OK";
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Account()
        {
            if (CheckRole(3) != 1)
            {
                if (CheckRole(3) == 0)
                {
                    return RedirectToAction("Login", "Home", new { area = "" });
                }
                return RedirectToAction("ErrorView", "Home", new { area = "" });
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
            return Json("Đã khóa", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult UnlockUsers(int id)
        {
            var data = AdminService.UpdateStatusUser(id, 1);
            return Json("Đã mở khóa", JsonRequestBehavior.AllowGet);
        }
        public ActionResult Device()
        {

            if (CheckRole(3) != 1)
            {
                if (CheckRole(3) == 0)
                {
                    return RedirectToAction("Login", "Home", new { area = "" });
                }
                return RedirectToAction("ErrorView", "Home", new { area = "" });
            }

            return View("ThietBi");
        }

        public ActionResult GetListDeviceOfCustomer(int id)
        {
            var user = (Users)Session["User"];
            var data = AdminService.GetListDeviceOfCustomer(user.Username, id );
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetListDeviceOfCustomerWithDriver()
        {
            var user = (Users)Session["User"];
            var data = AdminService.GetListDeviceOfCustomerWithDriver(user.Username);
            return Json(data, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult RemoveDeviceFromUser(User_Device ud)
        {
            var rs = AdminService.RemoveDeviceFromUser(ud.UserID, ud.DeviceID);
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult AddDeviceToUser(User_Device ud)
        {
            var rs = AdminService.AddDeviceToUser(ud.UserID, ud.DeviceID, "Admin");
            return Json(new { success = true });
        }
        [HttpPost]
        public ActionResult RemoveDeviceFromUserWithDriver(User_Device ud)
        {
            var rs = AdminService.RemoveDeviceFromUserWithDriver(ud.UserID, ud.DeviceID);
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult AddDeviceToUserWithDriver(User_Device ud)
        {
            var rs = AdminService.AddDeviceToUserWithDriver(ud.UserID, ud.DeviceID, "Admin");
            return Json(new { success = true });
        }

    
        public ActionResult GetListDeviceByUserID(int? id)
        {
            if (id == null)
            {
                var user = (Users)Session["User"];
                var data = AdminService.GetListDeviceByUserID(user.UserID);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var data = AdminService.GetListDeviceByUserID((int)id);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetListDeviceByDriverID(int? id)
        {
            if (id == null)
            {
                var user = (Users)Session["User"];
                var data = AdminService.GetListDeviceByDriverID(user.UserID);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var data = AdminService.GetListDeviceByDriverID((int)id);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult CheckDeviceExist(Device device)
        {
            Device d = new Device();
            if (device.DeviceNo != null)
            {
                var res = AdminService.CheckDeviceExist(device.DeviceNo, device.DeviceImei);
                d.DeviceNo = "OK";
                d.DeviceNo = res;
                return Json(d, JsonRequestBehavior.AllowGet);
            }
            if (device.DeviceImei != null)
            {
                var res = AdminService.CheckDeviceExist(device.DeviceNo, device.DeviceImei);
                d.DeviceNo = "OK";
                d.DeviceImei = res;
                return Json(d, JsonRequestBehavior.AllowGet);
            }
            d.DeviceNo = "OK";
            d.DeviceImei = "OK";
            return Json(d, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Driver()
        {

            if (CheckRole(3) != 1)
            {
                if (CheckRole(3) == 0)
                {
                    return RedirectToAction("Login", "Home", new { area = "" });
                }
                return RedirectToAction("ErrorView", "Home", new { area = "" });
            }
            return View("LaiTau");
        }
        public ActionResult GetListDriverByUserID()
        {
            var user = (Users)Session["User"];

            var data = UsersService.GetListDriverByUserID(user.Username);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult CreateDriver(Driver dr)
        {

            var user = (Users)Session["User"];
            dr.ManageBy = user.Username;
            var data = AdminService.CreateDriver(dr);
            return Json(new { success = true });

        }
        [HttpPost]
        public ActionResult EditDriver(Driver dr)
        {

            var user = (Users)Session["User"];

            dr.ManageBy = user.Username;

            var data = AdminService.EditDriver(dr);
            return Json(new { success = true });

        }

        [HttpGet]
        public ActionResult LockDriver(int id)

        {
            var data = AdminService.UpdateStatusDriver(id, -1);
            return Json("Đã khóa", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult UnlockDriver(int id)
        {
            var data = AdminService.UpdateStatusDriver(id, 1);
            return Json("Đã mở khóa", JsonRequestBehavior.AllowGet);
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