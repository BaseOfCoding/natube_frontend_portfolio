// import 영역
import "../home/home.css";
import { API_URL, tagEngValues, tagValues } from "../../utils/values";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { VideoView } from "../../props/VideoView";

function Home() {
  // 전체 비디오 정보 ( json ) 를 담을 array 변수와 변경 될 setVideoData를 useState hook으로 생성.
  const [videoDatas, setVideoData] = useState([]);

  // 서버에서 보낸 비디오 정보들을 받아서, videoDatas에 저장
  const getVideoInfo = () => {
    axios
      .get(`${API_URL}/media/videomain`)
      .then((result) => {
        if (result.data == "에러 발생!!") {
          return;
        }
        const videoDatas = result.data.videoDatas;
        setVideoData(videoDatas);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 현재는 사용하지 않지만, tag를 클릭시 해당 태그에 맞는 영상들만 가져오게 하기 위한 클릭 리스너 함수
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

  // useEffect react hook을 한 번만 실행되게 해서,localStorage에 refresh 키 값으로 저장된 값을 지워주고, 전체 video의 정보를 가져온다.
  useEffect(() => {
    localStorage.removeItem("refresh");
    getVideoInfo();
  }, []);

  // 태그들을 Rendering 하는 함수.
  function TagRender() {
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
          <TagRender />
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
