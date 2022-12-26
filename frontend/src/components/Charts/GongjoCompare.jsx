import { React, useEffect, useState } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Legend,
  ColumnSeries,
  Inject,
  Tooltip,
  DateTimeCategory,
} from "@syncfusion/ej2-react-charts";
import { Resize } from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { GongjoPrimaryXAxis, GongjoPrimaryYAxis } from "../../data/dummy";
import { useStateContext } from "../../context/UserContext";
//api 주소
const SERVER_URL = "/Get_LpData_monthly_Daily_Data";

const GongjoCompare = () => {
  const { currentMode } = useStateContext();
  const [compareData, setCompareData] = useState([]);
  const CompareChartData = [];

  // API 요청
  const fetchData = async () => {
    const res = await axios.get(SERVER_URL);
    setCompareData(res.data);
  };

  // 실행시 API 요청
  useEffect(() => {
    fetchData();
  }, [setCompareData]);

  console.log(compareData);

  // 21년도 월 전력량
  let PowerArray = [];
  compareData.forEach((item) => {
    let year = item.runDate.slice(0, 4);
    let month = item.runDate.slice(4, 6);
    if (year === "2021") {
      PowerArray.push({
        // x: new Date(year, month),
        x: month,
        y: item.sumData,
      });
    }
  });
  CompareChartData.push([...PowerArray]);

  // 22년도 월 전력량
  PowerArray = [];
  compareData.forEach((item) => {
    let year = item.runDate.slice(0, 4);
    let month = item.runDate.slice(4, 6);
    if (year === "2022") {
      PowerArray.push({
        // x: new Date(year, month),
        x: month,
        y: item.sumData,
      });
    }
    // console.log(typeof month);
  });
  CompareChartData.push([...PowerArray]);

  // console.log(CompareChartData);

  // // 비교차트 2021전력량
  const CompareYearData21 = [
    {
      dataSource: CompareChartData[0],
      type: "Column",
      name: "2021",
      xName: "x",
      yName: "y",
    },
  ];
  // 비교차트 2022전력량
  const CompareYearData22 = [
    {
      dataSource: CompareChartData[1],
      type: "Column",
      name: "2022",
      xName: "x",
      yName: "y",
    },
  ];
  const palette = ["#66D7CE", "#453A72"];

  return (
    <div className="w-full text-center m-5">
      <ChartComponent
        legendSettings={{ visible: true }}
        title="공조기 월별 전력소모량"
        useGroupingSeparator={true}
        primaryXAxis={GongjoPrimaryXAxis}
        primaryYAxis={GongjoPrimaryYAxis}
        tooltip={{ enable: true }}
        width="auto"
        height="300px"
        palettes={palette}
        background={currentMode === "Dark" ? "#33373E" : "#fff"}
      >
        <Inject
          services={[ColumnSeries, Legend, Tooltip, Resize, DateTimeCategory]}
        ></Inject>
        <SeriesCollectionDirective>
          {CompareYearData21.map((item, index) => (
            <SeriesDirective key={index} {...item} />
          ))}
          {CompareYearData22.map((item, index) => (
            <SeriesDirective key={index} {...item} />
          ))}
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default GongjoCompare;
