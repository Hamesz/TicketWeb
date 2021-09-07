import React from "react";
import {HeaderWrap} from "./Header.styles"

function Header(props) {
    return (
        <HeaderWrap>
            <div className="headerGrid">
                <div className="grid-item">
                    <button className="back-button" onClick = {()=>{props.onClickBackButton()}}>
                        <img src="assets/images/arrow-left-icon.png" alt="back arrow"></img>
                    </button>
                </div>
                <div className="grid-item-text">{props.title}</div>
                {/* <div className="grid-item">
                    <img src="assets/images/share_icon.png" alt="share icon"></img>
                </div> */}
                <div className="grid-item">
                    <img src="assets/images/real_ticket.png" alt="ticket"></img>
                </div>
                <div className="grid-item">
                    <img src="assets/images/3-dots.png" alt="three dots"></img>
                </div>
            </div>
        </HeaderWrap>
    )
}

export default Header;