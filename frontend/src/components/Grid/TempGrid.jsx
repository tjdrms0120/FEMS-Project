import React from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Group,
  InfiniteScroll,
  Inject,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { getValue } from "@syncfusion/ej2-base";
import { useStateContext } from "../../context/UserContext";

const TempGrid = () => {
  const { currentMode, hTempDt } = useStateContext();

  function StringToDateFormatter(field, data) {
    let date = getValue(field, data);
    let year = date.slice(0, 4);
    let month = date.slice(4, 6);
    let day = date.slice(6, 8);
    let hour = date.slice(8, 10);
    let minute = date.slice(10, 12);

    if (hour !== "") {
      return `${year}-${month}-${day} ${hour}:${minute}`;
    }
    if (day !== "") {
      return `${year}-${month}-${day}`;
    }
    return `${year}-${month}`;
  }

  return (
    <GridComponent dataSource={hTempDt} enableInfiniteScrolling height={300}>
      <ColumnsDirective>
        <ColumnDirective
          headerText="실행시간"
          field="rundate"
          width="10"
          textAlign="Right"
          valueAccessor={StringToDateFormatter}
          background={currentMode === "Dark" ? "#33373E" : "#fff"}
        />
        <ColumnDirective
          headerText="설정온도"
          field="ahu_set_temp"
          width="10"
          textAlign="Center"
        />
        <ColumnDirective
          headerText="리턴온도"
          field="ahu_ret_temp"
          width="10"
          textAlign="Center"
        />
        <ColumnDirective
          headerText="공급온도"
          field="ahu_sup_temp"
          width="10"
          textAlign="Center"
        />
        <ColumnDirective
          headerText="설비 외부온도"
          field="ahu_out_temp"
          width="10"
          textAlign="Center"
        />
      </ColumnsDirective>
      <Inject services={[InfiniteScroll, Sort, Filter, Group]} />
    </GridComponent>
  );
};

export default TempGrid;
