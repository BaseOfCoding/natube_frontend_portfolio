import "../home/home.css";
import { API_URL, tagEngValues, tagValues } from "../../utils/values";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { VideoView } from "../../props/VideoView";

function Home() {
  const [videoDatas, setVideoData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/videomain`)
      .then((result) => {
        const videoDatas = result.data.videoDatas;
        setVideoData(videoDatas);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="home-body">
        <div className="home-side" />
        <div className="home-center">
          <TagSelect />
          <div className="home-videoView-group">
            {videoDatas.map((data, index) => {
              return <VideoView data={data} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

const tagOnClickListener = (e: any) => {
  console.log(e.target.value);
};

const videoOnClickListener = (e: any) => {
  console.log(e.target.value);
};

function TagSelect() {
  return (
    <div className="home-button-group">
      {tagValues.map((tag, index) => {
        return (
          <button value={tagEngValues[index]} key={index} onClick={tagOnClickListener}>
            {tag}
          </button>
        );
      })}
    </div>
  );
}

export default Home;
