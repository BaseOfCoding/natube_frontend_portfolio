/* import 영역 */
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../header/header.css";
import "../header/loginModal.css";
import HeaderLogo from "../../images/header_logo.png";
import MagnifyGlass from "../../images/icons/magnifyGlass.png";
import UserIcon from "../../images/icons/user_icon.png";
import VideoUploadIcon from "../../images/icons/video_add_icon.png";
import { WindowSizeCompareMoblie } from "../../props/WindowSizeCompareMoblie";
import { LoginModal } from "../../props/LoginModal";
import { GetUserData, PageAuth } from "../../props/auth";

// Header 함수, 이 함수는 홈페이지 맨 위에 보이는 Header 영역을 렌더링한다.
function Header() {
  // useState hook을 이용해, 2번째 set으로 시작되는 함수에 다른 값이 들어가면, 첫 번째 변수들의 값을 변경해준다.
  const [search, setSearch] = useState("");
  const [toggleClick, setToggleClick] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [logined, setLogin] = useState(false);

  // 검색용 input 태그에서 사용 할 함수 선언, 하지만 아직 사용하지 않는다.
  const searched = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  // 현재 브라우저의 사이즈를 알아낸다. 만약 768px 보다 낮으면, 토글 방식으로 변경하기 위해 만든 함수
  WindowSizeCompareMoblie(setToggleClick);

  // login 버튼을 클릭했을 경우, loginModal 변수를 현재 값의 반대값으로 변경한다.
  function loginModalOnClickListener() {
    setLoginModal((loginModal) => !loginModal);
  }

  // 토글이 클릭됐는 지 아닌 지를 체크하는 함수, 해당 함수는 모바일 환경 또는 패드환경에서만 사용이 가능.
  function toggleButtonClicked() {
    setToggleClick((toggleClick) => !toggleClick);
  }

  // 검색 버튼에 사용되는 리스너 함수. 하지만 사용하지 않음.
  const searchOnClickListener = () => {};

  // 인증 요청 함수.
  PageAuth(setLogin);

  /* 
  로그인 관련 모달페이지를 loginModal이란 변수에 따라 보여줄 지 말지를 체크하고, 만약 false라면, 보여주진 않는다. 로고와, input창, 유저 버튼, 비디오 업로드 버튼으로 구성되어 있고 
  페이지의 사이즈에 따라 toogleClick의 따라 display를 flex 또는 none으로 만들게 된다.
  */
  return (
    <div>
      {loginModal ? <LoginModal stateFunction={setLoginModal} /> : ""}
      <div className="header-group">
        <div className="logo-group">
          <Link to="/home">
            <img src={HeaderLogo} alt="비어 있음" />
          </Link>
        </div>
        <div className="input-group" style={toggleClick ? { display: "flex" } : { display: "none" }}>
          <input
            placeholder=" 검색 기능은 만들어지지 않았습니다. comming soon..."
            disabled
            type="text"
            value={search}
            onChange={searched}
            onKeyDown={searchOnClickListener}
          />
          <button onClick={searchOnClickListener}>
            <img src={MagnifyGlass} alt="비어있음" />
          </button>
        </div>
        <div className="header-menu-group" style={toggleClick ? { display: "flex" } : { display: "none" }}>
          <img src={logined ? GetUserData().profileURL : UserIcon} alt="비어있음" onClick={loginModalOnClickListener} />
          <Link to="/videoupload">
            <img src={VideoUploadIcon} alt="비어있음" />
          </Link>
        </div>
        <div className="header_toggleButton" onClick={toggleButtonClicked}>
          <i className="fas fa-bars" />
        </div>
      </div>
    </div>
  );
}

export default Header;
