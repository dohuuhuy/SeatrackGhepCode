using System;
using SeaTrack.Lib.DTO;
using System.Data;
using Microsoft.ApplicationBlocks.Data;
using System.Web.Configuration;
using DotNetNuke.Common.Utilities;


namespace SeaTrack.Lib.Database
{
    public class ConnectData
    {
        public static string ConnectionString = WebConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        public static string SecretCode = WebConfigurationManager.ConnectionStrings["SecretCode"].ConnectionString;
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
