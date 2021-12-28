import { VideoPlayer } from "../../props/VideoPlayer";
import "./videoPlay.css";

function VideoPlay() {
  return (
    <>
      <div className="videoPlay-body">
        <div className="videoPlay-center">
          <VideoPlayer />
        </div>
        <div className="videoPlay-side"></div>
      </div>
    </>
  );
}

export default VideoPlay;
