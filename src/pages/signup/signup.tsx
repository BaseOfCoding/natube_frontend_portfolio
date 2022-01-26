import "./signup.css";
import userIcon from "../../images/icons/user_icon.png";
import { message, Tooltip, Upload } from "antd";
import { useRef, useState } from "react";
import { API_URL, MEDIA_URL } from "../../utils/values";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SignUp() {
  const user_id = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const nickname = useRef<HTMLInputElement>(null);
  const [imageURL, setImageURL] = useState("");
  const [submit, setSubmit] = useState(false);
  const history = useHistory();

  const onChangeProfile = (info: any) => {
    const file = info.file;

    if (file.status == "uploading") {
      return;
    }
    if (file.status == "done") {
      console.log("done");
      const res = file.response;
      const imageURL = res.profileUrl;
      setImageURL(`${MEDIA_URL}${imageURL}`);
    }
  };

  const beforeUpload = (file: any) => {
    let typeConfirm = true;
    let splitAfterType = file.type.split("/");

    if (splitAfterType[0] != "image") {
      message.error("이미지 파일만 업로드가 가능합니다.");
      typeConfirm = false;
    }

    return typeConfirm ? true : Upload.LIST_IGNORE;
  };

  const emailChecking = (email: string) => {
    var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return email != "" && email != "undefined" && regex.test(email);
  };

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
