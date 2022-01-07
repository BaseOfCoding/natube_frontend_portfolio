import axios from "axios";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Cookies } from "react-cookie";
import { API_URL } from "./values";

export interface User_Data {
  user_id: string;
  nickname: string;
  profileURL: string;
}

let user_data: User_Data;

export const Auth = async () => {
  const cookies = new Cookies();
  try {
    const result = await axios.post(`${API_URL}/users/auth`, {
      cookie: cookies.get("x_auth"),
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
    profileURL: userData.profileUrl.toString(),
  };
  // console.log(user_data);
}

export function GetUserData(): User_Data {
  return user_data;
}

export function PageAuth(setLogin: Dispatch<SetStateAction<boolean>>) {
  useEffect(() => {
    Auth().then((result) => {
      if (result != "error") {
        SetUserData(result);
        setLogin(true);
      }
    });
  }, []);
}

export function Logout() {
  const cookies = new Cookies();
  cookies.remove("x_auth");
}
