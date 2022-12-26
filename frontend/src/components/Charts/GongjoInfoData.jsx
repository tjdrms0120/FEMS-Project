import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
  InfiniteScroll
} from "@syncfusion/ej2-react-grids";

import "./Gongjoinfo.css";
import { customersGrid } from "../../data/dummy";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Customers = () => {
  const SERVER_URL = "Get_AHU_Info";

  const [gongjoInfo, setGongjoInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(SERVER_URL);
      setGongjoInfo(response.data);
    };

    fetchData();
  }, []);

  return (
    <GridComponent
      id="grid"
      dataSource={gongjoInfo}
      // {/* allowPaging = 페이지 매김 */}
      allowSorting
      toolbar={["Search"]}
      editSettings={{ allowEditing: false }}
      width="auto"
      enableInfiniteScrolling
  >
      <ColumnsDirective>
        {customersGrid.map((item, index) => (
          <ColumnDirective key={index} {...item} />
        ))}
      </ColumnsDirective>
      <Inject services={[ Sort, Toolbar, Edit, Filter,InfiniteScroll]} />
    </GridComponent>
  );
};

export default Customers;
