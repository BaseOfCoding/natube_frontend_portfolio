// import 영역
import "./signup.css";
import userIcon from "../../images/icons/user_icon.png";
import { message, Tooltip, Upload } from "antd";
import { useRef, useState } from "react";
import { API_URL, MEDIA_URL } from "../../utils/values";
import axios from "axios";
import { useHistory } from "react-router-dom";

// 회원가입 페이지를 렌더링 하는 함수
function SignUp() {
  // useState를 사용하면, useState가 변경이 되면서, 재렌더링을 하기 때문에, 전부 입력되었을 때의 값만 있으면 되서, useRef 훅을 사용해서 해당 값만 빼오게 하기 위해 사용. 그리고 각각의 input에 추가.
  const user_id = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const nickname = useRef<HTMLInputElement>(null);

  // 프로필 imageURL 변수와, 가입 버튼을 두 번 누르게 하는 것을 방지하기 위한 변수, react-router-dom에서 제공하는 useHistory 함수를 선언
  const [imageURL, setImageURL] = useState("");
  const [submit, setSubmit] = useState(false);
  const history = useHistory();

  // 프로필 이미지를 업로드 할 때 사용되는 onChange 속성 함수, file이 업로드가 완료된다면, imageURL에 해당 프로필이 저장된 url로 변경한다.
  const onChangeProfile = (info: any) => {
    const file = info.file;

    if (file.status == "uploading") {
      return;
    }
    if (file.status == "done") {
      console.log("done");
      const res = file.response;
      const imageURL = res.profileUrl;
      setImageURL(imageURL);
    }
  };

  // 프로필 이미지를 업로드하기 전에, 만약 image 파일이 맞는 지 아닌 지를 확인한다.
  const beforeUpload = (file: any) => {
    let typeConfirm = true;
    let splitAfterType = file.type.split("/");

    if (splitAfterType[0] != "image") {
      message.error("이미지 파일만 업로드가 가능합니다.");
      typeConfirm = false;
    }

    return typeConfirm ? true : Upload.LIST_IGNORE;
  };

  // email 형식인 지 아닌 지를 체크한다.
  const emailChecking = (email: string) => {
    var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return email != "" && email != "undefined" && regex.test(email);
  };

  /* 
  가입 버튼을 클릭했을 때 실행되는 함수, 1차로 빈칸이 있는 지를 검사하고, 2차로 패스워드와 패스워드 확인의 값이 맞는 지를 체크하고,
  3차로, 이메일 형식인지 아닌지를 체크, 다 맞다면 서버에서 아이디와 닉네임이 중복되었는 지를 체크한뒤, 다 검사 완료 되었을 때 회원가입이 된다.
  */
  const signUpSubmit = () => {
    setSubmit(true);
    if (
      !user_id.current?.value ||
      !password.current?.value ||
      !confirmPassword.current?.value ||
      !nickname.current?.value
    ) {
      setSubmit(false);
      message.error("빈칸이 존재합니다.");
      return;
    }

    if (password.current?.value != confirmPassword.current?.value) {
      message.error("비밀번호가 틀렸습니다. 비밀번호가 맞는 지 확인 부탁드립니다.");
      setSubmit(false);
      return;
    }

    if (!emailChecking(user_id.current?.value || "")) {
      setSubmit(false);
      message.error("이메일 입력 형식이 잘못 됐습니다.");
      return;
    }

    axios
      .post(`${API_URL}/users/signup`, {
        user_id: user_id.current?.value,
        password: password.current?.value,
        nickname: nickname.current?.value,
        profileUrl: imageURL != "" ? imageURL : null,
      })
      .then((result) => {
        if (result.data == "id_duplicate") {
          message.error("아이디가 이미 존재합니다.");
          setSubmit(false);
        } else if (result.data == "nickname_duplicate") {
          message.error("닉네임이 이미 존재합니다.");
          setSubmit(false);
        } else {
          setSubmit(false);
          message.success(`'${result.data.nickname}'님 회원가입이 완료되었습니다.`);
          history.replace("/");
        }
      })
      .catch((error) => {
        setSubmit(false);
        console.log(error);
        message.error("error", error);
      });
  };

  return (
    <div className="signup-body">
      <div className="signup-center">
        <span className="signup-input-title">프로필</span>
        <Tooltip title="클릭해서 이미지를 업로드해주세요." color={"blue"} key={"blue"}>
          <Upload
            name="image"
            beforeUpload={beforeUpload}
            action={`${API_URL}/uploads/profileImages`}
            listType="picture"
            showUploadList={false}
            maxCount={1}
            onChange={onChangeProfile}
          >
            <img className="signup-profileImg" src={imageURL != "" ? imageURL : userIcon} alt="x" />
          </Upload>
        </Tooltip>

        <div className="signup-inputGroup">
          <span className="signup-input-title">아이디 입력</span>
          <input className="signup-input" type="email" ref={user_id} placeholder="이메일로 입력해주세요." />
        </div>

        <div className="signup-inputGroup">
          <span className="signup-input-title">패스워드 입력</span>
          <input className="signup-input" type="password" ref={password} placeholder="패스워드를 입력해주세요." />
        </div>

        <div className="signup-inputGroup">
          <span className="signup-input-title">패스워드 확인</span>
          <input
            className="signup-input"
            type="password"
            ref={confirmPassword}
            placeholder="한번 더 패스워드를 입력해주세요."
          />
        </div>

        <div className="signup-inputGroup">
          <span className="signup-input-title">닉네임 입력</span>
          <input className="signup-input" type="text" ref={nickname} placeholder="닉네임을 입력해주세요." />
        </div>

        <button className="signup-submit" onClick={signUpSubmit} disabled={submit ? true : false}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default SignUp;
