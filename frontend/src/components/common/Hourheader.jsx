import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import styled from "styled-components"; //install => npm i styled-components
import { useStateContext } from "../../context/UserContext";
import Hourdate from "./Hourdate";
import { OPTIONS } from "../../data/dummy";

// basic template https://github.com/toy-crane/make-select-box/blob/master/src/App.js

// api 주소
const SERVER_URL = "/Get_AHU_temp_Hourly_Data";

// 셀렉트 박스
const SelectBoxWrapper = styled.div`
  display: flex;
`;

export const Select = styled.select`
  margin: 0;
  width: 180px;
  font-size: 24px;
  max-width: 100%;
  display: block;
  font-weight: bold;
  padding: 2px 8px;
  outline: none;
  line-height: inherit;
  border-bottom: 1px solid gray;
  color: rgb(30, 108, 235);
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &:focus {
    border-color: gray;
  }
`;

const IconSVG = styled.svg`
  align-self: center;
  width: 24px;
  height: 24px;
`;

const SelectBox = (props) => {
  const handleChange = (e) => {
    // event handler
    // console.log(e.target.value);
  };

  return (
    <SelectBoxWrapper>
      <Select onChange={handleChange} name="ahu_id">
        {props.options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            defaultValue={props.defaultValue === option.value}
          >
            {option.name}
          </option>
        ))}
      </Select>
      <IconSVG
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 14L16 6H4L10 14Z"
          fill="#1A1A1A"
        />
      </IconSVG>
    </SelectBoxWrapper>
  );
};

// 시간별 온도 차트
const Hourheader = () => {
  // 시간별 전력량 공조기 ID와 날짜 (삭제 예정)
  const [startDate, setStartDate] = useState({});
  const { setHTempDt } = useStateContext();

  // 클릭시 공조기 ID와 시간정보 출력
  const electricHandleSubmit = async (e) => {
    e.preventDefault();
    const {
      ahu_id: { value: SelectBox },
      runDate: { value: Hourdate },
    } = e.target;

    // console.log(e.target);

    const ParseHourDate = Hourdate.replaceAll("/", "");

    await setStartDate({
      ahu_id: SelectBox,
      runDate: ParseHourDate,
    });
    // 첫번째 {} -> {ahu_id: 'A00', runDate: '20220901'}
    // console.log(startDate);
  };

  // set 부분을 useEffect로

  const notInitialRender = useRef(false);

  useEffect(() => {
    if (notInitialRender.current) {
      const fetchData = async (idDate) => {
        const response = await axios.get(SERVER_URL, {
          params: {
            ahu_id: `${idDate.ahu_id}`,
            runDate: `${idDate.runDate}`,
          },
        });
        setHTempDt(response.data);
      };

      fetchData(startDate);
    } else {
      notInitialRender.current = true;
    }
  }, [startDate, setHTempDt]);

  // 검색으로 생긴 데이터로 api 호출

  return (
    <div className=" flex  md:m-5  custom:m-5 mt-24 p-1 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <form
        onSubmit={electricHandleSubmit}
        className="flex items-center justify-between rounded-lg w-full ml-2 font-bold"
      >
        <SelectBox options={OPTIONS} defaultValue="공조기01"></SelectBox>
        <span className="">클린룸: 1F A존</span>
        <span className="">설치장소: B2F 기계실</span>
        <div className="flex">
          <Hourdate name="runDate" />
          <button
            type="submit"
            S
            className="pointer w-32 h-auto text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 transition focus:ease-in-out rounded-md"
          >
            검색
          </button>
        </div>
      </form>
    </div>
  );
};

export default Hourheader;
