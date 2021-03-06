﻿using System;
using SeaTrack.Lib.DTO;
using System.Data;
using Microsoft.ApplicationBlocks.Data;
using System.Web.Configuration;
using DotNetNuke.Common.Utilities;
using System.Configuration;

namespace SeaTrack.Lib.Database
{
    public class ConnectData
    {
        public static string ConnectionString = WebConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        public static string SecretCode = ConfigurationManager.AppSettings["SecretCode"].ToString();
        public static int TimeDelay = Int32.Parse(ConfigurationManager.AppSettings["TimeDelay"]);
        public static string URLBaoCaoDinhKy = ConfigurationManager.AppSettings["URLBaoCaoDinhKy"];
        public static string URLSOS = ConfigurationManager.AppSettings["URLSOS"];
        public static string SOSResource = ConfigurationManager.AppSettings["SOSResource"];
        public static int StartSOS = Convert.ToInt16(ConfigurationManager.AppSettings["StartSOS"]);
        public static int StartInfo = Convert.ToInt16(ConfigurationManager.AppSettings["StartInfo"]);
        public static int StartExpiredCheck = Convert.ToInt16(ConfigurationManager.AppSettings["StartExpiredCheck"]);


        public static TrackData GetDataByDeviceID(int deviceID)
        {
            return CBO.FillObject<TrackData>(GetData(deviceID));
            
        }
        public static IDataReader GetData(int deviceid)
        {
            return SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetDataByDeviceID", deviceid);
        }
        public static IDataReader GetUsers(String name)
        {
            return SqlHelper.ExecuteReader(ConnectionString, "sp_GetUser", name);
        }

        public static int DeleteDevice(int id)
        {
            return SqlHelper.ExecuteNonQuery(ConnectionString, "sp_DeleteDeviceByID", id);
        }
        
    }
}
