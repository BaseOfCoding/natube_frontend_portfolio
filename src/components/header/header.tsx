import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "../header/header.css";

const imgFolderUrl = "images/icons/";

function Header() {
  const [search, setSearch] = useState("");

  const searched = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  return (
    <div>
      <div className="header-group">
        <div className="logo-group">
          <Link to="/home">
            <img src="images/header_logo.png" alt="비어 있음" />
          </Link>
        </div>
        <div className="input-group">
          <input placeholder=" 검색" type="text" value={search} onChange={searched} onKeyDown={searchClicked} />
          <button onClick={searchClicked}>
            <img src={`${imgFolderUrl}magnifyGlass.png`} alt="비어있음" />
          </button>
        </div>
        <div className="header-menu-group">
          <img src={`${imgFolderUrl}user_icon.png`} alt="비어있음" />
        </div>
      </div>
    </div>
  );
}

const searchClicked = () => {};

export default Header;
