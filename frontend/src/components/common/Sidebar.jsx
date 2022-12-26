import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { links } from "../../data/dummy";
import { useStateContext } from "../../context/UserContext";
import { ImageStore } from "../../assets/images";
const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();
  const { S3_URL, mainleftlogo } = ImageStore;
  // 창 닫기?
  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";
  return (
    /*overflow: hidden
  overflow 의 값을 hidden 으로 설정하면, 부모요소의 범위를 넘어가는 자식요소의 부분은 보이지 않도록 처리 합니다.*/
    /*overflow: auto
overflow 의 값을 auto 로 설정할 경우 부모요소의 범위를 넘어가는 자식요소의 부분이 있을 경우 해당 부분을 보이지 않도록 처리하고, 사용자가 해당 부분을 확인 할 수 있도록 스크롤바를 표시 합니다.*/
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 ">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center ml-8">
            <Link
              to="/"
              onClick={handleCloseSideBar} // useStateContext 사용하고
              className="items-center gap-3 ml-3 mt-4 flex text-xl tracking-tight dark:text-white text-slate-700"
            >
              <img
                className="w-40 h-20"
                src={`${S3_URL}${mainleftlogo}`}
                alt="leftlogo2"
              />
              {/* <span>AMS</span> */}
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                className="text-2xl mt-6 mr-5 hover:bg-light-gray md:hidden block rounded-full"
                type="button"
                onClick={() => setActiveMenu((preActiveMenu) => !preActiveMenu)}
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-1">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-500 m-3 mt-4 uppercase flex items-center text-lg">
                  {item.titleIcon}
                  <span className="p-1">{item.title}</span>
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })} // 이걸 주면 Nav에 색 적용됨
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Sidebar;
