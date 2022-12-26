from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from Login.repository import user

from Login import schemas, oauth2
from database import get_db

# 경로지정, 태그로 구분
router = APIRouter(
    tags=['User']
)

# ID생성하는 API
@router.post('/create_id', response_model=schemas.UserBase)
async def create_user(request:schemas.UserBase, db:Session = Depends(get_db)):
    return user.create(request, db)

# 인증된 ID하나 보여주기
# 로그인 하지 않을 시 보여주지 않는다. -> 에러 발생은 oauth2.py에 작성되어 있다.
@router.get('/User', response_model=schemas.showUser)
def all(db:Session = Depends(get_db), current_user : schemas.showUser = Depends(oauth2.get_current_user)):
    return user.get(db)
