import { React, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Hourdate = () => {
  const [startDate, setStartDate] = useState(new Date(2022, 8, 1));

  const SelectDate = (date) => {
    setStartDate(date);
  };

  // Thu Dec 01 2022 15:54:41 GMT+0900 (한국 표준시) 형태

  return (
    <div className="flex items-center">
      <span className="ml-10 w-28">조회일자</span>
      <DatePicker
        name="runDate"
        dateFormat="yyyy/MM/dd"
        selected={startDate}
        onChange={SelectDate}
        minDate={new Date(2021, 1, 5)}
        maxDate={new Date(2022, 9, 25)}
        closeOnScroll={true}
        className="text-xl w-44 border-2 rounded-md border-solid px-5 border-slate-300"
      />
    </div>
  );
};

export default Hourdate;
