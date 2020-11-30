import React from "react";
import homepagelogo from '../../logo/icon-left-font-monochrome-white.png'

function HomepageHeader() {
    return (
        <div className="Homepageheader">
            <img className="homepagelogo" src={homepagelogo} alt="logo"></img>
            <h2 className="social-network">Social network</h2>
        </div>
    );
}

export default HomepageHeader;