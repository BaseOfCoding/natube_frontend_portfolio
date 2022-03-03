// import 영역
import "./videoUpload.css";
import "antd/dist/antd.css";
import { Select, Input, Button, Divider, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { API_URL, tagEngValues, tagValues } from "../../utils/values";
import axios from "axios";
import { useHistory } from "react-router";
import { VideoUploadEachDivide } from "../../props/VideoUploadEachDivide";
import { MediaUploadForm } from "../../props/MediaUploadForm";
import { GetUserData, PageAuth } from "../../props/auth";

// antd에서, option select를 사용하기 위해 선언
const { Option } = Select;

// 비디오 업로드 페이지
function VideoUploadPage() {
  // 비디오 url, 썸네일 url, 타이틀, 영상 상세 정보, 태그, 닉네임을 담을 변수와 변경 함수
  const [video, setVideo] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [nickname, setNickname] = useState("");

  // 로그인이 되었는 지 체크할 변수
  const [logined, setLogin] = useState(false);

  // 비로그인 시, 이상한 영상을 올린 사람을 방지하기 위해, ip주소를 받아온다.
  const [ip, setIP] = useState("");

  // react-router에서 제공하는 useHistory 함수를 history라는 변수에 대입. 이 변수로 쉽게 페이지 이동을 한다.
  const history = useHistory();

  // input에서, 타이틀 제목을 입력할 경우, setTitle 함수에, 대입해서 title에 대입
  const titleOnChange = (e: any) => {
    setTitle(e.target.value);
  };

  // 이것도 위 함수와 마찬가지이다.
  const descriptionOnChange = (e: any) => {
    setDescription(e.target.value);
  };

  // tag가 변경되었을 경우, setTag에 선택된 태그로 교체한다.
  const tagOnChange = (e: any) => {
    setTag(e);
  };

  // titleOnChange와 같은 방식
  const nicknameOnChange = (e: any) => {
    setNickname(e.target.value);
  };

  // IP를 가져온다. geolocation 이란 것을 이용하면, IPv4 버전의 ip와, 영상이 업로드 된 도시에 대한 정보들이 나오는데, 그것들을 ip 변수에 넣어준다.
  function getIP() {
    axios.get("https://geolocation-db.com/json/").then((result) => {
      const locationIp = result.data;
      setIP(`${locationIp.IPv4} : ${locationIp.city} : ${locationIp.country_code} : ${locationIp.country_name}`);
    });
  }

  /* 
  비디오 업로드 하기 버튼을 클릭 했을 경우, 빈칸이 있는 지 체크하고
  빈칸이 없다면 업로드를 한다.
  */
  const uploadConfirm = () => {
    if (!video || !thumbnail || !title || !description || !tag || (!logined && !nickname)) {
      message.error("빈칸이 있습니다. 빈칸을 입력해주세요.", 1.0);
    } else {
      axios
        .post(`${API_URL}/uploads/videouploads`, {
          videoUrl: video,
          thumbnailUrl: thumbnail,
          title: title,
          description: description,
          tag: tag,
          nickname: logined ? GetUserData().nickname : nickname,
          view: 0,
          profileUrl: logined ? GetUserData().profileURL : null,
          userIP: logined ? GetUserData().user_id : ip,
        })
        .then((res) => {
          message.success("업로드 완료", 3.0);
          history.replace("/");
        })
        .catch((err) => {
          console.error(err.message);
          message.error("업로드에 문제가 생겼습니다.");
        });
    }
  };

  // 인증 관련 함수
  PageAuth(setLogin);

  // IP를 가져온다.
  getIP();

  return (
    <>
      <div className="video-upload">
        <Divider />
        <VideoUploadEachDivide
          title="1. 비디오 업로드"
          htmlTag={
            <MediaUploadForm
              mediaFile="video"
              setState={setVideo}
              url_folder="videos"
              upload_text="영상"
              type_text="비디오"
              accept="video/*"
            />
          }
        />
        <VideoUploadEachDivide
          title="2. 썸네일 업로드"
          htmlTag={
            <MediaUploadForm
              mediaFile="image"
              setState={setThumbnail}
              url_folder="thumbnails"
              upload_text="썸네일"
              type_text="이미지"
              accept="image/*"
            />
          }
        />
        <VideoUploadEachDivide
          title="3. 제목 입력"
          htmlTag={
            <Input.TextArea
              onChange={titleOnChange}
              id="video-title"
              placeholder="제목을 입력해주세요."
              size="middle"
              maxLength={100}
            />
          }
        />
        <VideoUploadEachDivide
          title="4. 비디오 설명 입력"
          htmlTag={
            <Input.TextArea
              onChange={descriptionOnChange}
              id="video-description"
              placeholder="설명을 입력해주세요."
              size="middle"
              maxLength={1000}
            />
          }
        />
        <div className="video-info-group">
          <div className="video-info-each-title">
            <span className="contents-span">5. 태그 선택</span>
          </div>
          <div className="video-info-each-htmlTag">
            <Select defaultValue="" style={{ width: "90%" }} onChange={tagOnChange}>
              {tagValues.map((tag, index) => {
                if (index != 0) {
                  return <Option value={tagEngValues[index]}>{tag}</Option>;
                }
              })}
            </Select>
          </div>
        </div>
        <Divider />
        <VideoUploadEachDivide
          title="6. 닉네임 입력"
          htmlTag={
            <Input.TextArea
              value={logined ? GetUserData().nickname : undefined}
              onChange={nicknameOnChange}
              id="video-nickname"
              placeholder="닉네임을 입력해주세요. (최대 20자까지 입력가능 합니다.)"
              size="middle"
              maxLength={20}
              disabled={logined ? true : false}
            />
          }
        />
        <Divider />
        <div className="video-upload-button-group">
          <Button onClick={uploadConfirm} type="primary" icon={<SaveOutlined />} htmlType="submit">
            비디오 업로드 하기
          </Button>
        </div>
        <Divider />
      </div>
    </>
  );
}

export default VideoUploadPage;
