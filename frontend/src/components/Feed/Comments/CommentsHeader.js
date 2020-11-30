import React from "react";
import homepagelogo from '../../../logo/icon-left-font-monochrome-white.png'
const handleReturn = () => {
    window.location = "/feed";
};

function ProfileHeader() {
    return (
        <div>
            <img className="homepagelogo" src={homepagelogo} alt="logo"></img>
            <div>
                <button 
                    type="button"
                    className="btn-comment"
                    onClick={handleReturn}
                >
                    Retour Accueil
                </button>
            </div>                   
        </div>
    );
}

export default ProfileHeader;