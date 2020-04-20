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
    public class InfoService
    {
        public static int AddInfoDelay(InfoDTO info)
        {
            return SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_AddInfoDelay",info.MREF,info.ID,info.Seqno,info.SecretCode,info.OpCode,info.Time);
        }

        public static InfoDTO GetInfoDelay(string ID)
        {
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetInfoDelay",ID))
            {
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        InfoDTO res = new InfoDTO();
                        res.MREF = reader["MREF"].ToString();
                        res.ID = reader["ID"].ToString();
                        res.Seqno = reader["Seqno"].ToString();
                        res.SecretCode = reader["SecretCode"].ToString();
                        res.Time = Convert.ToInt32(reader["Time"]);
                        return res;
                    }
                }
                return null;
            }
        }

        public static List<InfoDTO> GetAllDelayInfo()
        {
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString,"sp_GetAllDelayInfo"))
            {
                List<InfoDTO> data = new List<InfoDTO>();
                if(reader.HasRows){
                    while (reader.Read())
                    {
                        InfoDTO dt = new InfoDTO();
                        dt.ID = reader["DeviceImei"].ToString();
                        dt.Time = Convert.ToInt32(reader["Time"]);
                        dt.LastSend = Convert.ToDateTime(reader["LastSend"]);
                        data.Add(dt);
                    }
                    return data;
                }
                return null;
            }
        }

        public static int UpdateLastSend(string DeviceImei, DateTime now)
        {
            return SqlHelper.ExecuteNonQuery(ConnectData.ConnectionString, "sp_UpdateLastSend", DeviceImei, now);
        }

        public static List<RequestInfo> GetDataByDelayTime(string DeviceImei,string MREF, string Seqno)
        {
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetDataByDelayTime", DeviceImei))
            {
                if(reader.HasRows)
                {
                    List<RequestInfo> data = new List<RequestInfo>();
                    while(reader.Read())
                    {
                        RequestInfo dt = new RequestInfo();
                        dt.MREF = MREF;
                        dt.Seqno = Seqno;
                        dt.ID = DeviceImei;
                        dt.Time = Convert.ToDateTime(reader["TransmitTime"]).ToString("HHmmss");
                        dt.State = "A";
                        dt.Latitude = Convert.ToDecimal(reader["Latitude"]);
                        dt.ExpSN = reader["DirectionSN"].ToString();
                        dt.Longitude = Convert.ToDecimal(reader["Longitude"]);
                        dt.ExpEW = reader["DirectionEW"].ToString();
                        dt.DIR = "";
                        dt.Date = Convert.ToDateTime(reader["TransmitTime"]).ToString("ddMMyyyy");
                        data.Add(dt);
                    }
                    return data;
                }
                return null;
            }
        }
    }
}

