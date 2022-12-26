import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../context/UserContext";
import { Hourheader } from "../components";

const Test = () => {
  const { tempDt } = useStateContext();
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const current = (
      <div>
        {tempDt.map((todo) => (
          <div key={todo.rundate} style={{ display: "flex" }}>
            <div>
              <p>
                공조기 ID : {todo.ahu_id}
                <br />
                실행시간 : {todo.rundate}
                <br />
                설정온도 : {todo.ahu_set_temp}
                <br />
                리턴온도 : {todo.ahu_ret_temp}
                <br />
                공급온도 : {todo.ahu_sup_temp}
                <br />
                설비 외부온도 : {todo.ahu_out_temp}
              </p>
              <p>{todo.inv_kWh}</p>
            </div>
          </div>
        ))}
      </div>
    );
    setCurrent(current);
  }, [tempDt]);

  return (
    <div className="Test">
      <Hourheader />
      {current}
    </div>
  );
};
export default Test;
