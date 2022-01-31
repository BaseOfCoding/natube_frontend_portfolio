import dayjs from "dayjs";
import { Link } from "react-router-dom";

// 추천 영상 JSX
export function VideoRecommendation(props: any) {
  // 전달받은 추천영상들의 데이터를 가지고 있다.
  const data = props.data;

  /*
  클릭 시 해당 video로 이동 시킬 Link와,
  해당 영상 썸네일과, 제목, 영상을 업로드 한 사람의 닉네임, 조회수와 업로드 날짜를 렌더링한다.
  */
  return (
    <Link to={`/videoplay/${data.id}`}>
      <div className="recommendation-group">
        <div className="recommendation-thumbnail">
          <img src={data.thumbnailUrl} alt="X" />
        </div>
        <div className="recommendation-info-group">
          <div className="recommendation-title-nickname">
            <span className="recommendation-title">{data.title}</span>
            <span className="recommendation-nickname">{data.nickname}</span>
          </div>
          <div className="recommendation-nickname-view-date">
            <span className="recommendation-view">{ViewToCalculateString(data.view)}</span>
            <span style={{ fontSize: 14, fontWeight: 900, color: "gray" }}>﹒</span>
            <span className="recommendation-date">{dayjs(data.createdAt).fromNow()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// 추천 영상들의 조회수를 만회 일 경우, 10,000이 아닌 1만회 아니면, 15,000회 일 경우 1.5만회 이런 식으로 만들기 위한 조회수를 문자열로 짧게 줄일 함수
function ViewToCalculateString(view: number): string {
  let firstDigit: number;

  if (view >= 100000000) {
    firstDigit = view / 100000000;
    return `${firstDigit}억 회`;
  } else if (view >= 10000 && view >= 100000) {
    firstDigit = view / 10000;
    return `${firstDigit}만 회`;
  } else if (view >= 10000 && view < 100000) {
    firstDigit = view / 10000;
    return `${firstDigit}만 회`;
  }

  return `${view}회`;
}
