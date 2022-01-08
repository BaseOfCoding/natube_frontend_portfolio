import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { API_URL, MEDIA_URL } from "../utils/values";

interface IMediaUploadInfo {
  mediaFile: string;
  url_folder: string;
  setState: (str: string) => void;
  upload_text: string;
  type_text: string;
}

const { Dragger } = Upload;

export function MediaUploadForm({ mediaFile, url_folder, setState, upload_text, type_text }: IMediaUploadInfo) {
  const props = {
    name: mediaFile,
    multiple: false,

    onChange(info: any) {
      const { status } = info.file;

      if (status === "done") {
        message.success("파일 업로드 성공!", 2.0);
        const response = info.file.response;
        var fileUrl = mediaFile === "video" ? response.videoUrl : response.thumbnailUrl;
        setState(`${MEDIA_URL}${fileUrl}`);
      } else if (status === "error") {
        message.error("파일 업로드 실패!", 2.0);
      }
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className="media-dragger">
      <Dragger
        beforeUpload={(file) => {
          let typeConfirm = true;
          let splitAfterType = file.type.split("/");

          if (splitAfterType[0] != "video" && mediaFile == "video") {
            message.error("비디오 파일만 업로드가 가능합니다.");
            typeConfirm = false;
          } else if (splitAfterType[0] != "image" && mediaFile == "image") {
            message.error("이미지 파일만 업로드가 가능합니다.");
            typeConfirm = false;
          }
          return typeConfirm ? true : Upload.LIST_IGNORE;
        }}
        maxCount={1}
        action={`${API_URL}/media/${url_folder}`}
        {...props}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">{`업로드 하실 ${upload_text}을 드래그 또는 클릭해서 업로드 해주세요.`}</p>
        <p className="ant-upload-hint">{`${type_text} 파일만 업로드 가능합니다.`}</p>
      </Dragger>
    </div>
  );
}
