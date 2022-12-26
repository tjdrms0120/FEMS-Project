import React from "react";
import { NavLink } from "react-router-dom";
import { ImageStore } from "../../assets/images";

const Welcompage = () => {
  const { S3_URL, welcome, Mainlogo } = ImageStore;
  return (
    <div className="welcome relative w-full h-full z-0">
      <div className="w-full flex justify-center">
        <div className="absolute h-64 w-full top-3/4 flex items-center justify-around mt-10 ">
          <div
            className="button bg-light-mint rounded-lg cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#4AC4D9,0_0px_0_0_#1b70f841]
    active:border-b-[0px]
    transition-all duration-200 [box-shadow:0_10px_0_0_#4AC4D9,0_15px_0_0_#1b70f841]
    border-b-[1px] border-mint
    transform
    flex text-center text-lg w-52 h-52
  "
          >
            <NavLink to={"/전력 예측"} key={"welcome"}>
              <img
                className="transition-all bg-wh rounded-xl invert brightness-0"
                src={`${S3_URL}${Mainlogo}`}
                priority="true"
                alt="Mainlogo"
              />
              <span className="text-white m-0 p-0 absolute bottom-2 left-12 text-2xl"></span>
            </NavLink>
          </div>
          <div className=" w-7/12 h-full flex flex-col justify-center">
            <div>
              <table className="w-full h-full">
                <thead>
                  <tr className="border-b-2 border-solid border-bluedarkgray">
                    <th className="text-left text-3xl pb-2 pl-3 text-[#453e67]">
                      공지사항
                    </th>
                  </tr>
                </thead>
                <tbody className=" border-solid border-slate-800">
                  <tr>
                    <td class="pt-2 p-1 text-slate-600 text-lg">
                      • FEMS 서비스에 오신 걸 환영합니다!{" "}
                    </td>
                  </tr>
                  <tr>
                    <td class="p-1 text-slate-600 text-lg">• </td>
                  </tr>
                  <tr>
                    <td class="p-1 text-slate-600 text-lg">•</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <img
        className="BG-IMG absolute w-full h-88vh -z-20 rounded-3xl"
        alt="Mainimg"
        src={`${S3_URL}${welcome}`}
      />
    </div>
  );
};

export default Welcompage;
