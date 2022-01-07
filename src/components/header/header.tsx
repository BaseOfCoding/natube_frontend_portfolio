/* eslint-disable @typescript-eslint/no-unused-expressions */
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

function Header() {
  const [search, setSearch] = useState("");
  const [toggleClick, setToggleClick] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const searched = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  WindowSizeCompareMoblie(setToggleClick);

  function loginModalOnClickListener() {
    setLoginModal((loginModal) => !loginModal);
  }

  function toggleButtonClicked() {
    setToggleClick((toggleClick) => !toggleClick);
  }

  const searchOnClickListener = () => {};

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
          <input placeholder=" 검색" type="text" value={search} onChange={searched} onKeyDown={searchOnClickListener} />
          <button onClick={searchOnClickListener}>
            <img src={MagnifyGlass} alt="비어있음" />
          </button>
        </div>
        <div className="header-menu-group" style={toggleClick ? { display: "flex" } : { display: "none" }}>
          <img src={UserIcon} alt="비어있음" onClick={loginModalOnClickListener} />
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
