from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from Login import models, JWTtoken
from Login.hashing import Hash

from database import get_db
from fastapi.security import OAuth2PasswordRequestForm



# 태그로 지정하여 구분
router = APIRouter(
    tags=['Authentication']
)

# login API 주소
# ID와 PASSWORD가 있으면 정보가 나온다.
@router.post('/login')
def login(request: OAuth2PasswordRequestForm = Depends(), db:Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.LoginID == request.username).first()
    # LoginID 확인 작업
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f"Invalid Credentials")
    # 비밀번호 토큰 jwt 확인작업
    if not Hash.verify(request.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f"Incorrect password")
    #generate a jwt token and return 
    access_token = JWTtoken.create_access_token(data={"sub": user.LoginID})
    return {"access_token": access_token, "token_type": "bearer"}



