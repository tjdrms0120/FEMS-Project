import React from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Group,
  Inject,
  Sort,
  Resize,
  InfiniteScroll,
} from "@syncfusion/ej2-react-grids";
import { getValue } from "@syncfusion/ej2-base";

import { useStateContext } from "../../context/UserContext";
const DayElectricGrid = () => {
  const { dElecDt } = useStateContext();

  function currencyFormatter(field, data) {
    return getValue(field, data) + " kWh";
  }
  function StringToDateFormatter(field, data) {
    let date = getValue(field, data);

    let year = date.slice(0, 4);
    let month = date.slice(4, 6);
    let day = date.slice(6, 8);
    let hour = date.slice(8, 10);
    let minute = date.slice(10, 12);

    // return typeof hour;
    if (hour !== "") {
      return `${year}-${month}-${day} ${hour}:${minute}`;
    } else if (day !== "") {
      return `${year}-${month}-${day}`;
    } else {
      return `${year}-${month}`;
    }
  }

  return (
    <GridComponent dataSource={dElecDt} enableInfiniteScrolling height={300}>
      <ColumnsDirective>
        <ColumnDirective
          headerText="일자"
          field="rundate" //시간별전력량 backend Api name
          width="100"
          textAlign="Center"
          valueAccessor={StringToDateFormatter}
        />
        <ColumnDirective
          headerText="전력소비량"
          field="LpData"
          width="100"
          textAlign="Center"
          valueAccessor={currencyFormatter}
        />
      </ColumnsDirective>
      <Inject services={[InfiniteScroll, Sort, Filter, Group, Resize]} />
    </GridComponent>
  );
};

export default DayElectricGrid;
