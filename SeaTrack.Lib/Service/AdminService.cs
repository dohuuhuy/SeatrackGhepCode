using System;
using System.Collections.Generic;
using Microsoft.ApplicationBlocks.Data;
using SeaTrack.Lib.Database;
using SeaTrack.Lib.DTO;
using SeaTrack.Lib.DTO.Admin;
using System.Globalization;
using System.Data.SqlClient;

namespace SeaTrack.Lib.Service
{
    public class AdminService
    {
        public static int SaveFeedBack(FeedBack fb)
        {
            return SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_SaveFeedBack",
                fb.Name.Trim(),
                fb.Email.Trim(),
                fb.Title.Trim(),
                fb.Comment.Trim(),
                fb.Quality
                );
        }
        public static int CreateDriver(Driver dr)
        {
            return SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_CreateDriver",
                 dr.DriverName.Trim(),
                 dr.Phone,
                 dr.Address.Trim(),
                 dr.GPLT.Trim(),
                 dr.CMND,
                 dr.Rank,
                 dr.IssuedBy,
                 dr.Note,
                 dr.ManageBy,
                 dr.CreateDateGPLT,
                 dr.ExpriseDateGPLT
                );
        }
        public static bool EditDriver(Driver dr)
        {
            try
            {
                int res = SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_EditDriver",
                 dr.DriverID,
                 dr.DriverName.Trim(),
                 dr.Phone,
                 dr.Address.Trim(),
                 dr.GPLT.Trim(),
                 dr.CMND,
                 dr.Rank,
                 dr.IssuedBy,
                 dr.Note,
                 dr.ManageBy,
                 dr.CreateDateGPLT,
                 dr.ExpriseDateGPLT
                 );
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public static bool UpdateStatusDriver(int driverID, int Status)
        {
            try
            {
                int res = SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_UpdateDriver", driverID, Status);
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
            catch (Exception)
            {
                return false;
                throw;
            }
        }
        public static int CreateUser(UserInfoDTO user, int RoleID)
        {
            return SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_CreateUser",
                 user.Username.Trim(), user.Password, user.Fullname.Trim(), user.Phone,
                 user.Address.Trim(), user.CreateBy, user.CreateDate, user.UpdateBy, RoleID, user.ManageBy, user.Status, user.LastUpdateDate);
        }
        public static List<UserViewModel> GetListUser(int RoleID)
        {
            List<UserViewModel> lst = null;
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetListUser", RoleID))
            {
                if (reader.HasRows)
                {
                    lst = new List<UserViewModel>();

                    while (reader.Read())
                    {
                        var data = new UserViewModel()
                        {
                            UserID = Convert.ToInt32(reader["UserID"]),
                            Username = reader["Username"].ToString(),
                            Password = reader["Password"].ToString(),
                            Fullname = reader["Fullname"].ToString(),
                            Phone = reader["Phone"].ToString(),
                            Status = Convert.ToInt32(reader["Status"]),
                            CreateDate = Convert.ToDateTime(reader["CreateDate"]).ToString("dd/MM/yyyy"),
                            ManageBy = reader["ManageBy"].ToString()
                        };
                        lst.Add(data);
                    }
                    return lst;
                }
            }
            return null;
        }
        public static UserViewModel GetUserByID(int UserID)
        {
            UserViewModel user = null;
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetUserByID", UserID))
            {
                if (reader.HasRows)
                {
                    user = new UserViewModel();
                    while (reader.Read())
                    {
                        var data = new UserViewModel()
                        {
                            UserID = Convert.ToInt16(reader["UserID"]),
                            Username = reader["Username"].ToString(),
                            Password = reader["Password"].ToString(),
                            Fullname = reader["FullName"].ToString(),
                            Phone = reader["Phone"].ToString(),
                            Address = reader["Address"].ToString(),
                            Status = Convert.ToInt16(reader["Status"]),
                            CreateBy = reader["CreateBy"].ToString(),
                            CreateDate = Convert.ToDateTime(reader["CreateDate"]).ToString("dd/MM/yyyy"),
                            UpdateBy = reader["UpdateBy"].ToString(),
                            LastUpdateDate = Convert.ToDateTime(reader["LastUpdateDate"]).ToString("dd/MM/yyyy"),
                            RoleID = Convert.ToInt16(reader["RoleID"]),
                            ManageBy = reader["ManageBy"].ToString(),
                            Image = reader["Image"].ToString()
                        };
                        user = data;
                    }
                    return user;

                }
            }
            return null;
        } //Lấy đối tượng user theo UserID

        public static List<UserViewModel> GetListUserByUserID(string Username, int RoleID) //Lấy danh sách user được quản lý bởi Username
        {
            List<UserViewModel> lst = null;
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetListUserByUserID", Username, RoleID))
            {
                if (reader.HasRows)
                {
                    lst = new List<UserViewModel>();

                    while (reader.Read())
                    {
                        var data = new UserViewModel()
                        {
                            UserID = Convert.ToInt32(reader["UserID"]),
                            Username = reader["Username"].ToString(),
                            Password = reader["Password"].ToString(),
                            Fullname = reader["Fullname"].ToString(),
                            Phone = reader["Phone"].ToString(),
                            Status = Convert.ToInt32(reader["Status"]),
                            CreateDate = Convert.ToDateTime(reader["CreateDate"]).ToString("dd/MM/yyyy"),
                            ManageBy = reader["ManageBy"].ToString()
                        };
                        lst.Add(data);
                    }
                    return lst;
                }
            }
            return null;
        }
        public static List<UserViewModel> GetListUserOfAgency(string Username)
        {
            List<UserViewModel> lst = null;
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetListUserOfAgency", Username))
            {
                if (reader.HasRows)
                {
                    lst = new List<UserViewModel>();

                    while (reader.Read())
                    {
                        var data = new UserViewModel()
                        {
                            UserID = Convert.ToInt32(reader["UserID"]),
                            Username = reader["Username"].ToString(),
                            Password = reader["Password"].ToString(),
                            Fullname = reader["Fullname"].ToString(),
                            Phone = reader["Phone"].ToString(),
                            Status = Convert.ToInt32(reader["Status"]),
                            CreateDate = Convert.ToDateTime(reader["CreateDate"]).ToString("dd/MM/yyyy"),
                            ManageBy = reader["ManageBy"].ToString()
                        };
                        lst.Add(data);
                    }
                    return lst;
                }
            }
            return null;
        }
        public static bool EditUser(UserInfoDTO user)
        {
            try
            {
                int res = SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_EditUser", user.UserID, user.Username, user.Password, user.Fullname.Trim(), user.Phone, user.Address.Trim(), user.Status, user.UpdateBy, user.LastUpdateDate, user.RoleID);
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public static bool UpdateStatusUser(int UserID, int Status)
        {
            try
            {
                int res = SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_UpdateUser", UserID, Status);
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
            catch (Exception)
            {
                return false;
                throw;
            }
        }
        public static bool DeleteUser(int UserID)
        {
            try
            {
                int res = SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_DeleteUser", UserID);
                if (res != 0)
                {
                    return true;
                }
                return false;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public static bool CheckUserManage(int UserID, string Username)
        {
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_CheckUserManage", UserID, Username))
            {
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        if (Convert.ToInt16(reader["result"]) == 1)
                        {
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        public static string CheckUserExist(string Username)
        {

            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_CheckUserExist", Username))
            {
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        return reader["Username"].ToString();
                    }
                }
            }
            return null;
        }
        public static string CheckCMND(string cmnd)
        {

            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_CheckCMND", cmnd))
            {
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        return reader["CMND"].ToString();
                    }
                }
            }
            return null;
        }

        public static bool UpdateAvatar(int UserID, string Image)
        {
            int res = SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "UpdateAvatar", UserID, Image);
            if (res == 0)
            {
                return false;
            }
            return true;
        }
        #region
        public static int CreateDevice(Device device)
        {
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "[sp_CreateDevice]", device.DeviceNo, device.DeviceName, device.DeviceVersion,
                device.DeviceImei, device.DateExpired, device.DeviceNote, device.StatusDevice, device.CreateBy, device.DateCreate, device.TypeShip))
            {
                if (reader.HasRows)
                {
                    int ID = 0;
                    while (reader.Read())
                    {
                        ID = Convert.ToInt32(reader["DeviceID"]);
                    }
                    return ID;

                }
            }
            return 0;
        }

        public static int UpdateDevice(Device device)
        {
            return SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_UpdateDevice", device.DeviceID, device.DeviceNo, device.DeviceName,
                device.DeviceVersion, device.DeviceImei, device.TypeShip, device.DateExpired, device.DeviceNote);
        }

        public static List<Device> GetListDevice()
        {
            List<Device> lst = null;
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetListDevice"))
            {
                if (reader.HasRows)
                {
                    lst = new List<Device>();

                    while (reader.Read())
                    {
                        var data = new Device()
                        {
                            TypeShip = Convert.ToInt32(reader["TypeShip"]),
                            DeviceID = Convert.ToInt32(reader["DeviceID"]),
                            DeviceNo = reader["DeviceNo"].ToString(),
                            DeviceName = reader["DeviceName"].ToString(),
                            DeviceImei = reader["DeviceImei"].ToString(),
                            DeviceVersion = reader["DeviceVersion"].ToString(),
                            //DeviceGroup = Convert.ToInt32(reader["DeviceGroup"]),
                            DeviceNote = reader["DeviceNote"].ToString(),
                            DateExpired = Convert.ToDateTime(reader["DateExpired"]),
                            StatusDevice = Convert.ToInt32(reader["StatusDevice"]),
                            //ExpireStatus = DateTime.Compare(Convert.ToDateTime(reader["DateExpired"]), DateTime.Now) > 0 ? 1 : -1,
                            //ExpireDate = Convert.ToDateTime(reader["DateExpired"].ToString())



                        };
                        lst.Add(data);
                    }
                }
            }
            return lst;
        }//Lấy danh sách tất cả device

        public static Device GetDeviceByID(int deviceID)
        {
            Device device = null;
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetDeviceByID", deviceID))
            {
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        var data = new Device()
                        {
                            TypeShip = Convert.ToInt32(reader["TypeShip"]),
                            DeviceID = Convert.ToInt32(reader["DeviceID"]),
                            DeviceNo = reader["DeviceNo"].ToString(),
                            DeviceName = reader["DeviceName"].ToString(),
                            DeviceImei = reader["DeviceImei"].ToString(),
                            DeviceVersion = reader["DeviceVersion"].ToString(),
                            //DeviceGroup = Convert.ToInt32(reader["DeviceGroup"]),
                            DeviceNote = reader["DeviceNote"].ToString(),
                            DateExpired = Convert.ToDateTime(reader["DateExpired"]),
                            //ExpireDate = Convert.ToDateTime(reader["DateExpired"].ToString())

                        };
                        device = data;
                    }
                }
            }
            return device;
        }//Lấy device theo ID

        //Lấy danh sách device theo UserID
        public static List<Device> GetListDeviceByUserID(int UserID)
        {
            List<Device> lst = new List<Device>();
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetListDeviceByUserID", UserID))
            {
                if (reader.HasRows)
                {
                    //lst = new List<Device>();

                    while (reader.Read())
                    {
                        var data = new Device()
                        {
                            TypeShip = Convert.ToInt32(reader["TypeShip"]),
                            DeviceID = Convert.ToInt32(reader["DeviceID"]),
                            DeviceNo = reader["DeviceNo"].ToString(),
                            DeviceName = reader["DeviceName"].ToString(),
                            DeviceImei = reader["DeviceImei"].ToString(),
                            DeviceVersion = reader["DeviceVersion"].ToString(),
                            //DeviceGroup = Convert.ToInt32(reader["DeviceGroup"]),
                            DeviceNote = reader["DeviceNote"].ToString(),
                            DateExpired = Convert.ToDateTime(reader["DateExpired"]),
                            StatusDevice = Convert.ToInt32(reader["StatusDevice"]),
                            //ExpireDate = Convert.ToDateTime(reader["DateExpired"].ToString()),
                            //ExpireStatus = DateTime.Compare(Convert.ToDateTime(reader["DateExpired"]), DateTime.Now) > 0 ? 1 : -1,
                          
                        };
                        lst.Add(data);
                    }
                }
            }
            return lst;
        }
        public static List<Device> GetListDeviceByDriverID(int UserID)
        {
            List<Device> lst = new List<Device>();
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetListDeviceByDriverID", UserID))
            {
                if (reader.HasRows)
                {
                    //lst = new List<Device>();

                    while (reader.Read())
                    {
                        var data = new Device()
                        {
                            TypeShip = Convert.ToInt32(reader["TypeShip"]),
                            DeviceID = Convert.ToInt32(reader["DeviceID"]),
                            DeviceNo = reader["DeviceNo"].ToString(),
                            DeviceName = reader["DeviceName"].ToString(),
                            DeviceImei = reader["DeviceImei"].ToString(),
                            DeviceVersion = reader["DeviceVersion"].ToString(),
                            //DeviceGroup = Convert.ToInt32(reader["DeviceGroup"]),
                            DeviceNote = reader["DeviceNote"].ToString(),
                            DateExpired = Convert.ToDateTime(reader["DateExpired"]),
                            StatusDevice = Convert.ToInt32(reader["StatusDevice"]),
                            //ExpireDate = Convert.ToDateTime(reader["DateExpired"].ToString()),
                            //ExpireStatus = DateTime.Compare(Convert.ToDateTime(reader["DateExpired"]), DateTime.Now) > 0 ? 1 : -1
                        };
                        lst.Add(data);
                    }
                }
            }
            return lst;
        }
        //Username != null, Lấy danh sách thiết bị thuộc về Username nhưng chưa được gán cho người dùng khác
        //Username == null, lấy danh sách thiết bị chưa được gán cho bất kỳ người dùng
        public static List<Device> GetListDeviceNotUsedByUser(string Username)
        {
            List<Device> lst = null;
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetListDeviceNotUsedByUser", Username))
            {
                if (reader.HasRows)
                {
                    lst = new List<Device>();

                    while (reader.Read())
                    {
                        var data = new Device()
                        {
                            DeviceID = Convert.ToInt32(reader["DeviceID"]),
                            DeviceNo = reader["DeviceNo"].ToString(),
                            DeviceName = reader["DeviceName"].ToString(),
                            DateExpired = Convert.ToDateTime(reader["DateExpired"]),
                        };
                        lst.Add(data);
                    }
                }
            }
            return lst;
        }

        public static List<Device> GetListDeviceBelongToAgencyNotUsedByUser(int AgencyID, string Username)
        {
            List<Device> lst = null;
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetListDeviceBelongToAgencyNotUsedByUser", AgencyID, Username))
            {
                if (reader.HasRows)
                {
                    lst = new List<Device>();
                    while (reader.Read())
                    {
                        var data = new Device()
                        {
                            DeviceID = Convert.ToInt32(reader["DeviceID"]),
                            DeviceNo = reader["DeviceNo"].ToString(),
                            DeviceName = reader["DeviceName"].ToString(),
                            DateExpired = Convert.ToDateTime(reader["DateExpired"]),
                        };
                        lst.Add(data);
                    }
                    return lst;

                }
            }
            return null;
        }

        public static List<Device> GetListDeviceOfCustomer(string Username, int UserID)
        {
            List<Device> lst = null;
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetListDeviceOfCustomer", Username, UserID))
            {
                if (reader.HasRows)
                {
                    lst = new List<Device>();
                    while (reader.Read())
                    {
                        var data = new Device()
                        {
                            DeviceID = Convert.ToInt32(reader["DeviceID"]),
                            DeviceNo = reader["DeviceNo"].ToString(),
                            DeviceName = reader["DeviceName"].ToString(),
                            DateExpired = Convert.ToDateTime(reader["DateExpired"]),
                        };
                        lst.Add(data);
                    }
                    return lst;

                }
            }
            return null;

        }
        public static List<Device> GetListDeviceOfCustomerWithDriver(string Username)
        {
            List<Device> lst = null;
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetListDeviceOfCustomerWithDriver", Username))
            {
                if (reader.HasRows)
                {
                    lst = new List<Device>();
                    while (reader.Read())
                    {
                        var data = new Device()
                        {
                            DeviceID = Convert.ToInt32(reader["DeviceID"]),
                            DeviceNo = reader["DeviceNo"].ToString(),
                            DeviceName = reader["DeviceName"].ToString(),
                            DateExpired = Convert.ToDateTime(reader["DateExpired"]),
                        };
                        lst.Add(data);
                    }
                    return lst;

                }
            }
            return null;

        }
        public static int RemoveDeviceFromUser(int UserID, int DeviceID)
        {
            return SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_RemoveDeviceFromUser", UserID, DeviceID);
        }

        public static int AddDeviceToUser(int UserID, int DeviceID, string CreateBy)
        {
            return SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_AddDeviceToUser", UserID, DeviceID, CreateBy);
        }
        public static int RemoveDeviceFromUserWithDriver(int UserID, int DeviceID)
        {
            return SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_RemoveDeviceFromUserWithDriver", UserID, DeviceID);
        }

        public static int AddDeviceToUserWithDriver(int UserID, int DeviceID, string CreateBy)
        {
            return SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_AddDeviceToUserWithDriver", UserID, DeviceID, CreateBy);
        }

        public static bool DeleteDevice(int DeviceID)
        {
            try
            {
                int res = SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_DeleteDevice", DeviceID);
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static bool UnlockDevice(int DeviceID)
        {
            try
            {
                int res = SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_UnlockDevice", DeviceID);
                if (res == 0)
                {
                    return false;
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }

        }

        public static string CheckDeviceExist(string DeviceNo, string DeviceImei)
        {
            string No = null;
            string Imei = null;
            SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_CheckDeviceExist", DeviceNo, DeviceImei);
            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    if (DeviceNo != null)
                        No = reader["DeviceNo"].ToString();
                    else
                        Imei = reader["DeviceImei"].ToString();
                }
                if (No == null)
                    return Imei;
                return No;
            }
            return null;
        }

        public static bool CheckUserDevice(int UserID, int DeviceID)
        {
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_CheckUserDevice", UserID, DeviceID))
            {
                if (reader.HasRows)
                {
                    return true;
                }
            }
            return false;
        }

        public static int CheckExpired()
        {
            return SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_CheckExpired");
        }
        #endregion
    }
}
