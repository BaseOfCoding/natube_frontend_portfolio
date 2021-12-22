import { InboxOutlined } from "@ant-design/icons";
import { Divider, message, Upload } from "antd";

// interface

interface IVideoUploadEachDivide {
  title: string;
  htmlTag: JSX.Element;
}

interface IMediaUploadInfo {
  mediaFile: string;
  url_folder: string;
  onFunc: (str: string) => void;
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

export function MediaUploadForm({ mediaFile, url_folder, onFunc }: IMediaUploadInfo) {
  const props = {
    name: mediaFile,
    multiple: false,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",

    onChange(info: any) {
      const { status, type } = info.file;

      onFunc("zz");
      console.log(url_folder);

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
    <div className="media-dragger">
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
