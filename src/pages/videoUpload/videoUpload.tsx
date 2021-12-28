import "./videoUpload.css";
import "antd/dist/antd.css";
import { Select, Input, Button, Divider, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useState } from "react";
import { API_URL, tagEngValues, tagValues } from "../../utils/values";
import axios from "axios";
import { useHistory } from "react-router";
import { VideoUploadEachDivide } from "../../props/VideoUploadEachDivide";
import { MediaUploadForm } from "../../props/MediaUploadForm";

const { Option } = Select;

function VideoUploadPage() {
  const [video, setVideo] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const history = useHistory();

  const titleOnChange = (e: any) => {
    setTitle(e.target.value);
  };

  const descriptionOnChange = (e: any) => {
    setDescription(e.target.value);
  };

  const tagOnChange = (e: any) => {
    setTag(e);
  };

  const uploadConfirm = () => {
    if (video == "" || thumbnail == "" || title == "" || description == "" || tag == "") {
      message.error("빈칸이 있습니다. 빈칸을 입력해주세요.", 1.0);
    } else {
      axios
        .post(`${API_URL}/videouploads`, {
          videoUrl: video,
          thumbnailUrl: thumbnail,
          title: title,
          description: description,
          tag: tag,
          nickname: "익명 사용자",
          view: 0,
        })
        .then((res) => {
          message.success("업로드 완료", 3.0);
          history.replace("/");
        })
        .catch((err) => {
          console.error(err.message);
          message.error("업로드에 문제가 생겼습니다.");
        });
    }
  };

  return (
    <>
      <div className="video-upload">
        <Divider />
        <VideoUploadEachDivide
          title="1. 비디오 업로드"
          htmlTag={
            <MediaUploadForm
              mediaFile="video"
              setState={setVideo}
              url_folder="videos"
              upload_text="영상"
              type_text="mp4"
            />
          }
        />
        <VideoUploadEachDivide
          title="2. 썸네일 업로드"
          htmlTag={
            <MediaUploadForm
              mediaFile="image"
              setState={setThumbnail}
              url_folder="thumbnails"
              upload_text="썸네일"
              type_text="png"
            />
          }
        />
        <VideoUploadEachDivide
          title="3. 제목 입력"
          htmlTag={
            <Input.TextArea
              onChange={titleOnChange}
              id="video-title"
              placeholder="제목을 입력해주세요."
              size="large"
              maxLength={100}
            />
          }
        />
        <VideoUploadEachDivide
          title="4. 비디오 설명 입력"
          htmlTag={
            <Input.TextArea
              onChange={descriptionOnChange}
              id="video-description"
              placeholder="설명을 입력해주세요."
              size="large"
              maxLength={1000}
            />
          }
        />
        <div className="video-info-group">
          <div className="video-info-each-title">
            <span className="contents-span">5. 태그 선택</span>
          </div>
          <div className="video-info-each-htmlTag">
            <Select defaultValue="" style={{ width: "90%" }} onChange={tagOnChange}>
              {tagValues.map((tag, index) => {
                if (index != 0) {
                  return <Option value={tagEngValues[index]}>{tag}</Option>;
                }
              })}
            </Select>
          </div>
        </div>
        <Divider />
        <div className="video-upload-button-group">
          <Button onClick={uploadConfirm} type="primary" icon={<SaveOutlined />} htmlType="submit">
            비디오 업로드 하기
          </Button>
        </div>
        <Divider />
        <Divider />
      </div>
    </>
  );
}

export default VideoUploadPage;
