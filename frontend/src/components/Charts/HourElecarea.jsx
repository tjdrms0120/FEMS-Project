import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
  Inject,
  Legend,
  SplineAreaSeries,
  Highlight,
  Crosshair,
  DateTime,
} from "@syncfusion/ej2-react-charts";
import { useStateContext } from "../../context/UserContext";
import { ElecLinePrimaryYAxis, HElecPrimaryXAxis } from "../../data/dummy";
const HourElecarea = () => {
  const { currentMode, hElecDt } = useStateContext();
  const ElecDataSource = [];

  // 전력량 차트에
  let elecArray = [];
  hElecDt.forEach((item) => {
    let year = item.rundate.slice(0, 4);
    let month = item.rundate.slice(4, 6);
    let day = item.rundate.slice(6, 8);
    let hour = item.rundate.slice(8, 10);
    let minute = item.rundate.slice(10, 12);

    elecArray.push({
      x: new Date(year, month, day, hour, minute),
      y: item.LpData * 1,
    });
  });
  ElecDataSource.push([...elecArray]);

  console.log(ElecDataSource);

  // 전력량
  const AreaElecData = [
    {
      dataSource: ElecDataSource[0],
      xName: "x",
      yName: "y",
      name: "전력량",
      width: "2",
      marker: { visible: false, width: 10, height: 10 },
      type: "SplineArea",
      opacity: 0.6,
      border: { width: 2 },
    },
  ];

  return (
    <div className="w-full test">
      <ChartComponent
        id="charts"
        style={{ textAlign: "center" }}
        primaryXAxis={HElecPrimaryXAxis}
        primaryYAxis={ElecLinePrimaryYAxis}
        legendSettings={{ enableHighlight: true }}
        chartArea={{ border: { width: 0 } }}
        title="시간별 전력량"
        tooltip={{ enable: true, shared: true }}
        crosshair={{ enable: true, lineType: "Vertical" }}
        background={currentMode === "Dark" ? "#33373E" : "#fff"}
        // palettes={palette}
      >
        <Inject
          services={[
            SplineAreaSeries,
            DateTime,
            Tooltip,
            Legend,
            Highlight,
            Crosshair,
          ]}
        />
        <SeriesCollectionDirective>
          {AreaElecData.map((item, index) => (
            <SeriesDirective key={index} {...item} />
          ))}
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default HourElecarea;
