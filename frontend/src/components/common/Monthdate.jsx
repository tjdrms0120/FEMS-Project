import { React, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Monthdate = () => {
  const [startDate, setStartDate] = useState(new Date());
  const SelectDate = (date) => {
    setStartDate(date);
  };
  return (
    <div className="flex items-center">
      <span className="ml-10 w-28">조회일자</span>
      <DatePicker
        name="runDate"
        dateFormat="yyyy"
        selected={startDate}
        onChange={SelectDate}
        minDate={new Date(2021, 0)}
        maxDate={new Date(2022, 0)}
        closeOnScroll={true}
        placeholderText="날짜를 선택 해주세요"
        className="text-xl w-44 border-2 rounded-md border-solid px-5 border-slate-300"
        showYearPicker
      />
    </div>
  );
};

export default Monthdate;
