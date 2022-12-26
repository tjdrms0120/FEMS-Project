import React from "react";
import { GongjoInfoData } from "../../components";
import Header from "../../components/common/Header";

const GongjoInfo = () => {
  return (
    <>
      <div className="m-4 md:m-2 mt-24 p-5 w-auto bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <Header category="메인" title="설비 정보" />
        <GongjoInfoData />
      </div>
    </>
  );
};

export default GongjoInfo;
