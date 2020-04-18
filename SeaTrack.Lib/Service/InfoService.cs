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

        public static InfoDTO GetInfoDelay()
        {
            using (SqlDataReader reader = SqlHelper.ExecuteReader(ConnectData.ConnectionString, "sp_GetInfoDelay"))
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
    }
}

