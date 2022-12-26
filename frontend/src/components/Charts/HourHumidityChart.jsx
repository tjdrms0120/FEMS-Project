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
  HumidityHourLinePrimaryXAxis,
  HumidityHourLinePrimaryYAxis,
} from "../../data/dummy";

import { useStateContext } from "../../context/UserContext";

const HourHumidityChart = () => {
  const { currentMode, hHumiDt } = useStateContext();
  const HumiDataSource = [];

  console.log(hHumiDt);

  // // 설정습도
  // let humiArray = [];
  // hHumiDt.forEach((item) => {
  //   let year = item.rundate.slice(0, 4);
  //   let month = item.rundate.slice(4, 6);
  //   let day = item.rundate.slice(6, 8);
  //   let hour = item.rundate.slice(8, 10);
  //   let minute = item.rundate.slice(10, 12);
  //   humiArray.push({
  //     x: new Date(year, month, day, hour, minute),
  //     y: item.ahu_set_hum,
  //   });
  // });
  // HumiDataSource.push([...humiArray]);

  // // 리턴습도
  // humiArray = [];
  // hHumiDt.forEach((item) => {
  //   let year = item.rundate.slice(0, 4);
  //   let month = item.rundate.slice(4, 6);
  //   let day = item.rundate.slice(6, 8);
  //   let hour = item.rundate.slice(8, 10);
  //   let minute = item.rundate.slice(10, 12);

  //   humiArray.push({
  //     x: new Date(year, month, day, hour, minute),
  //     y: item.ahu_ret_hum,
  //   });
  // });
  // HumiDataSource.push([...humiArray]);

  // // 공급습도
  // humiArray = [];
  // hHumiDt.forEach((item) => {
  //   let year = item.rundate.slice(0, 4);
  //   let month = item.rundate.slice(4, 6);
  //   let day = item.rundate.slice(6, 8);
  //   let hour = item.rundate.slice(8, 10);
  //   let minute = item.rundate.slice(10, 12);

  //   humiArray.push({
  //     x: new Date(year, month, day, hour, minute),
  //     y: item.ahu_sup_hum,
  //   });
  // });
  // HumiDataSource.push([...humiArray]);

  // // 외부습도
  // humiArray = [];
  // hHumiDt.forEach((item) => {
  //   let year = item.rundate.slice(0, 4);
  //   let month = item.rundate.slice(4, 6);
  //   let day = item.rundate.slice(6, 8);
  //   let hour = item.rundate.slice(8, 10);
  //   let minute = item.rundate.slice(10, 12);

  //   humiArray.push({
  //     x: new Date(year, month, day, hour, minute),
  //     y: item.ahu_out_hum,
  //   });
  // });
  // HumiDataSource.push([...humiArray]);

  const humiArray = [
    hHumiDt.map((item) => ({
      x: new Date(
        item.rundate.slice(0, 4),
        item.rundate.slice(4, 6),
        item.rundate.slice(6, 8),
        item.rundate.slice(8, 10),
        item.rundate.slice(10, 12)
      ),
      y: item.ahu_set_hum,
    })),
  ];
  HumiDataSource.push([...humiArray]);

  // 리턴습도
  const humiArray1 = [
    hHumiDt.map((item) => ({
      x: new Date(
        item.rundate.slice(0, 4),
        item.rundate.slice(4, 6),
        item.rundate.slice(6, 8),
        item.rundate.slice(8, 10),
        item.rundate.slice(10, 12)
      ),
      y: item.ahu_ret_hum,
    })),
  ];
  HumiDataSource.push([...humiArray1]);

  // 공급습도
  const humiArray2 = [
    hHumiDt.map((item) => ({
      x: new Date(
        item.rundate.slice(0, 4),
        item.rundate.slice(4, 6),
        item.rundate.slice(6, 8),
        item.rundate.slice(8, 10),
        item.rundate.slice(10, 12)
      ),
      y: item.ahu_sup_hum,
    })),
  ];
  HumiDataSource.push([...humiArray2]);

  // 외부습도
  const humiArray3 = [
    hHumiDt.map((item) => ({
      x: new Date(
        item.rundate.slice(0, 4),
        item.rundate.slice(4, 6),
        item.rundate.slice(6, 8),
        item.rundate.slice(8, 10),
        item.rundate.slice(10, 12)
      ),
      y: item.ahu_out_hum,
    })),
  ];
  HumiDataSource.push([...humiArray3]);

  console.log(HumiDataSource);

  const LineTempData = [
    {
      dataSource: humiArray[0],
      xName: "x",
      yName: "y",
      name: "설정습도",
      width: "2",
      marker: { visible: false, width: 10, height: 10 },
      type: "Line",
    },

    {
      dataSource: humiArray1[0],
      xName: "x",
      yName: "y",
      name: "리턴습도",
      width: "2",
      marker: { visible: false, width: 10, height: 10 },
      type: "Line",
    },

    {
      dataSource: humiArray2[0],
      xName: "x",
      yName: "y",
      name: "공급습도",
      width: "2",
      marker: { visible: false, width: 10, height: 10 },
      type: "Line",
    },
    {
      dataSource: humiArray3[0],
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
      primaryXAxis={HumidityHourLinePrimaryXAxis}
      primaryYAxis={HumidityHourLinePrimaryYAxis}
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

export default HourHumidityChart;

//? 테스트용
// const humiArray = [
//   hHumiDt.map((item) => ({
//     x: new Date(
//       item.rundate.slice(0, 4),
//       item.rundate.slice(4, 6),
//       item.rundate.slice(6, 8),
//       item.rundate.slice(8, 10),
//       item.rundate.slice(10, 12)
//     ),
//     y: item.ahu_set_hum,
//   })),
// ];
// HumiDataSource.push([...humiArray]);

// // 리턴습도
// const humiArray1 = [
//   hHumiDt.map((item) => ({
//     x: new Date(
//       item.rundate.slice(0, 4),
//       item.rundate.slice(4, 6),
//       item.rundate.slice(6, 8),
//       item.rundate.slice(8, 10),
//       item.rundate.slice(10, 12)
//     ),
//     y: item.ahu_ret_hum,
//   })),
// ];
// HumiDataSource.push([...humiArray1]);

// // 공급습도
// const humiArray2 = [
//   hHumiDt.map((item) => ({
//     x: new Date(
//       item.rundate.slice(0, 4),
//       item.rundate.slice(4, 6),
//       item.rundate.slice(6, 8),
//       item.rundate.slice(8, 10),
//       item.rundate.slice(10, 12)
//     ),
//     y: item.ahu_sup_hum,
//   })),
// ];
// HumiDataSource.push([...humiArray2]);

// // 외부습도
// const humiArray3 = [
//   hHumiDt.map((item) => ({
//     x: new Date(
//       item.rundate.slice(0, 4),
//       item.rundate.slice(4, 6),
//       item.rundate.slice(6, 8),
//       item.rundate.slice(8, 10),
//       item.rundate.slice(10, 12)
//     ),
//     y: item.ahu_out_hum,
//   })),
// ];
// HumiDataSource.push([...humiArray3]);
