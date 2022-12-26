import React from "react";
import { ElectricPr, GongjoCompare } from "../../components";
import { Header } from "../../components";
import "./Mainpage.css";

const MainPage = () => {
  return (
    <div>
      <div className="w-full mx-4 my-2 md:m-2 px-10 py-5 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <Header category="MainPage" title="전년도 대비 전력량" />
        <div className=" dark:bg-secondary-dark-bg">
          <ElectricPr />
        </div>
      </div>
      <div className="w-full m-4 md:m-2 px-10 py-5 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <Header category="" title="예상 전력 소비량" />
        <div className="flex w-full dark:bg-secondary-dark-bg">
          <GongjoCompare />
        </div>
      </div>
    </div>
  );
};
export default MainPage;
