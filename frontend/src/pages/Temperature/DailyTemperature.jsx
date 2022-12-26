import React from "react";
import { Dayheader, DayLineChart, DayTempGrid } from "../../components";
import Header from "../../components/common/Header";
/**
 * 
//FIXME: DayLineCthart > DaytempChart
 */
const HourlyTemperature = () => {
  return (
    <>
      <div className="m-4 md:m-2 mt-24 p-5 w-auto bg-white dark:bg-secondary-dark-bg rounded-3xl h-40">
        <Header category="온도" title="일별 온도현황" />
        <Dayheader />
      </div>
      <div className="-4 md:m-2 mt-24 p-5 bg-white rounded-3xl dark:bg-secondary-dark-bg">
        <DayLineChart />
        <DayTempGrid />
      </div>
    </>
  );
};

export default HourlyTemperature;
