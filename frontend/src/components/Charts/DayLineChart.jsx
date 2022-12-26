import React from "react";

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  DateTime,
  LineSeries,
  Tooltip,
  Crosshair,
} from "@syncfusion/ej2-react-charts";
import { Resize } from "@syncfusion/ej2-react-grids";
import { DayLinePrimaryXAxis, LinePrimaryYAxis } from "../../data/dummy";

import { useStateContext } from "../../context/UserContext";

const DayLineChart = () => {
  const { currentMode, dTempDt } = useStateContext();
  const TempDataSource = [];

  // 설정온도
  let tempArray = [];
  dTempDt.forEach((item) => {
    let year = item.rundate.slice(0, 4);
    let month = item.rundate.slice(4, 6);
    let day = item.rundate.slice(6, 8);
    let hour = item.rundate.slice(8, 10);
    let minute = item.rundate.slice(10, 12);
    tempArray.push({
      x: new Date(year, month, day, hour, minute),
      y: item.ahu_set_temp,
    });
  });
  TempDataSource.push([...tempArray]);

  // 리턴온도
  tempArray = [];
  dTempDt.forEach((item) => {
    let year = item.rundate.slice(0, 4);
    let month = item.rundate.slice(4, 6);
    let day = item.rundate.slice(6, 8);
    let hour = item.rundate.slice(8, 10);
    let minute = item.rundate.slice(10, 12);

    tempArray.push({
      x: new Date(year, month, day, hour, minute),
      y: item.ahu_ret_temp,
    });
  });
  TempDataSource.push([...tempArray]);

  // 공급온도
  tempArray = [];
  dTempDt.forEach((item) => {
    let year = item.rundate.slice(0, 4);
    let month = item.rundate.slice(4, 6);
    let day = item.rundate.slice(6, 8);
    let hour = item.rundate.slice(8, 10);
    let minute = item.rundate.slice(10, 12);

    tempArray.push({
      x: new Date(year, month, day, hour, minute),
      y: item.ahu_sup_temp,
    });
  });
  TempDataSource.push([...tempArray]);

  // 외부온도
  tempArray = [];
  dTempDt.forEach((item) => {
    let year = item.rundate.slice(0, 4);
    let month = item.rundate.slice(4, 6);
    let day = item.rundate.slice(6, 8);
    let hour = item.rundate.slice(8, 10);
    let minute = item.rundate.slice(10, 12);

    tempArray.push({
      x: new Date(year, month, day, hour, minute),
      y: item.ahu_out_temp,
    });
  });
  TempDataSource.push([...tempArray]);

  const LineTempData = [
    {
      dataSource: TempDataSource[0],
      xName: "x",
      yName: "y",
      name: "설정온도",
      width: "2",
      marker: { visible: false, width: 10, height: 10 },
      type: "Line",
    },

    {
      dataSource: TempDataSource[1],
      xName: "x",
      yName: "y",
      name: "공급온도",
      width: "2",
      marker: { visible: false, width: 10, height: 10 },
      type: "Line",
    },

    {
      dataSource: TempDataSource[2],
      xName: "x",
      yName: "y",
      name: "리턴온도",
      width: "2",
      marker: { visible: false, width: 10, height: 10 },
      type: "Line",
    },
    {
      dataSource: TempDataSource[3],
      xName: "x",
      yName: "y",
      name: "외부온도",
      width: "2",
      marker: { visible: false, width: 10, height: 10 },
      type: "Line",
    },
  ];

  // console.log(lineChartData[0]);
  // console.log(LineTempData);

  return (
    <ChartComponent
      id="line-chart"
      height="480px"
      width="auto"
      primaryXAxis={DayLinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{
        enable: true,
        shared: true,
        // format: "${point.x} : <b>${point.y}",
        // header: "<b>Electric Prediction</b>",
      }}
      crosshair={{ enable: true, lineType: "Vertical" }}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
    >
      <Inject services={[LineSeries, DateTime, Tooltip, Crosshair, Resize]} />
      <SeriesCollectionDirective>
        {LineTempData.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default DayLineChart;
