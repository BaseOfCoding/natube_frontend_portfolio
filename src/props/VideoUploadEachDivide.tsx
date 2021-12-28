import { Divider } from "antd";

interface IVideoUploadEachDivide {
  title: string;
  htmlTag: JSX.Element;
}

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
