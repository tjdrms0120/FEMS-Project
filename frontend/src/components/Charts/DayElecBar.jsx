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
  Crosshair,
} from "@syncfusion/ej2-react-charts";
import { useStateContext } from "../../context/UserContext";
import { DayElecPrimaryYAxis, DElecPrimaryXAxis } from "../../data/dummy";
const DayElecBar = () => {
  const { currentMode, dElecDt } = useStateContext();
  const ElecDataSource = [];

  // 전력량 차트에
  let elecArray = [];
  dElecDt.forEach((item) => {
    let year = item.rundate.slice(0, 4);
    let month = item.rundate.slice(4, 6);
    let day = item.rundate.slice(6, 8);
    elecArray.push({
      x: new Date(year, month, day),
      y: item.LpData * 1,
    });
  });
  ElecDataSource.push([...elecArray]);

  // console.log(elecArray);

  // 전력량
  const AreaElecData = [
    {
      dataSource: ElecDataSource[0],
      // dataSource: data1,
      tooltipMappingName: "r",
      xName: "x",
      columnSpacing: 0.1,
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
        primaryXAxis={DElecPrimaryXAxis}
        primaryYAxis={DayElecPrimaryYAxis}
        chartArea={{ border: { width: 0 } }}
        tooltip={{
          enable: true,
          shared: true,
        }}
        crosshair={{
          enable: true,
          lineType: "Vertical",
        }}
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

export default DayElecBar;
