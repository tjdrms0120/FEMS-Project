from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import os
import json

# DB설정 및 secrets.json으로 DB값 숨기기
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SECRET_FILE = os.path.join(BASE_DIR, 'secrets.json')
secrets = json.loads(open(SECRET_FILE).read())

# DB정의
DB = secrets['DB']
USER = DB['user']
PASSWORD = DB['password']
HOST = DB['host']
PORT = DB['port']
DATABASE = DB['database']

# DB URL 정의
DB_URL =f"mariadb+pymysql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}"

# DB 엔진 정의
engine = create_engine(DB_URL,  encoding='utf-8', echo=True)

# 세션 메이커 DB연결
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()

# 저장된 DB가져오기
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()