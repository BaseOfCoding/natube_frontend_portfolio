import { InboxOutlined } from "@ant-design/icons";
import { Divider, message, Upload } from "antd";
import { API_URL } from "../../utils/values";

// interface

interface IVideoUploadEachDivide {
  title: string;
  htmlTag: JSX.Element;
}

interface IMediaUploadInfo {
  mediaFile: string;
  url_folder: string;
  setState: (str: string) => void;
  upload_text: string;
}

interface IVideoInfo {}

// jsx prop

export const VideoUploadEachDivide = ({ title, htmlTag }: IVideoUploadEachDivide) => {
  const eachTitle = title;
  const eachHtmlTag = htmlTag;

  return (
    <>
      <div className="video-info-group">
        <div className="video-info-each-title">
          <span className="contents-span">{eachTitle}</span>
        </div>
        <div className="video-info-each-htmlTag">{eachHtmlTag};</div>
      </div>
      <Divider />
    </>
  );
};

const { Dragger } = Upload;

export function MediaUploadForm({ mediaFile, url_folder, setState, upload_text }: IMediaUploadInfo) {
  const props = {
    name: mediaFile,
    multiple: false,

    onChange(info: any) {
      const { status } = info.file;

      if (status === "done") {
        message.success(`${info.file.name} 파일 업로드 성공!`, 2.0);
        const response = info.file.response;
        var fileUrl = mediaFile === "video" ? response.videoUrl : response.thumbnailUrl;
        console.log(`${API_URL}/${fileUrl}`);
        setState(`${API_URL}/${fileUrl}`);
      } else if (status === "error") {
        message.error(`${info.file.name} 파일 업로드 실패!`, 2.0);
      }
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className="media-dragger">
      <Dragger maxCount={1} action={`${API_URL}/${url_folder}`} {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">{`업로드 하실 ${upload_text}을 드래그 또는 클릭해서 업로드 해주세요.`}</p>
        <p className="ant-upload-hint">용량 사이즈는 작을수록 좋습니다.</p>
      </Dragger>
    </div>
  );
}

export function VideoView() {
  return (
    <div className="home-videoView-group">
      <div className="video-group">
        <img className="thumbnail-image" src="images/natube_icon.png" alt="X" />
        <div className="video-media-info-group">
          <img className="profile-image" src="images/natube_icon.png" alt="X" />
          <div className="video-info">
            <span className="video-title">zfsdsadas</span>
            <span className="video-uploader">정민</span>
            <div className="video-upload-and-date">
              <span className="video-upload-view">1.1만회</span>
              <span style={{ fontSize: 14, fontWeight: 900, color: "gray" }}>﹒</span>
              <span className="video-upload-date">3일전</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
