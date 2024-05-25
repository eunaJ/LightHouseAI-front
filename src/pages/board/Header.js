import React from 'react';
import {Link} from "react-router-dom";
import "./Board.css";
import "./Board.js";
import "./BoardList.js";

const Header = () => {
    return (
        <header>
            <Link to="/">홈</Link>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <Link to="/board">게시판</Link>
            <hr/>
        </header>
    );
};

export default Header;