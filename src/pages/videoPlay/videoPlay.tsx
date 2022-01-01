import { VideoPlayer } from "../../props/VideoPlayer";
import "./videoPlay.css";
import axios from "axios";
import { API_URL } from "../../utils/values";
import { useEffect, useState } from "react";
import { VideoRecommendation } from "../../props/VideoRecommendation";

function VideoPlay(props: any) {
  const id = props.match.params.id;
  const [video, setVideo] = useState(null);
  const [recommendationVideo, setRecommendationVideo] = useState([]);

  const viewUpdate = () => {
    axios
      .get(`${API_URL}/viewupdate/${id}`)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getVideo = () => {
    axios
      .get(`${API_URL}/videoGet/${id}`)
      .then((result) => {
        setVideo(result.data.videoData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getRecommendationVideo = () => {
    axios
      .get(`${API_URL}/videoGet/${id}/recommendation`)
      .then((result) => {
        setRecommendationVideo(result.data.videoDatas);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  window.onbeforeunload = () => {
    localStorage.setItem("refresh", "true");
  };

  window.onpopstate = () => {
    localStorage.clear();
  };

  useEffect(() => {
    let tempItem = localStorage.getItem("refresh");
    let refresh: boolean = false;
    if (tempItem == "true") {
      refresh = true;
    }
    if (!refresh) {
      viewUpdate();
    }
    getVideo();
    getRecommendationVideo();
  }, [id]);

  return (
    <>
      <div className="videoPlay-body">
        <div className="videoPlay-center">
          <VideoPlayer data={video} />
        </div>
        <div className="videoPlay-side">
          {recommendationVideo.map((data, index) => {
            return <VideoRecommendation data={data} index={index} />;
          })}
        </div>
      </div>
    </>
  );
}

export default VideoPlay;
