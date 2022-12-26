import "remixicon/fonts/remixicon.css";
import React, { useState } from "react";
import ErrorMessage from "../common/ErrorMessage";
import { useStateContext } from "../../context/UserContext";
import LoadingSpinner from "./LoadingSpinner";
import { ImageStore } from "../../assets/images";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [hiddenPass, setHiddenPass] = useState({
    type: "password",
    visible: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken, setLogin } = useStateContext();

  const handlePasswordType = (e) => {
    setHiddenPass(() => {
      if (!hiddenPass.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };
  // 로그인 정보 백으로 보내고 토큰 받아오기
  const submitLogin = async () => {
    setIsLoading(true);

    setLogin(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(
        `grant_type=&username=${id}&password=${password}&scope=&client_id=&client_secret=`
      ),
    };
    const response = await fetch("/login", requestOptions);
    const data = await response.json();

    // 백에서 받아온 에러 메세지
    if (!response.ok) {
      setIsLoading(false);
      setErrorMessage(data.detail);
    } else {
      setIsLoading(false);
      setToken(data.access_token);
    }
  };

  // 로그인 시도
  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  const { S3_URL, login } = ImageStore;
  return (
    <div className="container laptop:h-screen laptop:grid laptop:place-items-center ">
      {isLoading && <LoadingSpinner asOverlay />}
      <div
        className="login__content grid relative w-screen h-screen place-items-center laptop:w-1280 laptop:h-600
      desktop:h-700"
      >
        <img
          className="absolute w-full h-full object-cover object-center  rounded-3xl
          shadow-xl"
          src={`${S3_URL}${login}`}
          alt="login-img"
          priority="true"
        />
        {/* 로그인 박스 상위항목 */}
        <form
          className="login__form grid relative bg-slate-50 border-2 border-solid m-auto p-6
        rounded-2xl md:w-96 md:justify-self-center justify-self-end mr-16
        desktop:p-12 desktop:rounded-3xl desktop:border-2 desktop:border-solid
        "
          onSubmit={handleSubmit}
        >
          <div>
            <h1 className="login__title text-black-800 text-xl font-bold mb-2">
              <span className="text-blue-700">Welcome</span> Fems Service
            </h1>
            <p className="login__description text-base mb-3 ">
              Fems 서비스에 로그인하세요
            </p>
          </div>
          <div>
            <div className="login__inputs grid gap-y-3 mb-2">
              {/* ID 박스 */}
              <div>
                <label forhtml="" className="block text-black font-bold mb-2">
                  ID
                </label>
                <input
                  type="text"
                  value={id}
                  className="w-full px-3 py-4 rounded-md border-2 border-solid text-14 text-bold delay-500
                  placeholder:text-slate-400 focus:border-indigo-700 valid:border-indigo-700 placeholder:italic"
                  placeholder="input your ID"
                  required
                  onChange={(e) => setId(e.target.value)}
                ></input>
              </div>
              {/* 패스워드박스 */}
              <div>
                <label className="block text-black font-bold mb-2 ">
                  PassWord
                </label>
                <div className="login__box relative mb-7 ">
                  <input
                    type={hiddenPass.type}
                    className="w-full px-3 py-4 rounded-md border-2 border-solid text-14 text-bold delay-50
                  placeholder:text-slate-400 focus:border-indigo-700 valid:border-indigo-700 placeholder:italic"
                    placeholder="input your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  ></input>
                  <i
                    className="ri-eye-off-line w-max h-max absolute right-3 top-0 bottom-0 m-auto text-xl cursor-pointer"
                    id="input-icon"
                    onClick={handlePasswordType}
                  ></i>
                </div>
              </div>
            </div>
          </div>
          {/* 아이디 비번 틀릴 시 틀리면 에러메세지 */}
          <ErrorMessage message={errorMessage} />
          <br />
          {/* 로그인 버튼 박스 */}
          <div>
            <div className="login__buttons flex gap-x-3">
              <button
                className="login__button w-full py-3 px-8 rounded-md bg-blue-500 
              text-lg text-white shadow-indigo-600/50 cursor-pointer font-semibold font-body
              hover:bg-blue-600 focus:scale-95 transition duration-150 ease-in-out"
                type="submit"
              >
                Log IN
              </button>
            </div>
          </div>
        </form>
      </div>
      <span className="text-xs opacity-60">Designed by Jcomp / Freepik</span>
    </div>
  );
};

export default Login;
