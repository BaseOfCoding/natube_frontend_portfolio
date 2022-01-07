import { LeftSquareOutlined } from "@ant-design/icons";
import { Button } from "antd";
import HeaderLogo from "../images/header_logo.png";

export function LoginModal() {
  function LoginEmailOnChange(e: any) {}

  function PasswordOnChange(e: any) {}

  function loginClickListener() {
    // axios
    //   .post(
    //     `${API_URL}/loginCheck`,
    //     {
    //       user_id: user_id,
    //       password: password,
    //     },
    //     { withCredentials: true }
    //   )
    //   .then((result) => {
    //     if (result.data == "error") {
    //       message.error("아이디 또는 비밀번호를 확인해주세요.");
    //     } else if (result.data == "undefined") {
    //       message.error("입력란에 빈값이 존재합니다.");
    //     } else {
    //       UserSaveData(result.data.resultData);
    //       message.success(`${result.data.resultData.nickname} 님 로그인하신 것을 환영합니다.`);
    //       history.replace("/");
    //       props.setState(false);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("loginError : ", err);
    //   });
  }

  function signUpClickListener() {
    // history.replace("/signup");
    // props.setState(false);
  }

  function BackbuttonClickListener() {
    // props.setState(false);
  }

  return (
    <div className="login-modal">
      <div className="login-modal-background" />
      <div className="login-modal-column">
        <img src={HeaderLogo} alt="x" />
        <div className="login-modal-input-group">
          <input placeholder=" 이메일 ID를 입력하세요." type="email" onChange={LoginEmailOnChange} />
        </div>
        <div className="login-modal-input-group">
          <input placeholder=" 패스워드를 입력하세요." type="password" onChange={PasswordOnChange} />
        </div>
        <div className="login-modal-button-group">
          <button onClick={loginClickListener}>로그인</button>
          <button onClick={signUpClickListener}>회원가입</button>
        </div>
        <Button icon={<LeftSquareOutlined />} id="login-modal-close-button" onClick={BackbuttonClickListener}>
          되돌아가기
        </Button>
      </div>
    </div>
  );
}
