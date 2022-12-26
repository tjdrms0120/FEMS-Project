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
import {
  HumidityDayLinePrimaryXAxis,
  HumidityDayLinePrimaryYAxis,
} from "../../data/dummy";

import { useStateContext } from "../../context/UserContext";

const DayHumidityChart = () => {
  const { currentMode, dHumidity } = useStateContext();
  const HumiDataSource = [];

  // 설정습도
  let humiArray = [];
  dHumidity.forEach((item) => {
    let year = item.rundate.slice(0, 4);
    let month = item.rundate.slice(4, 6);
    let day = item.rundate.slice(6, 8);
    let hour = item.rundate.slice(8, 10);
    let minute = item.rundate.slice(10, 12);
    humiArray.push({
      x: new Date(year, month, day, hour, minute),
      y: item.ahu_set_hum,
    });
  });
  HumiDataSource.push([...humiArray]);

  // 리턴습도
  humiArray = [];
  dHumidity.forEach((item) => {
    let year = item.rundate.slice(0, 4);
    let month = item.rundate.slice(4, 6);
    let day = item.rundate.slice(6, 8);
    let hour = item.rundate.slice(8, 10);
    let minute = item.rundate.slice(10, 12);

    humiArray.push({
      x: new Date(year, month, day, hour, minute),
      y: item.ahu_ret_hum,
    });
  });
  HumiDataSource.push([...humiArray]);

  // 공급습도
  humiArray = [];
  dHumidity.forEach((item) => {
    let year = item.rundate.slice(0, 4);
    let month = item.rundate.slice(4, 6);
    let day = item.rundate.slice(6, 8);
    let hour = item.rundate.slice(8, 10);
    let minute = item.rundate.slice(10, 12);

    humiArray.push({
      x: new Date(year, month, day, hour, minute),
      y: item.ahu_sup_hum,
    });
  });
  HumiDataSource.push([...humiArray]);

  // 외부습도
  humiArray = [];
  dHumidity.forEach((item) => {
    let year = item.rundate.slice(0, 4);
    let month = item.rundate.slice(4, 6);
    let day = item.rundate.slice(6, 8);
    let hour = item.rundate.slice(8, 10);
    let minute = item.rundate.slice(10, 12);

    humiArray.push({
      x: new Date(year, month, day, hour, minute),
      y: item.ahu_out_hum,
    });
  });
  HumiDataSource.push([...humiArray]);

  const LineTempData = [
    {
      dataSource: HumiDataSource[0],
      xName: "x",
      yName: "y",
      name: "설정습도",
      width: "2",
      marker: { visible: false, width: 10, height: 10 },
      type: "Line",
    },

    {
      dataSource: HumiDataSource[1],
      xName: "x",
      yName: "y",
      name: "리턴습도",
      width: "2",
      marker: { visible: false, width: 10, height: 10 },
      type: "Line",
    },

    {
      dataSource: HumiDataSource[2],
      xName: "x",
      yName: "y",
      name: "공급습도",
      width: "2",
      marker: { visible: false, width: 10, height: 10 },
      type: "Line",
    },
    {
      dataSource: HumiDataSource[3],
      xName: "x",
      yName: "y",
      name: "설비 외부습도",
      width: "2",
      marker: { visible: false, width: 10, height: 10 },
      type: "Line",
    },
  ];

  return (
    <ChartComponent
      id="line-chart"
      height="480px"
      width="auto"
      primaryXAxis={HumidityDayLinePrimaryXAxis}
      primaryYAxis={HumidityDayLinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{
        enable: true,
        shared: true,
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

export default DayHumidityChart;
