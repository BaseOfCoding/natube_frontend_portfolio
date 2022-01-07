import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export function setRefreshTokenToCookie(refresh_token: string) {
  cookies.set("login", refresh_token, {
    sameSite: "strict",
    path: "/",
    maxAge: Math.floor(Date.now() / 1000) + 60 * 60,
  });
}

export function logout() {
  console.log("localstorage set logout!!");
  window.localStorage.setItem("logout", Date.now().toString());
  cookies.remove("refresh_token");
}

// export function LoginCofirm(): boolean {
//   const [temp_id, setTempId] = useState("");
//   const [logined, setLogined] = useState(false);
//   var num = 0;

//   function loginConfirm() {
//     setTempId(cookies.get("login"));
//     if (temp_id) {
//       setLogined(true);
//     } else {
//       setLogined(false);
//     }
//   }

//   useEffect(() => {
//     console.log(num++);
//     loginConfirm();
//   }, []);

//   return logined;
// }
