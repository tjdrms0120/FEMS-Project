import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Tooltip,
  ColumnSeries,
  Highlight,
  DateTime,
  DateTimeCategory,
  Crosshair,
} from "@syncfusion/ej2-react-charts";
import { useStateContext } from "../../context/UserContext";
import { MElecLinePrimaryXAxis, MonthElecPrimaryYAxis } from "../../data/dummy";
const MonthElecBar = () => {
  const { currentMode, mElecDt } = useStateContext();
  const ElecDataSource = [];
  let palettes = ["#FBBB04"];

  // 전력량 차트에
  let elecArray = [];
  mElecDt.forEach((item) => {
    let year = item.rundate.slice(0, 4);
    let month = item.rundate.slice(4, 6) - 1;
    elecArray.push({
      x: new Date(year, month),
      y: item.LpData * 1,
    });
  });
  ElecDataSource.push([...elecArray]);

  // console.log(elecArray);

  // 전력량
  const AreaElecData = [
    {
      dataSource: ElecDataSource[0],
      xName: "x",
      yName: "y",
      name: "일별 전력량",
      type: "Column",
    },
  ];

  return (
    <div className="w-full test">
      <ChartComponent
        id="charts"
        style={{ textAlign: "center" }}
        legendSettings={{ enableHighlight: true }}
        primaryXAxis={MElecLinePrimaryXAxis}
        primaryYAxis={MonthElecPrimaryYAxis}
        chartArea={{ border: { width: 0 } }}
        tooltip={{
          enable: true,
          shared: true,
        }}
        crosshair={{
          enable: true,
          lineType: "Vertical",
        }}
        palettes={palettes}
        background={currentMode === "Dark" ? "#33373E" : "#fff"}
      >
        <Inject
          services={[
            ColumnSeries,
            Legend,
            Tooltip,
            Highlight,
            DateTime,
            Crosshair,
            DateTimeCategory,
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

export default MonthElecBar;
