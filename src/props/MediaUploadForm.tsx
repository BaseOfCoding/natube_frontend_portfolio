import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { API_URL, MEDIA_URL } from "../utils/values";

// 업로드 페이지에서 prop으로 보내는 데이터의 값을 저장 할 변수들을 담는 interface.
interface IMediaUploadInfo {
  mediaFile: string;
  url_folder: string;
  setState: (str: string) => void;
  upload_text: string;
  type_text: string;
}

const { Dragger } = Upload; // 업로드 방식중에, Drag해서, 업로드 할 수 있는 디자인을 사용하기 위해 필요.

// 업로드 관련 Form
export function MediaUploadForm({ mediaFile, url_folder, setState, upload_text, type_text }: IMediaUploadInfo) {
  // props 변수는, Dragger의 속성값들 또는 함수의 기능을 가지고 있는 변수.
  const props = {
    name: mediaFile, // name은, mediaFile로 전달받는 값을 대입
    multiple: false, // multiple을 false로 해서, 여러개의 파일은 업로드가 가능하지 못하게 함.

    // onChange 함수는, 해당 파일의 업로드 상태에 따라 다르게 기능을 할 수 있게 한다.
    onChange(info: any) {
      const { status } = info.file;

      /*
      파일의 상태가 업로드가 완료된 경우라면, 업로드 성공이란 메시지를 띄우고
      서버에서 보낸 파일의 url을 썸네일인지 비디오인 지를 체크해서
      각 미디어 파일에 맞는 업로드 되서 저장되어있는 서버의 url을 fileUrl이란 변수에 넣어주고
      전달받은 setState라는 함수를 이용해서, 각 변수에 url을 교체해준다.
      */
      if (status === "done") {
        message.success("파일 업로드 성공!", 2.0);
        const response = info.file.response;
        var fileUrl = mediaFile === "video" ? response.videoUrl : response.thumbnailUrl;
        setState(`${MEDIA_URL}${fileUrl}`);
      } else if (status === "error") {
        message.error("파일 업로드 실패!", 2.0);
      }
    },

    // onDrop 함수는 drag and drop 했을 때 사용되는 함수
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  /*
  만약 비디오를 업로드 해야하는데, 썸네일을 업로드하거나
  썸네일 업로드를 해야하는데 비디오를 업로드 할 경우, 업로드가 불가하게 만들기도 한다.
  */
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
        action={`${API_URL}/uploads/${url_folder}`}
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
