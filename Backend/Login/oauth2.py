from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from Login import JWTtoken

# ID 인증절차URL
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')

# JWT발급된 ID 인증절차
# 안되어 있을 시 에러발생 : detail 참고
def get_current_user(data : str = Depends(oauth2_scheme)):
    credentials_excption = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    return JWTtoken.verify_token(data, credentials_excption)