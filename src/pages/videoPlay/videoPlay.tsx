// import 영역
import { VideoPlayer } from "../../props/VideoPlayer";
import "./videoPlay.css";
import axios from "axios";
import { API_URL } from "../../utils/values";
import { useEffect, useState } from "react";
import { VideoRecommendation } from "../../props/VideoRecommendation";

// videoplay 페이지
function VideoPlay(props: any) {
  const id = props.match.params.id; // 클릭된 비디오의 id를 대입.
  const [video, setVideo] = useState(null); // video의 정보를 담을 변수와 변경 시키는 함수를 react hook의 useState를 이용해 생성
  const [recommendationVideo, setRecommendationVideo] = useState([]); // 추천 영상 관련 변수 및 함수

  // 해당 영상이 클릭 될 경우 조회수를 1씩 올리는 것을 서버에 요청하는 함수
  const viewUpdate = () => {
    axios
      .get(`${API_URL}/media/viewupdate/${id}`)
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };

  // 해당 비디오의 정보를 요청받는 함수
  const getVideo = () => {
    axios
      .get(`${API_URL}/media/videoGet/${id}`)
      .then((result) => {
        setVideo(result.data.videoData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 해당 영상과 같은 태그를 가진 추천 영상들의 정보를 요청받는 함수
  const getRecommendationVideo = () => {
    axios
      .get(`${API_URL}/media/videoGet/${id}/recommendation`)
      .then((result) => {
        setRecommendationVideo(result.data.videoDatas);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 새로고침시, 조회수가 증가 되지 못하게 막기 위한 장치
  window.onbeforeunload = () => {
    localStorage.setItem("refresh", "true");
  };

  window.onpopstate = () => {
    localStorage.clear();
  };

  /*
  useEffect react hook을 이용해, id가 변경되었을 경우에만, 재렌더링을 하게 하고,
  만약 새로고침 되었을 경우에는 조회수를 증가하지 않고, 처음 보는 영상일 경우 조회수를 증가한다.
  그리고, 비디오의 정보와 비디오와 같은 태그를 가진 추천영상들의 정보를 요청받아 불러온다.
  */
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
          <div className={"videoPlay-mobile-side"}>
            {recommendationVideo.map((data, index) => {
              return <VideoRecommendation data={data} index={index} />;
            })}
          </div>
        </div>
        <div className={"videoPlay-pc-side"}>
          {recommendationVideo.map((data, index) => {
            return <VideoRecommendation data={data} index={index} />;
          })}
        </div>
      </div>
    </>
  );
}

export default VideoPlay;
