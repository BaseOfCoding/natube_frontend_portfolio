// 만약, vercel에 올라가 있다면? 왼쪽 url, 아니라면, 로컬 서버 url을 사용한다.
export const API_URL = "https://boc-natube-backend.herokuapp.com/api";
// process.env.NODE_ENV == "production" ? "https://boc-natube-backend.herokuapp.com/api" : "http://localhost:8080/api";

export const MEDIA_URL = "https://boc-natube-backend.herokuapp.com/api";
// process.env.NODE_ENV == "production" ? "https://boc-natube-backend.herokuapp.com/" : "http://localhost:8080/";

// 태그 arrays
export const tagValues: Array<string> = ["전체", "드라마", "부동산", "주식", "프로그래밍", "요리", "게임", "음악"];

// 태그 영어 arrays
export const tagEngValues: Array<string> = [
  "all",
  "drama",
  "realestate",
  "stock",
  "programming",
  "cook",
  "game",
  "music",
];
