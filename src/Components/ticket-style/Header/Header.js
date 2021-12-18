import React from "react";
import {HeaderWrap} from "./Header.styles"

function Header(props) {
    return (
        <HeaderWrap>
            <div className="grid">
                <img src="assets/images/back-button.png" alt="back button" onClick = {()=>{props.onClickBackButton()}}></img>
                <div className="grid-item-text">{props.title}</div>
            </div>
        </HeaderWrap>
    )
}

export default Header;