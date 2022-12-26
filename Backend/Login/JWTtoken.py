from jose import jwt, JWTError
from Login import schemas

# Token값 설정
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"

# 토큰 값 생성하기
def create_access_token(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# LoginID 인증 요청
def verify_token(token:str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        LoginID: str = payload.get("sub")
        if LoginID is None:
            raise credentials_exception
        token_data = schemas.TokenData(LoginID=LoginID)
    except JWTError:
        raise credentials_exception