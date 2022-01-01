import dayjs from "dayjs";

export function VideoRecommendation(props: any) {
  const data = props.data;
  console.log(data);
  return (
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
  );
}

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
