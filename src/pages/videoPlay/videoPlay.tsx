import { VideoPlayer } from "../../props/VideoPlayer";
import "./videoPlay.css";
import axios from "axios";
import { API_URL } from "../../utils/values";
import { useEffect, useState } from "react";

function VideoPlay(props: any) {
  const id = props.match.params.id;
  const [video, setVideo] = useState(null);

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

  useEffect(() => {
    viewUpdate();
    getVideo();
  }, [id]);

  return (
    <>
      <div className="videoPlay-body">
        <div className="videoPlay-center">
          <VideoPlayer data={video} />
        </div>
        <div className="videoPlay-side"></div>
      </div>
    </>
  );
}

export default VideoPlay;
