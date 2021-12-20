/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../header/header.css";

const imgFolderUrl = "images/icons/";

function Header() {
  const [search, setSearch] = useState("");
  const [toggleClick, setToggleClick] = useState(false);

  const searched = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerWidth });

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    let windowSizer = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setWindowSize({ width: document.body.clientWidth, height: document.body.clientHeight });
      }, 200);
    };
    window.addEventListener("resize", windowSizer);

    return () => {
      window.removeEventListener("resize", windowSizer);
    };
  }, [windowSize]);

  useEffect(() => {
    windowSize.width > 767 ? setToggleClick(true) : setToggleClick(false);
  }, [windowSize.width]);

  function toggleButtonClicked() {
    setToggleClick((toggleClick) => !toggleClick);
  }

  const searchOnClickListener = () => {};

  return (
    <div>
      <div className="header-group">
        <div className="logo-group">
          <Link to="/home">
            <img src="images/header_logo.png" alt="비어 있음" />
          </Link>
        </div>
        <div className="input-group" style={toggleClick ? { display: "flex" } : { display: "none" }}>
          <input placeholder=" 검색" type="text" value={search} onChange={searched} onKeyDown={searchOnClickListener} />
          <button onClick={searchOnClickListener}>
            <img src={`${imgFolderUrl}magnifyGlass.png`} alt="비어있음" />
          </button>
        </div>
        <div className="header-menu-group" style={toggleClick ? { display: "flex" } : { display: "none" }}>
          <Link to="/login">
            <img src={`${imgFolderUrl}user_icon.png`} alt="비어있음" />
          </Link>
          <Link to="/videoupload">
            <img src={`${imgFolderUrl}video_add_icon.png`} alt="비어있음" />
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
