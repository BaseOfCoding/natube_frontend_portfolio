export const API_URL = process.env.NODE_ENV == "production" ? "https://test.com" : "http://localhost:8080";

export const tagValues: Array<string> = ["전체", "드라마", "부동산", "주식", "프로그래밍", "요리", "게임", "음악"];
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
