import "../home/home.css";
import { tagValues } from "../../utils/values";

function Home() {
  return (
    <>
      <div className="home-body">
        <div className="home-side" />
        <div className="home-center">
          <TagSelect />
          {/* <VideoView /> */}
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
      </div>
      <div className="video-group">
        <img className="thumbnail-image" src="images/natube_icon.png" alt="X" />
      </div>
      <div className="video-group">
        <img className="thumbnail-image" src="images/natube_icon.png" alt="X" />
      </div>
      <div className="video-group">
        <img className="thumbnail-image" src="images/natube_icon.png" alt="X" />
      </div>
    </div>
  );
}

export default Home;
