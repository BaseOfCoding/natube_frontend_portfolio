import "./videoUpload.css";
import "antd/dist/antd.css";
import { Select, Input, Button, Divider, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useState } from "react";
import { MediaUploadForm, VideoUploadEachDivide } from "../../components/props/props";
import { tagEngValues, tagValues } from "../../utils/values";

const { Option } = Select;

function VideoUploadPage() {
  const [video, setVideo] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const titleOnChange = (e: any) => {
    setTitle(e.target.value);
  };

  const descriptionOnChange = (e: any) => {
    setDescription(e.target.value);
  };

  const tagOnChange = (e: any) => {
    console.log(e);
    setTag(e);
  };

  const uploadConfirm = () => {
    if (!video || !thumbnail || !title || !description || tag == "") {
      message.error("빈칸이 있습니다. 빈칸을 입력해주세요.", 1.0);
    } else {
      console.log(tag);
      message
        .loading("업로드 중입니다.", 2.5)
        .then(() => message.success("업로드가 완료되었습니다.", 2.5))
        .then(() => message.info("업로드 완료!!", 2.5));
    }
  };

  return (
    <>
      <div className="video-upload">
        <Divider />
        <VideoUploadEachDivide
          title="1. 비디오 업로드"
          htmlTag={<MediaUploadForm mediaFile="video" onFunc={setVideo} url_folder="videos" />}
        />
        <VideoUploadEachDivide
          title="2. 썸네일 업로드"
          htmlTag={<MediaUploadForm mediaFile="image" onFunc={setThumbnail} url_folder="images" />}
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
