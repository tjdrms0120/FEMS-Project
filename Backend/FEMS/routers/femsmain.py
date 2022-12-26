from FEMS.repository import FemsServices

from fastapi import APIRouter

from fastapi import Response

# 경로지정, 태그로 구분
router = APIRouter(
    tags=['Fems']
)


############################################################

#                    메인 페이지

############################################################

# 설비 정보(공조기 이름, 위치, 사용하는 곳 표시)
@router.get("/Get_AHU_Info")
async def Get_AHU_Info():
    result = await FemsServices.Get_AHU_Info()
    return Response(content=result, media_type="application/json")



# 전년도 대비 전력량 추출
@router.get("/Get_LpData_monthly_Daily_Data")
async def Get_LpData_monthly_Daily_Data():
    result = await FemsServices.Get_LpData_monthly_Daily_Data()
    return Response(content=result, media_type="application/json")



####################################################################################

#                   공조기 전력량, 온도, 습도(시간별, 일별, 월별)

####################################################################################

####################################################################################

#                                   전력량

####################################################################################

# 전력량 시간별
@router.get("/Get_AHU_KWh_Hourly_Data")
async def Get_AHU_KWh_Hourly_Data(runDate: str):
    result = await FemsServices.Get_AHU_KWh_Hourly_Data(runDate)
    return Response(content=result, media_type="application/json")

# 전력량 일별
@router.get("/Get_AHU_KWh_Daily_Data")
async def Get_AHU_KWh_Daily_Data(runDate: str):
    result = await FemsServices.Get_AHU_KWh_Daily_Data(runDate)
    return Response(content=result, media_type="application/json")

# 전력량 월별
@router.get("/Get_AHU_KWh_monthly_Data")
async def Get_AHU_KWh_monthly_Data(runDate: str):
    result = await FemsServices.Get_AHU_KWh_monthly_Data(runDate)
    return Response(content=result, media_type="application/json")

####################################################################################

#                                   온도

####################################################################################

# 온도 시간별
@router.get("/Get_AHU_temp_Hourly_Data")
async def Get_AHU_temp_Hourly_Data(ahu_id: str, runDate: str):
    result = await FemsServices.Get_AHU_temp_Hourly_Data(ahu_id, runDate)
    return Response(content=result, media_type="application/json")


# 온도 일별
@router.get("/Get_AHU_temp_Daily_Data")
async def Get_AHU_temp_Daily_Data(ahu_id : str, runDate: str):
    result = await FemsServices.Get_AHU_temp_Daily_Data(ahu_id, runDate)
    return Response(content=result, media_type="application/json")

# 온도 월별
@router.get("/Get_AHU_temp_monthly_Data")
async def Get_AHU_temp_monthly_Data(ahu_id:str, runDate: str):
    result = await FemsServices.Get_AHU_temp_monthly_Data(ahu_id, runDate)
    return Response(content=result, media_type="application/json")

####################################################################################

#                                   습도

####################################################################################


# 습도 시간별
@router.get("/Get_AHU_hum_Hourly_Data")
async def Get_AHU_hum_Hourly_Data(ahu_id : str, runDate: str):
    result = await FemsServices.Get_AHU_hum_Hourly_Data(ahu_id, runDate)
    return Response(content=result, media_type="application/json")

# 습도 일별
@router.get("/Get_AHU_hum_Daily_Data")
async def Get_AHU_hum_Daily_Data(ahu_id : str, runDate: str):
    result = await FemsServices.Get_AHU_hum_Daily_Data(ahu_id, runDate)
    return Response(content=result, media_type="application/json")


# 습도 월별
@router.get("/Get_AHU_hum_monthly_Data")
async def Get_AHU_hum_monthly_Data(ahu_id : str, runDate: str):
    result = await FemsServices.Get_AHU_hum_monthly_Data(ahu_id, runDate)
    return Response(content=result, media_type="application/json")