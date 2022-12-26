from passlib.context import CryptContext
pwd_cxt = CryptContext(schemes=['bcrypt'], deprecated='auto')

# 비밀번호 해쉬 부분으로 옮기기
class Hash():
    def bcrypt(hashed_password: str):
        return pwd_cxt.hash(hashed_password)

    def verify(plain_password, hashed_password):
        return pwd_cxt.verify(plain_password, hashed_password)