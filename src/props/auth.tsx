import axios from "axios";
import { Dispatch, SetStateAction, useEffect } from "react";
import { API_URL } from "../utils/values";

// 유저의 데이터, 간단하게 user의 id와, nickname, profileURL을 가져온다.
export interface User_Data {
  user_id: string;
  nickname: string;
  profileURL: string;
}

let user_data: User_Data; // User_Data 인터페이스 형 변수를 만들어 사용.

// 비동기 형식으로, axios 라이브러리를 이용해, 서버에 post 요청을 해서, 해당 token을 localStorage에 저장.
export const Auth = async () => {
  try {
    const result = await axios.post(`${API_URL}/users/auth`, {
      token: localStorage.getItem("authToken"),
    });
    return result.data;
  } catch (e) {
    console.log("인증 실패");
    return e;
  }
};

// 인증 완료시 유저 데이터를 가져와서 저장한다.
export function SetUserData(result: any) {
  let userData = result.user_data;
  user_data = {
    user_id: userData.user_id.toString(),
    nickname: userData.nickname.toString(),
    profileURL: userData.profileUrl != null ? userData.profileUrl.toString() : "../images/icons/user_icon.png",
  };
}

// GetUserData 함수를 만들어, user_data 변수를 접근할 수 있게 한다.
export function GetUserData(): User_Data {
  return user_data;
}

// PageAuth 함수를 이용해서, 서버에 인증 요청을 한 뒤 인증이 완료되면, 인증처리를 해주고 userData를 받아와서 user_data 변수에 저장하는 작업을 한다.
export function PageAuth(setLogin: Dispatch<SetStateAction<boolean>>) {
  useEffect(() => {
    Auth().then((result) => {
      if (result != "error") {
        localStorage.setItem("user_data", JSON.stringify(result));
        SetUserData(result);
        setLogin(true);
      } else {
        return;
      }
    });
  }, []);
}

// Logout 요청이 되면, localStorage에 있는 authToken 키값에 있는 데이터를 지운다.
export function Logout() {
  localStorage.removeItem("authToken");
}
