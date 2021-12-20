import "./videoUpload.css";
import { Form, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

function VideoUploadPage() {
  const onUpload = () => {};
  return (
    <>
      <div className="video-upload-group">
        <Form className="video-form" name="비디오 업로드" onFinish={onUpload}>
          <VideoUploadForm />
        </Form>
      </div>
    </>
  );
}

function VideoUploadForm() {
  const props = {
    name: "file",
    multiple: false,

    onChange(info: any) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Form.Item>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
        </p>
      </Dragger>
    </Form.Item>
  );
}

export default VideoUploadPage;
