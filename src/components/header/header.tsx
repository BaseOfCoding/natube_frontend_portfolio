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

  const searched = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  WindowSizeCompareMoblie(setToggleClick);

  // const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerWidth });

  // useEffect(() => {
  //   let resizeTimer: NodeJS.Timeout;
  //   let windowSizer = () => {
  //     clearTimeout(resizeTimer);
  //     resizeTimer = setTimeout(() => {
  //       setWindowSize({ width: document.body.clientWidth, height: document.body.clientHeight });
  //     }, 200);
  //   };
  //   window.addEventListener("resize", windowSizer);

  //   return () => {
  //     window.removeEventListener("resize", windowSizer);
  //   };
  // }, [windowSize]);

  // useEffect(() => {
  //   windowSize.width > 767 ? setToggleClick(true) : setToggleClick(false);
  // }, [windowSize.width]);

  function toggleButtonClicked() {
    setToggleClick((toggleClick) => !toggleClick);
  }

  const searchOnClickListener = () => {};

  return (
    <div>
      <LoginModal />
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
          <Link to="/login">
            <img src={UserIcon} alt="비어있음" />
          </Link>
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
