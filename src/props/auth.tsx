import axios from "axios";
import { Dispatch, SetStateAction, useEffect } from "react";
import { API_URL } from "../utils/values";

export interface User_Data {
  user_id: string;
  nickname: string;
  profileURL: string;
}

let user_data: User_Data;

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

export function SetUserData(result: any) {
  let userData = result.user_data;
  user_data = {
    user_id: userData.user_id.toString(),
    nickname: userData.nickname.toString(),
    profileURL: userData.profileUrl != null ? userData.profileUrl.toString() : "../images/icons/user_icon.png",
  };
}

export function GetUserData(): User_Data {
  return user_data;
}

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

export function Logout() {
  localStorage.removeItem("authToken");
}
