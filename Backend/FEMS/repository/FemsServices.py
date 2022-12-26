import os
import json
import pymysql
from FEMS.Logger import Logger

_logger = Logger("FemsService")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SECRET_FILE = os.path.join(BASE_DIR, 'secrets.json')
secrets = json.loads(open(SECRET_FILE).read())

DB = secrets['DB']
USER = DB['user']
PASSWORD = DB['password']
HOST = DB['host']
PORT = DB['port']
DATABASE = DB['database']

#################################################################################################################################################

#                                                       메인 페이지

#################################################################################################################################################

# 설비 정보(공조기 이름, 위치, 사용하는 곳 표시)
async def Get_AHU_Info():
    try:       
        # DB서버      
        connection = pymysql.connect(host= DB['host'], port= 3306, user= DB['user'], password= DB['password'],
                                     db= DB['database'], charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
        
        with connection.cursor() as cursor:
            query = " select FAC_ID, FAC_NAME, FAC_LOC, FAC_USE, " + \
                " cast(FAC_VOLTAGE as char) as FAC_VOLTAGE, cast(FAC_KW as char) as FAC_KW, " +\
                " cast(FAC_INV_CNT as char) as FAC_INV_CNT " +\
                " from info_facility; "
            cursor.execute(query)
            rv = cursor.fetchall()
            json_data = json.dumps(rv, indent=4)
            _logger.Info(f"succeed to do 'Get_AHU_Info")
            return json_data

    except Exception as ex:
        _logger.Info(f"error to do 'Get_AHU_Info")
        
# 전년도 대비 전력량 추출
async def Get_LpData_monthly_Daily_Data():
    try:
              
        # DB서버        
        connection = pymysql.connect(host= DB['host'], port= 3306, user= DB['user'], password= DB['password'],
                                     db= DB['database'], charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
        
        with connection.cursor() as cursor:
            query = " select runDate," + \
                    " sumData " +\
                    " from month_lpdata \n " +\
                    " group by runDate" +\
                    " order by runDate;"
            cursor.execute(query)
            rv = cursor.fetchall()
            json_data = json.dumps(rv, indent=4)
            _logger.Info(
                f"succeed to do 'Get_LpData_monthly_Daily_Data")
            return json_data

    except Exception as ex:
        _logger.Info(f"error to do 'Get_LpData_monthly_Daily_Data")




#############################################################################################################################################

#                                                          전력량 페이지(시간별, 일별, 월별) 

#############################################################################################################################################


# 공조기 시간별 전력량
async def Get_AHU_KWh_Hourly_Data(runDate :str):
    try:   
           
        # DB서버        
        connection = pymysql.connect(host= DB['host'], port= 3306, user= DB['user'], password= DB['password'],
                                     db= DB['database'], charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
        
        
        with connection.cursor() as cursor:
            query = " select " +\
                " left(LpDate,12) as rundate, " +\
                " cast(round(LpData, 2) as char) as LpData " +\
                " from raw_kepcodaylpdata \n" +\
                f" where left(LpDate, 8) = " + "'" + runDate + "'" +\
                " group by left(LpDate, 12) " + \
                " order by left(LpDate, 12);"
            cursor.execute(query)
            rv = cursor.fetchall()
            json_data = json.dumps(rv, indent=4)
            _logger.Info(
                f"succeed to do 'Get_AHU_KWh_Hourly_Data('{runDate}')'")
            return json_data

    except Exception as ex:
        _logger.Info(
            f"error to do 'Get_AHU_KWh_Hourly_Data('{runDate}')'")
        
# 공조기 일별 전력량
async def Get_AHU_KWh_Daily_Data(runDate: str):
    try:   
           
        # DB서버      
        connection = pymysql.connect(host= DB['host'], port= 3306, user= DB['user'], password= DB['password'],
                                     db= DB['database'], charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
        
        with connection.cursor() as cursor:
            query = " select " +\
                    " left(LpDate,8) as rundate, " +\
                    " cast(round(sum(distinct LpData), 2) as char) as LpData " +\
                    " from raw_kepcodaylpdata \n " +\
                    f" where left(LpDate,6) = " + "'" + runDate + "'" +\
                    " group by left(LpDate,8) " +\
                    " order by left(LpDate,8); "
                    
            cursor.execute(query)
            rv = cursor.fetchall()
            json_data = json.dumps(rv, indent=4)
            _logger.Info(
                f"succeed to do 'Get_AHU_KWh_Daily_Data('{runDate}')'")
            return json_data

    except Exception as ex:
        _logger.Info(
            f"error to do 'Get_AHU_KWh_Daily_Data('{runDate}')'")

# 공조기 월별 전력량
async def Get_AHU_KWh_monthly_Data(runDate: str):
    try:   
           
        # DB서버        
        connection = pymysql.connect(host= DB['host'], port= 3306, user= DB['user'], password= DB['password'],
                                     db= DB['database'], charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
        
        with connection.cursor() as cursor:
            query = " select " +\
                " left(LpDate,6) as rundate, " +\
                " cast(round(sum(distinct LpData), 2) as char) as LpData " +\
                " from raw_kepcodaylpdata \n" +\
                f" where left(LpDate, 4) = " + "'" + runDate + "'" +\
                " group by left(LpDate, 6) " + \
                " order by left(LpDate, 6); "
            cursor.execute(query)
            rv = cursor.fetchall()
            json_data = json.dumps(rv, indent=4)
            _logger.Info(
                f"succeed to do 'Get_AHU_KWh_monthly_Data('{runDate}')'")
            return json_data

    except Exception as ex:
        _logger.Info(
            f"error to do 'Get_AHU_KWh_monthly_Data('{runDate}')'")

#############################################################################################################################################

#                                                          온도 페이지(시간별, 일별, 월별) 

#############################################################################################################################################

# 공조기 시간별 온도
async def Get_AHU_temp_Hourly_Data(ahu_id: str, runDate: str):
    try:   
           
        # DB서버        
        connection = pymysql.connect(host= DB['host'], port= 3306, user= DB['user'], password= DB['password'],
                                     db= DB['database'], charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)      
        
        with connection.cursor() as cursor:
            query = " select " +\
                " ahu_id, left(run_datetime,12) as rundate," +\
                " cast(round(avg(ahu_set_temp),2) as char) as ahu_set_temp, " +\
                " cast(round(avg(ahu_ret_temp),2) as char) as ahu_ret_temp, " +\
                " cast(round(avg(ahu_sup_temp),2) as char) as ahu_sup_temp, " +\
                " cast(round(avg(ahu_out_temp),2) as char) as ahu_out_temp  " +\
                "from raw_wmahudata_temp_fix \n" +\
                f"where ahu_id = '{ahu_id}' and left(run_datetime, 8) = " + "'" + runDate + "'" +\
                "group by left(run_datetime, 12) " + \
                "order by left(run_datetime, 12);"
            cursor.execute(query)
            rv = cursor.fetchall()
            json_data = json.dumps(rv, indent=4)
            _logger.Info(
                f"succeed to do 'Get_AHU_temp_Hourly_Data('{ahu_id}','{runDate}')'")
            return json_data

    except Exception as ex:
        _logger.Info(
            f"error to do 'Get_AHU_temp_Hourly_Data('{ahu_id}','{runDate}')'")


# 공조기 일별 온도
async def Get_AHU_temp_Daily_Data(ahu_id: str, runDate: str):
    try:   
           
        # DB서버        
        connection = pymysql.connect(host= DB['host'], port= 3306, user= DB['user'], password= DB['password'],
                                     db= DB['database'], charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)      
        
        with connection.cursor() as cursor:
            query = " select " +\
                " ahu_id, left(run_datetime,8) as rundate," +\
                " cast(round(avg(ahu_set_temp),2) as char) as ahu_set_temp, " +\
                " cast(round(avg(ahu_ret_temp),2) as char) as ahu_ret_temp, " +\
                " cast(round(avg(ahu_sup_temp),2) as char) as ahu_sup_temp, " +\
                " cast(round(avg(ahu_out_temp),2) as char) as ahu_out_temp  " +\
                "from raw_wmahudata_temp_fix \n" +\
                f"where ahu_id = '{ahu_id}' and left(run_datetime, 6) = " + "'" + runDate + "'" +\
                "group by left(run_datetime, 8) " + \
                "order by left(run_datetime, 8);"
            cursor.execute(query)
            rv = cursor.fetchall()
            json_data = json.dumps(rv, indent=4)
            _logger.Info(
                f"succeed to do 'Get_AHU_temp_Daily_Data('{ahu_id}','{runDate}')'")
            return json_data

    except Exception as ex:
        _logger.Info(
            f"error to do 'Get_AHU_temp_Daily_Data('{ahu_id}','{runDate}')'")

# 공조기 월별 온도
async def Get_AHU_temp_monthly_Data(ahu_id: str, runDate: str):
    try:   
           
        # DB서버
        connection = pymysql.connect(host= DB['host'], port= 3306, user= DB['user'], password= DB['password'],
                                     db= DB['database'], charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
                
        with connection.cursor() as cursor:
            query = " select " +\
                " ahu_id, left(run_datetime,6) as rundate," +\
                " cast(round(avg(ahu_set_temp),2) as char) as ahu_set_temp, " +\
                " cast(round(avg(ahu_ret_temp),2) as char) as ahu_ret_temp, " +\
                " cast(round(avg(ahu_sup_temp),2) as char) as ahu_sup_temp, " +\
                " cast(round(avg(ahu_out_temp),2) as char) as ahu_out_temp  " +\
                "from raw_wmahudata_temp_fix \n" +\
                f"where ahu_id = '{ahu_id}' and left(run_datetime, 4) = " + "'" + runDate + "'" +\
                "group by left(run_datetime, 6) " + \
                "order by left(run_datetime, 6);"
            cursor.execute(query)
            rv = cursor.fetchall()
            json_data = json.dumps(rv, indent=4)
            _logger.Info(
                f"succeed to do 'Get_AHU_temp_monthly_Data('{ahu_id}','{runDate}')'")
            return json_data

    except Exception as ex:
        _logger.Info(
            f"error to do 'Get_AHU_temp_monthly_Data('{ahu_id}','{runDate}')'")

#############################################################################################################################################

#                                                          습도도 페이지(시간별, 일별, 월별) 

#############################################################################################################################################

# 공조기 시간별 습도
async def Get_AHU_hum_Hourly_Data(ahu_id: str, runDate: str):
    try:   
           
        # DB서버        
        connection = pymysql.connect(host= DB['host'], port= 3306, user= DB['user'], password= DB['password'],
                                     db= DB['database'], charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)      
        
        with connection.cursor() as cursor:
            query = " select " +\
                " ahu_id, left(run_datetime,12) as rundate," +\
                " cast(round(avg(ahu_set_hum),2) as char) as ahu_set_hum, " +\
                " cast(round(avg(ahu_ret_hum),2) as char) as ahu_ret_hum, " +\
                " cast(round(avg(ahu_sup_hum),2) as char) as ahu_sup_hum, " +\
                " cast(round(avg(ahu_out_hum),2) as char) as ahu_out_hum  " +\
                "from raw_wmahudata_hum \n" +\
                f"where ahu_id = '{ahu_id}' and left(run_datetime, 8) = " + "'" + runDate + "'" +\
                "group by left(run_datetime, 12) " + \
                "order by left(run_datetime, 12);"
            cursor.execute(query)
            rv = cursor.fetchall()
            json_data = json.dumps(rv, indent=4)
            _logger.Info(
                f"succeed to do 'Get_AHU_hum_Hourly_Data('{ahu_id}','{runDate}')'")
            return json_data

    except Exception as ex:
        _logger.Info(
            f"error to do 'Get_AHU_hum_Hourly_Data('{ahu_id}','{runDate}')'")

# 공조기 일별 습도
async def Get_AHU_hum_Daily_Data(ahu_id: str, runDate: str):
    try:   
           
        # DB서버        
        connection = pymysql.connect(host= DB['host'], port= 3306, user= DB['user'], password= DB['password'],
                                     db= DB['database'], charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)      
        
        with connection.cursor() as cursor:
            query = " select " +\
                " ahu_id, left(run_datetime,8) as rundate," +\
                " cast(round(avg(ahu_set_hum),2) as char) as ahu_set_hum, " +\
                " cast(round(avg(ahu_ret_hum),2) as char) as ahu_ret_hum, " +\
                " cast(round(avg(ahu_sup_hum),2) as char) as ahu_sup_hum, " +\
                " cast(round(avg(ahu_out_hum),2) as char) as ahu_out_hum  " +\
                "from raw_wmahudata_hum \n" +\
                f"where ahu_id = '{ahu_id}' and left(run_datetime, 6) = " + "'" + runDate + "'" +\
                "group by left(run_datetime, 8) " + \
                "order by left(run_datetime, 8);"
            cursor.execute(query)
            rv = cursor.fetchall()
            json_data = json.dumps(rv, indent=4)
            _logger.Info(
                f"succeed to do 'Get_AHU_hum_Daily_Data('{ahu_id}','{runDate}')'")
            return json_data

    except Exception as ex:
        _logger.Info(
            f"error to do 'Get_AHU_hum_Daily_Data('{ahu_id}','{runDate}')'")

# 공조기 월별 습도
async def Get_AHU_hum_monthly_Data(ahu_id: str, runDate: str):
    try:   
           
        # DB서버        
        connection = pymysql.connect(host= DB['host'], port= 3306, user= DB['user'], password= DB['password'],
                                     db= DB['database'], charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
        
        with connection.cursor() as cursor:
            query = " select " +\
                " ahu_id," +\
                " left(run_datetime,6) as rundate," +\
                " cast(round(avg(ahu_set_hum),2) as char) as ahu_set_hum, " +\
                " cast(round(avg(ahu_ret_hum),2) as char) as ahu_ret_hum, " +\
                " cast(round(avg(ahu_sup_hum),2) as char) as ahu_sup_hum, " +\
                " cast(round(avg(ahu_out_hum),2) as char) as ahu_out_hum  " +\
                "from raw_wmahudata_hum \n" +\
                f"where ahu_id = '{ahu_id}' and left(run_datetime, 4) = " + "'" + runDate + "'" +\
                "group by left(run_datetime, 6) " + \
                "order by left(run_datetime, 6);"
            cursor.execute(query)
            rv = cursor.fetchall()
            json_data = json.dumps(rv, indent=4)
            _logger.Info(
                f"succeed to do 'Get_AHU_hum_monthly_Data('{ahu_id}','{runDate}')'")
            return json_data

    except Exception as ex:
        _logger.Info(
            f"error to do 'Get_AHU_hum_monthly_Data('{ahu_id}','{runDate}')'")
