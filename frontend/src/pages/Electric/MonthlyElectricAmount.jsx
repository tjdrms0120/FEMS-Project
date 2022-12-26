import React, { useEffect, useState } from "react";
import { Monthdate, MonthElecBar, MonthElectricGrid } from "../../components";
import Header from "../../components/common/Header";
import axios from "axios";
import { useStateContext } from "../../context/UserContext";
const Electricamount = () => {
  const [startDate, setStartDate] = useState({});
  const { setMElecDt } = useStateContext();

  const SERVER_URL = "Get_AHU_KWh_monthly_Data";

  // 클릭시 공조기 ID와 시간정보 출력
  const electricHandleSubmit = async (e) => {
    e.preventDefault();
    const {
      runDate: { value: Monthdate },
    } = e.target;

    console.log(e.target);

    const ParseDayDate = Monthdate.replaceAll("/", "");

    await setStartDate({
      runDate: ParseDayDate,
    });
  };

  // set 부분을 useEffect로
  useEffect(() => {
    const fetchData = async (idDate) => {
      // console.log(idDate.ahu_id);
      const response = await axios.get(SERVER_URL, {
        params: {
          runDate: `${idDate.runDate}`,
        },
      });
      setMElecDt(response.data);
    };

    fetchData(startDate);
  }, [startDate, setMElecDt]);

  return (
    <div className="m-4 md:m-2 mt-24 p-5 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="전력량" title="월별 전력량" />
      <form onSubmit={electricHandleSubmit} autoComplete="off">
        <div
          className="flex mb-10
      "
        >
          <Monthdate />
          <button
            type="submit"
            className="pointer w-32 h-auto text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 transition focus:ease-in-out rounded-md"
          >
            검색
          </button>
        </div>
      </form>
      <MonthElecBar />
      <MonthElectricGrid />
    </div>
  );
};

export default Electricamount;
