import { Divider } from "antd";

interface IVideoUploadEachDivide {
  title: string;
  htmlTag: JSX.Element;
}

// 가독성이 좋게 하기 위해서 만든 JSX. 업로드 페이지에 각 주제이 맞는 타이틀과 JSX로 만들어진 htmlTag를 받아와 렌더링해준다.
// 각각 분할을 하기 위해 만든 JSX이다.
export const VideoUploadEachDivide = ({ title, htmlTag }: IVideoUploadEachDivide) => {
  // 주제와, JSX로 만든, htmlTag를 가진다.
  const eachTitle = title;
  const eachHtmlTag = htmlTag;

  // 주제와 JSX를 렌더링한다.
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
