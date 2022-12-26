import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../../context/UserContext";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full m-1 p-1 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    setActiveMenu,
    screenSize,
    setScreenSize,
    currentColor,
    token,
    setToken,
    currentMode,
  } = useStateContext();

  const handleLogout = () => {
    setToken(null);
  };

  //스크린 사이즈에 따라 동작하기 , 계속 감지하지 않고, 특정 기준점을 만들어줘서 거기서만 감지되게?
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []); // [] 안에 아무것도 안넣으면 최초 실행시만 실행

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="flex justify-between p-2 md:mx-6 relative bg-white rounded-b-lg dark:bg-secondary-dark-bg">
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <TooltipComponent content="profile" position="BottomCenter">
          <div className="flex items-center gap-2 cursor-pointer m-3 hover:bg-light-gray rounded-lg">
            <p>
              <span className="text-gray-400 text-14">Hi, </span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">JUN</span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        <div className="has-text-center m-1">
          <h1>
            FEMS
            {token && (
              <button
                className="rounded-md border-2 border-solid border-gray-300 ml-3 p-1 hover:bg-blue-500 duration-150 ease-in-out"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </h1>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
