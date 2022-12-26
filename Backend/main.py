from Login.routers import user, authentication
from FEMS.routers import femsmain
from ML.routers import MLmain

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


app = FastAPI()

# adding cors urls
origins = [
    "*"
]

# add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

'''

User

'''
# Router에 저장되어 있는 API주소 불러오기
# 실제 API주소는 Router 안에 있다.
app.include_router(authentication.router)
app.include_router(user.router)

'''

ML

'''
#  Router에 저장되어 있는 API주소 불러오기
# 실제 API주소는 Router 안에 있다.
app.include_router(MLmain.router)

'''

FEMS

'''
#  Router에 저장되어 있는 API주소 불러오기
# 실제 API주소는 Router 안에 있다.
app.include_router(femsmain.router)








if __name__ == "__main__":
    uvicorn.run('main:app', host="0.0.0.0", port=8000, reload=True)