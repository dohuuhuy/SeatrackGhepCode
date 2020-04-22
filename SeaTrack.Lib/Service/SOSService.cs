using Microsoft.ApplicationBlocks.Data;
using SeaTrack.Lib.Database;
using SeaTrack.Lib.DTO;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeaTrack.Lib.Service
{
    public class SOSService
    {
        public static int UpdateStatusSOSbyID(int id, int status )
        {
            return SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_UpdateSOSStatus",id, status);
        }
        public static List<SOSDTO> GetSOSPending()
        {
            List<SOSDTO> lst = null;
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetSOSPending"))
            {
                if (reader.HasRows)
                {
                    lst = new List<SOSDTO>();

                    while (reader.Read())
                    {
                        var data = new SOSDTO()
                        {
                            Status = Convert.ToInt32(reader["Status"]),
                            SOSID = Convert.ToInt32(reader["SOSID"]),
                            DeviceID = Convert.ToInt32(reader["DeviceID"]),
                            DeviceName = reader["DeviceName"].ToString(),
                            DeviceImei = reader["DeviceID"].ToString(),
                            Latitude = Convert.ToDecimal(reader["Latitude"]),
                            Longitude = Convert.ToDecimal(reader["Longitude"]),
                            DirectionSN = reader["DirectionSN"].ToString(),
                            DirectionEW = reader["DirectionEW"].ToString(),
                            DateRequest = Convert.ToDateTime(reader["DateRequest"]),
                            GMT = reader["GMT"].ToString(),
                        };
                        lst.Add(data);
                    }
                }
            }
            return lst;
        }

        public static List<SOSDTO> GetSOSPendingByUserID(int UserID)
        {
            List<SOSDTO> lst = null;
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetSOSPendingByUserID", UserID))
            {
                if (reader.HasRows)
                {
                    lst = new List<SOSDTO>();

                    while (reader.Read())
                    {
                        var data = new SOSDTO()
                        {
                            Status = Convert.ToInt32(reader["Status"]),
                            SOSID = Convert.ToInt32(reader["SOSID"]),
                            DeviceID = Convert.ToInt32(reader["DeviceID"]),
                            DeviceName = reader["DeviceName"].ToString(),
                            Latitude = Convert.ToDecimal(reader["Latitude"]),
                            Longitude = Convert.ToDecimal(reader["Longitude"]),
                            DirectionSN = reader["DirectionSN"].ToString(),
                            DirectionEW = reader["DirectionEW"].ToString(),
                            DateRequest = Convert.ToDateTime(reader["DateRequest"]),
                            GMT = reader["GMT"].ToString(),
                        };
                        lst.Add(data);
                    }
                }
            }
            return lst;
        }

    }
}
