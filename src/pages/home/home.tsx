import "../home/home.css";
import { API_URL, tagEngValues, tagValues } from "../../utils/values";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { VideoView } from "../../props/VideoView";

function Home() {
  const [videoDatas, setVideoData] = useState([]);

  const getVideoInfo = () => {
    axios
      .get(`${API_URL}/media/videomain`)
      .then((result) => {
        const videoDatas = result.data.videoDatas;
        setVideoData(videoDatas);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const tagOnClickListener = useCallback((e) => {
    // const tag = e.target.value;
    // axios
    //   .get(`${API_URL}/media/videotag/${tag}`)
    //   .then((result) => {
    //     const videoData = result.data.videoDatas;
    //     setVideoData(videoData);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }, []);

  useEffect(() => {
    localStorage.removeItem("refresh");
    getVideoInfo();
  }, []);

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

export default Home;
