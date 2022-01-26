// import 영역

import { LeftSquareOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import HeaderLogo from "../images/header_logo.png";
import { GetUserData, Logout, PageAuth } from "./auth";
import { API_URL } from "../utils/values";

// 로그인 모달 페이지를 렌더링 해줄 함수. props를 이용해서, 해당 JSX 형태의 태그에서 보내는 값을 받아 사용한다.
export function LoginModal(props: any) {
  // header.tsx 파일에서 전달받은, stateFunction, 즉 loginModal의 값을 변경받는 useState hook의 함수를 받아서, setLoginModal 이란 이름으로 사용한다.
  const setLoginModal = props.stateFunction;
  // user_id와 password를 useState로 사용하지 않은 이유는, input의 값이 변경 될 때마다 재렌더링이 되는 이유때문에, useRef로, 해당의 값을 받아 전달하는 역할로 useRef hook을 사용.
  const user_id = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  // react-router-dom 라이브러리에서 제공하는 useHistory 함수를 이용해, 로그인 / 로그아웃 시 해당 url로 넘어가게 한다.
  const history = useHistory();

  // 로그인이 됐는 지 안됐는 지 체크하는 useState hooks 사용.
  const [logined, setLogin] = useState(false);

  // 로그인 버튼 클릭 시, user_id와 password를 서버에 보내서, 만약 error 또는 undefined 가 서버에서 보내지면 에러 message를 띄우고, 아니라면, localStorage 안에, token을 저장한다.
  function loginClickListener() {
    // console.log(password.current?.value);
    axios
      .post(
        `${API_URL}/users/signin`,
        {
          user_id: user_id.current?.value,
          password: password.current?.value,
        },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.data == "error") {
          message.error("아이디 또는 비밀번호를 확인해주세요.");
        } else if (result.data == "undefined") {
          message.error("입력란에 빈값이 존재합니다.");
        } else {
          message.success(`${result.data.resultData.nickname} 님 로그인하신 것을 환영합니다.`, 0.2).then(() => {
            localStorage.setItem("authToken", result.data.token);
            history.replace("/");
            window.location.replace("/");
            setLoginModal(false);
          });
        }
      })
      .catch((err) => {
        console.error("loginError : ", err);
      });
  }

  // 회원가입 클릭 리스너 함수
  function signUpClickListener() {
    history.replace("/signup");
    window.location.replace("/signup");
    setLoginModal(false);
  }

  // 되돌아가기 버튼 클릭 리스너 함수
  function BackbuttonClickListener() {
    setLoginModal(false);
  }

  // 로그아웃 버튼 클릭 리스너 함수
  function logoutClickListener() {
    // console.log(localStorage.getItem("user_data"));
    // let wow = JSON.parse(localStorage.getItem("user_data") || "{}");
    message.success(`로그아웃이 되었습니다. ${GetUserData().nickname}님 다시 돌아오시길 기다릴게요.`, 0.2).then(() => {
      Logout();
      setLogin(false);
      history.replace("/");
      window.location.replace("/");
      setLoginModal(false);
    });
  }

  // 현재 로그인일 경우, 아니면 로그인이지 않은 경우를 나눠서 JSX를 나눠서 return 한다.
  function LoginJSXElement(props: any) {
    if (!props.login) {
      return (
        <>
          <div className="login-modal-input-group">
            <input placeholder=" 이메일 ID를 입력하세요." type="email" ref={user_id} />
          </div>
          <div className="login-modal-input-group">
            <input placeholder=" 패스워드를 입력하세요." type="password" ref={password} />
          </div>
          <div className="login-modal-button-group">
            <button onClick={loginClickListener}>로그인</button>
            <button onClick={signUpClickListener}>회원가입</button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <button onClick={logoutClickListener} className="login-modal-logout-button">
            로그아웃
          </button>
        </>
      );
    }
  }

  // 유저 인증 함수
  PageAuth(setLogin);

  return (
    <div className="login-modal">
      <div className="login-modal-background" />
      <div className="login-modal-column">
        {logined ? (
          <>
            <img
              src={GetUserData().profileURL == "" ? HeaderLogo : GetUserData().profileURL}
              alt="x"
              style={{ borderRadius: "50%" }}
            />
            <span style={{ color: "white", marginBottom: 10, fontWeight: 800 }}>{`"${
              GetUserData().nickname
            }" 님 환영합니다.`}</span>
          </>
        ) : (
          <img src={HeaderLogo} alt="x" />
        )}
        <LoginJSXElement login={logined} />
        <Button icon={<LeftSquareOutlined />} id="login-modal-close-button" onClick={BackbuttonClickListener}>
          되돌아가기
        </Button>
      </div>
    </div>
  );
}
