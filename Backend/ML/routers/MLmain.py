from ML.repository import MLServices

from fastapi import APIRouter
from fastapi import Response

router = APIRouter(
    tags=['ML']
)


# ML 실제값 
@router.get("/Real_ML")
def Get_real_ML():
    result = MLServices.GET_ML_real_data()
    return Response(content=result, media_type="application/json")

# ML 예측값
@router.get("/Pred_ML")
def Get_pred_ML():
    result = MLServices.GET_ML_pred_data()
    return Response(content=result, media_type="application/json")