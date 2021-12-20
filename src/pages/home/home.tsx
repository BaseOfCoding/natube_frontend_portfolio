import "../home/home.css";
import { tagValues } from "../../utils/values";

function Home() {
  return (
    <>
      <div className="home-body">
        <div className="home-side" />
        <div className="home-center">
          <TagSelect />
          <VideoView />
        </div>
      </div>
    </>
  );
}

function TagSelect() {
  return (
    <div className="home-button-group">
      {tagValues.map((tag, index) => {
        return <button key={index}>{tag}</button>;
      })}
    </div>
  );
}

function VideoView() {
  return (
    <div className="home-videoView-group">
      <div className="video-group">
        <img className="thumbnail-image" src="images/natube_icon.png" alt="X" />
        <div className="video-media-info-group">
          <img className="profile-image" src="images/natube_icon.png" alt="X" />
          <div className="video-info">
            <span className="video-title">zfsdsadas</span>
            <span className="video-uploader">정민</span>
            <div className="video-upload-and-date">
              <span className="video-upload-view">1.1만회</span>
              <span style={{ fontSize: 14, fontWeight: 900, color: "gray" }}>﹒</span>
              <span className="video-upload-date">3일전</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
