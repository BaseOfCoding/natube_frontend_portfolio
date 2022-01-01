import { LikeOutlined, MehOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Button } from "antd";
import dayjs from "dayjs";
import UserIcon from "../images/icons/user_icon.png";

export function VideoPlayer(props: any) {
  const videoData = props.data;

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
          <UserInfoAndDescription nickname={videoData.nickname} description={videoData.description} />
        </div>
      </>
    );
  }
}

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

function UserInfoAndDescription(props: any) {
  return (
    <div className="videoPlay-user-info-description-group">
      <div className="videoPlay-user-profile-img">
        <img src={UserIcon} alt="X" />
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
