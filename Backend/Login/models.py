import sqlalchemy
import sqlalchemy.orm
import passlib.hash

from database import Base

# 테이블 정의
class User(Base):
    __tablename__ = "LoginID"
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, index=True)
    LoginID = sqlalchemy.Column(sqlalchemy.String(255), unique=True, index=True)
    hashed_password = sqlalchemy.Column(sqlalchemy.String(255), index=True)
