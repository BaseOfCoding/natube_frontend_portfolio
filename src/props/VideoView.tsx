import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);
dayjs.locale("ko");

// jsx prop

export function VideoView(props: any) {
  const videoData = props.data;
  return (
    <Link className="home-video-link" to={`/videoplay/${videoData.id}`}>
      <div className="video-group">
        <img className="thumbnail-image" src={videoData.thumbnailUrl} alt="X" />
        <div className="video-media-info-group">
          <img
            className="profile-image"
            src={videoData.profileUrl != null ? videoData.profileUrl : "images/icons/user_icon.png"}
            alt="X"
          />
          <div className="video-info">
            <span className="video-title">{videoData.title}</span>
            <span className="video-uploader">{videoData.nickname}</span>
            <div className="video-upload-and-date">
              <span className="video-upload-view">{ViewToCalculateString(videoData.view)}</span>
              <span style={{ fontSize: 14, fontWeight: 900, color: "gray" }}>﹒</span>
              <span className="video-upload-date">{dayjs(videoData.updatedAt).fromNow()}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ViewToCalculateString(view: number): string {
  let firstDigit: number;

  if (view >= 100000000) {
    firstDigit = view / 100000000;
    return `${firstDigit}억 회`;
  } else if (view >= 10000 && view >= 100000) {
    firstDigit = view / 10000;
    return `${firstDigit}만 회`;
  } else if (view >= 10000 && view < 100000) {
    firstDigit = view / 10000;
    return `${firstDigit}만 회`;
  }

  return `${view}회`;
}
