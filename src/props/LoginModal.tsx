import { LeftSquareOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import HeaderLogo from "../images/header_logo.png";
import { GetUserData, Logout, PageAuth } from "../utils/Auth";
import { API_URL } from "../utils/values";

export function LoginModal(props: any) {
  const setLoginModal = props.stateFunction;
  const user_id = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const [logined, setLogin] = useState(false);

  function loginClickListener() {
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
          message.success(`${result.data.resultData.nickname} 님 로그인하신 것을 환영합니다.`);
          history.replace("/");
          setLoginModal(false);
        }
      })
      .catch((err) => {
        console.error("loginError : ", err);
      });
  }

  function signUpClickListener() {
    // history.replace("/signup");
    // props.setState(false);
    // console.log(GetUserData().user_id);
  }

  function BackbuttonClickListener() {
    setLoginModal(false);
  }

  function logoutClickListener() {
    message.success(`로그아웃이 되었습니다. ${GetUserData().nickname}님 다시 돌아오시길 기다릴게요.`);
    Logout();
    setLogin(false);
    history.replace("/");
    setLoginModal(false);
  }

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

  PageAuth(setLogin);

  return (
    <div className="login-modal">
      <div className="login-modal-background" />
      <div className="login-modal-column">
        {logined ? (
          <img src={GetUserData().profileURL} alt="x" style={{ borderRadius: 100 }} />
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
