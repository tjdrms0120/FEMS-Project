import React, { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import { useStateContext } from "./context/UserContext";
import { UnProtectedRoutes, ProtectedRoutes } from "./components";

const App = () => {
  const { token, login } = useStateContext();
  const [currentRoute, setCurrentRoute] = useState(null);

  // 첫 실행 시 화면 = 토큰 없으면 ? 로그인 페이지 : 있으면 .. 서비스 페이지
  useLayoutEffect(() => {
    const currentRoutes = !token ? <UnProtectedRoutes /> : <ProtectedRoutes />;
    setCurrentRoute(currentRoutes);
  }, [token]);

  return <div className="column m-0 p-0 w-full h-full">{currentRoute}</div>;
};

export default App;
