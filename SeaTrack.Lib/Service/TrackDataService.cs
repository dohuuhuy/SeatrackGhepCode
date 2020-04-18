using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.ApplicationBlocks.Data;
using SeaTrack.Lib.Database;
using SeaTrack.Lib.DTO;

namespace SeaTrack.Lib.Service
{
    public class TrackDataService
    {
        public static int AddTrackData(TrackData data)
        {
            var dateTime = DateTime.Now;
            var epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            var unixDateTime = (dateTime.ToUniversalTime() - epoch).TotalSeconds;
            return SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_AddTrackData",
                data.DeviceNo, data.Latitude, data.Longitude,
                data.DirectionSN, data.DirectionEW, data.Speed, data.TransmitTime, unixDateTime);
        }
        public static List<DeviceStatus> GetListDeviceStatus(int _userid)
        {
            List<DeviceStatus> lst = new List<DeviceStatus>();
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetListDeviceStatusUser", _userid))
            {
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        var dt = new DeviceStatus();
                        //if (reader["DeviceID"] == null
                        //    || reader["DeviceName"] == null
                        //    || reader["DeviceGroup"] == null) continue;
                        //else if (reader["Latitude"] == null
                        //    || reader["Longitude"] == null
                        //    || reader["DirectionSN"] == null
                        //    || reader["DirectionEW"] == null
                        //    || reader["TransmitTime"] == null
                        //    || reader["Speed"] == null) { }



                        if (reader["DeviceID"] != null) dt.DeviceID = Convert.ToInt32(reader["DeviceID"]);
                        if (reader["DeviceName"] != null) dt.DeviceName = reader["DeviceName"].ToString();
                        if (reader["Latitude"] != null) dt.Latitude = Convert.ToInt32(reader["Latitude"]);
                        if (reader["Longitude"] != null) dt.Longitude = Convert.ToInt32(reader["Longitude"]);
                        if (reader["DirectionSN"] != null) dt.DirectionSN = reader["DirectionSN"].ToString();
                        if (reader["DirectionEW"] != null) dt.DirectionEW = reader["DirectionEW"].ToString();
                        if (reader["TransmitTime"] != null) dt.TransmitTime = Convert.ToDateTime(reader["TransmitTime"]);
                        if (reader["Speed"] != null) dt.Speed = Convert.ToInt16(reader["Speed"]);

                        //var data = new DeviceStatus()
                        //{
                        //    DeviceID = Convert.ToInt32(reader["DeviceID"]),
                        //    DeviceName = reader["DeviceName"].ToString(),
                        //    TypeShip = Convert.ToInt32(reader["DeviceGroup"]),
                        //    Latitude = Convert.ToDecimal(reader["Latitude"]),
                        //    Longitude = Convert.ToDecimal(reader["Longitude"]),
                        //    DirectionSN = reader["DirectionSN"].ToString(),
                        //    DirectionEW = reader["DirectionEW"].ToString(),
                        //    TransmitTime = Convert.ToDateTime(reader["TransmitTime"]),
                        //    Speed = Convert.ToInt16(reader["Speed"]),

                        //};
                        lst.Add(dt);
                    }
                }
            }

            return lst;
        }
        public static TrackData GetLastedLocation(int DeviceID)
        {
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetLastedLocation",
                DeviceID))
            {
                while (reader.Read())
                {
                    var data = new TrackData()
                    {
                        Latitude = Convert.ToDecimal(reader["Latitude"]),
                        Longitude = Convert.ToDecimal(reader["Longitude"]),
                        Speed = Convert.ToInt16(reader["Speed"]),
                        State = reader["State"].ToString(),
                    };
                    return data;
                }
            }
            return null;
        }

        public static TrackData GetLastedLocationByImei(string DeviceImei)
        {
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetLastedLocationByImei",
                DeviceImei))
            {
                while (reader.Read())
                {
                    var data = new TrackData()
                    {
                        TransmitTime = Convert.ToDateTime(reader["TransmitTime"]),
                        DirectionEW = reader["DirectionEW"].ToString(),
                        DirectionSN = reader["DirectionSN"].ToString(),
                        Latitude = Convert.ToDecimal(reader["Latitude"]),
                        Longitude = Convert.ToDecimal(reader["Longitude"]),
                        Speed = Convert.ToInt16(reader["Speed"]),
                        State = reader["State"].ToString(),
                    };
                    return data;
                }
            }
            return null;
        }

        public static List<TrackData> GetRoadmap(int deviceID)
        {
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetRoadmap",
                deviceID))
            {
                List<TrackData> lst = null;
                if (reader.HasRows)
                {
                    lst = new List<TrackData>();
                    while (reader.Read())
                    {
                        var data = new TrackData()
                        {
                            Latitude = Convert.ToDecimal(reader["Latitude"]),
                            Longitude = Convert.ToDecimal(reader["Longitude"])
                        };
                        lst.Add(data);
                    }
                }
                return lst;
            }
        }
        public static List<TrackData> GetRoadmapByDateTime(int deviceID, DateTime from, DateTime to)
        {
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetRoadmapByDateTime",
                deviceID, from, to))
            {
                List<TrackData> lst = null;
                if (reader.HasRows)
                {
                    lst = new List<TrackData>();
                    while (reader.Read())
                    {
                        var data = new TrackData()
                        {
                            DeviceID = deviceID,
                            DirectionSN = Convert.ToString(reader["DirectionSN"]),
                            DirectionEW = Convert.ToString(reader["DirectionEW"]),
                            Latitude = Convert.ToDecimal(reader["Latitude"]),
                            Longitude = Convert.ToDecimal(reader["Longitude"]),
                            TransmitTime = Convert.ToDateTime(reader["TransmitTime"]),
                            Speed = Convert.ToInt16(reader["Speed"])

                        };
                        lst.Add(data);
                    }
                }
                return lst;
            }
        }
        public static List<TrackDataAndDriver> GetRoadmapByDateTimeAndDriver(int deviceID, DateTime from, DateTime to)
        {
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetRoadmapByDateTimeAndDriver",
                deviceID, from, to))
            {
                List<TrackDataAndDriver> lst = null;
                if (reader.HasRows)
                {
                    lst = new List<TrackDataAndDriver>();
                    while (reader.Read())
                    {
                        var data = new TrackDataAndDriver()
                        {
                            DeviceID = deviceID,
                            DirectionSN = Convert.ToString(reader["DirectionSN"]),
                            DirectionEW = Convert.ToString(reader["DirectionEW"]),
                            Latitude = Convert.ToDecimal(reader["Latitude"]),
                            Longitude = Convert.ToDecimal(reader["Longitude"]),
                            TransmitTime = Convert.ToDateTime(reader["TransmitTime"]),
                            Speed = Convert.ToInt16(reader["Speed"]),

                            DriverName = reader["DriverName"].ToString(),
                        };
                        lst.Add(data);
                    }
                }
                return lst;
            }
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
                            DeviceID = Convert.ToInt32(reader["DeviceID"]),
                            DeviceName = reader["DeviceName"].ToString(),
                        };
                        lst.Add(data);
                    }
                }
            }
            return lst;
        }
        public static int AddMessage(string id, string Message)
        {
            return SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_AddMessage", id, Message);
        }

        public static int AddConfigTime(string id, string OpCode, int Time)
        {
            return SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_ConfigTime",
                id, OpCode, Time);
        }
    }
}
