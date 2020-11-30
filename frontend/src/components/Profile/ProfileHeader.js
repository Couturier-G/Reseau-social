import React from "react";
import homepagelogo from '../../logo/icon-left-font-monochrome-white.png'

const handleReturn = () => {
    window.location = "/feed";
};

function ProfileHeader() {
    return (
        <div>
            <div className="Homepageheader">
                <img className="homepagelogo" src={homepagelogo} alt="logo"></img>
            </div>  
            <div>
                <button 
                    type="button"
                    onClick={handleReturn}
                >
                    Retour Accueil
                </button>
            </div>                   
        </div>
    );
}

export default ProfileHeader;