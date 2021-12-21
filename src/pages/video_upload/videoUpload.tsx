import "./videoUpload.css";
import "antd/dist/antd.css";
import { Select, Form, Upload, message, Divider, Input, Button } from "antd";
import { DownloadOutlined, InboxOutlined, SaveOutlined } from "@ant-design/icons";
import { tagValues } from "../../utils/values";
import { useState } from "react";

const { Dragger } = Upload;

function VideoUploadPage() {
  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const onUpload = () => {
    console.log(video, title, description, tag);
  };

  return (
    <>
      <div className="video-upload-page">
        <div className="video-info-input-group">
          <span className="contents-span">1. 비디오 업로드</span>
          <VideoUploadForm />
        </div>
        <Divider />
        <div className="video-info-input-group">
          <span className="contents-span">2. 제목 입력</span>
          <Input.TextArea id="video-title" placeholder="제목을 입력해주세요." size="large" maxLength={100} />
        </div>
        <Divider />
        <div className="video-info-input-group">
          <span className="contents-span">3. 비디오 설명 입력</span>
          <Input.TextArea id="video-description" placeholder="설명을 입력해주세요." size="large" maxLength={1000} />
        </div>
        <Divider />
        {/* <Option value="lucy">Lucy</Option> */}
        <div className="video-info-input-group">
          <span className="contents-span">4. 태그 입력</span>
          <Select maxLength={10} maxTagTextLength={5} mode="tags" style={{ width: "50%" }} placeholder="Tags Mode" />
        </div>
        <Divider />
        <div className="video-upload-button-group">
          <Button type="primary" icon={<SaveOutlined />}>
            비디오 업로드 하기
          </Button>
        </div>
      </div>
    </>
  );
}

function VideoUploadForm() {
  const props = {
    name: "file",
    multiple: false,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",

    onChange(info: any) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        console.log(status);
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className="video-dragger">
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">클릭 또는 업로드 할 영상을 끌어서 놔주세요.</p>
        <p className="ant-upload-hint">용량 사이즈는 작을 수록 좋습니다.</p>
      </Dragger>
    </div>
  );
}

export default VideoUploadPage;
