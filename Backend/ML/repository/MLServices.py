import os
import json
import pymysql
from FEMS.Logger import Logger
_logger = Logger("MLService")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SECRET_FILE = os.path.join(BASE_DIR, 'secrets.json')
secrets = json.loads(open(SECRET_FILE).read())

DB = secrets['DB']
USER = DB['user']
PASSWORD = DB['password']
HOST = DB['host']
PORT = DB['port']
DATABASE = DB['database']

# ML 실제 값 출력
def GET_ML_real_data():
    try:
        
        # DB서버        
        connection = pymysql.connect(host= DB['host'], port= 3306, user= DB['user'], password= DB['password'],
                                     db= DB['database'], charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
        
        with connection.cursor() as cursor:
            query = " select " +\
                    " rundate, " +\
                    " Y_real_Data_fix " +\
                    " from tp_fix_null " +\
                    " WHERE left(rundate,4) = '2022' and  rundate BETWEEN '20220103' and '20221024';"
            cursor.execute(query)
            rv = cursor.fetchall()
            json_data = json.dumps(rv, indent=4)
            _logger.Info(f"succed to do 'GET_ML_real_data'")
            
            return json_data
    except Exception as ex:
        _logger.Info(f"error to do 'GET_ML_real_data'")
        
# ML 예측 값 출력
def GET_ML_pred_data():
    try:
        
        # DB서버        
        connection = pymysql.connect(host= DB['host'], port= 3306, user= DB['user'], password= DB['password'],
                                     db= DB['database'], charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
        
        with connection.cursor() as cursor:
            query = " select " +\
                    " rundate, " +\
                    " Y_pred_Data " +\
                    " from tp_fix_null" +\
                    " WHERE left(rundate,4) = '2022';"
            cursor.execute(query)
            rv = cursor.fetchall()
            json_data = json.dumps(rv, indent=4)
            _logger.Info(f"succed to do 'GET_ML_pred_data'")
            
            return json_data
    except Exception as ex:
        _logger.Info(f"error to do 'GET_ML_pred_data'")