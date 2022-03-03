import { LikeOutlined, MehOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Button } from "antd";
import dayjs from "dayjs";
import UserIcon from "../images/icons/user_icon.png";
import { GetUserData } from "./auth";

// videoPlayer를 보여주는 것을 JSX로 가지고 있는 함수
export function VideoPlayer(props: any) {
  const videoData = props.data; // 영상을 보여줄 비디오의 정보를 가지고 있다.

  /* 
  만약 videoData가 null 이라면, 비디오를 가져오고 있습니다... 라는 글을 보여준다.
  만약 비디오의 정보가 있다면, 해당 비디오 정보에 맞게, 제목, 정보, 조회수, 업로드 날짜, 업로드를 한 사람의 닉네임을 보여주고, videoUrl에 있는 비디오를 재생한다.
  */
  if (videoData == null) {
    return <h1>비디오를 가져오고 있습니다...</h1>;
  } else {
    return (
      <>
        <video autoPlay src={videoData.videoUrl} controls className="videoPlayer"></video>
        <div className="videoPlay-info-group">
          <h1 className="videoPlay-info-title">{videoData.title}</h1>
          <div className="videoPlay-info-divide">
            <div className="videoPlay-info-view-date">
              <span className="videoPlay-info-view">{`${videoData.view}회`}</span>
              <span style={{ fontWeight: 700, color: "gray" }}>﹒</span>
              <span className="videoPlay-info-date">{dayjs(videoData.createdAt).format("YYYY. MM. DD")}</span>
            </div>
            <VideoPlayerButtonGroups />
          </div>
          <UserInfoAndDescription
            profileUrl={videoData.profileUrl}
            nickname={videoData.nickname}
            description={videoData.description}
          />
        </div>
      </>
    );
  }
}

// 좋아요, 싫어요, 공유버튼의 JSX
function VideoPlayerButtonGroups() {
  return (
    <div className="videoPlay-info-buttonGroup">
      <Button type="primary" icon={<LikeOutlined />} onClick={LikeOnClickListener}>
        좋아요
      </Button>
      <Button type="primary" icon={<MehOutlined />} onClick={BadOnClickListener}>
        싫어요
      </Button>
      <Button type="primary" icon={<ShareAltOutlined />} onClick={ShareOnClickListener}>
        공유
      </Button>
    </div>
  );
}

// 닉네임과 구독자, 영상의 상세 정보 글의 JSX
function UserInfoAndDescription(props: any) {
  return (
    <div className="videoPlay-user-info-description-group">
      <div className="videoPlay-user-profile-img">
        <img src={props.profileUrl ? props.profileUrl : UserIcon} alt="X" />
      </div>
      <div className="videoPlay-user-profile-description">
        <span className="videoPlay-nickname">{props.nickname}</span>
        <span className="videoPlay-channel-subscribers">구독자 0명</span>
        <span dir="auto" className="videoPlay-description">
          {props.description}
        </span>
      </div>
    </div>
  );
}

function LikeOnClickListener() {
  alert("개발 예정중입니다.");
}

function BadOnClickListener() {
  alert("개발 예정중입니다.");
}

// 공유 버튼을 클릭할 경우, 해당 페이지의 주소를 복사해준다.
function ShareOnClickListener() {
  let dummy = document.createElement("input");
  let urlText = document.location.href;

  document.body.appendChild(dummy);
  dummy.value = urlText;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
  alert("현재 주소가 복사되었습니다. 복사 된 주소를 여러 친구들에게 공유해주세요.");
}
