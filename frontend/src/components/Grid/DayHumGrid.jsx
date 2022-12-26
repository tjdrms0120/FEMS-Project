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

const DayHumGrid = () => {
  const { dHumidity } = useStateContext();
  // const [humiDt, setHumiDt] = useState();

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
    }
    if (day !== "") {
      return `${year}-${month}-${day}`;
    }
    return `${year}-${month}`;
  }

  return (
    <GridComponent dataSource={dHumidity} enableInfiniteScrolling height={300}>
      <ColumnsDirective>
        <ColumnDirective
          headerText="실행시간"
          field="rundate"
          width="10"
          textAlign="Right"
          valueAccessor={StringToDateFormatter}
        />
        <ColumnDirective
          headerText="설정습도"
          field="ahu_set_hum"
          width="10"
          textAlign="Center"
        />
        <ColumnDirective
          headerText="리턴습도"
          field="ahu_ret_hum"
          width="10"
          textAlign="Center"
        />
        <ColumnDirective
          headerText="공급습도"
          field="ahu_sup_hum"
          width="10"
          textAlign="Center"
        />
        <ColumnDirective
          headerText="설비 외부습도"
          field="ahu_out_hum"
          width="10"
          textAlign="Center"
        />
      </ColumnsDirective>
      <Inject services={[InfiniteScroll, Sort, Filter, Group]} />
    </GridComponent>
  );
};

export default DayHumGrid;
