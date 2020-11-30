import React from "react";
import cookies from "js-cookie";
import homepagelogo from '../../logo/icon-left-font-monochrome-white.png'

function AdminHeader() {

    const handleReturn = () => {
        window.location = "/feed";
    };

    const handleMyAccount = () => {
        const id = cookies.get('id');
        window.location = `/myprofile/&id=${id}`
    };
 
    return (
        <div>
            <img className="homepagelogo" src={homepagelogo} alt="logo"></img>
            <div>
                <div>
                    <button 
                        type="button"
                        onClick={handleReturn}
                    >
                        Retour Accueil
                    </button>
                </div>
                 
            <button
				type="button"
				onClick={handleMyAccount}
				className="btn-myaccount"
			>
				Mon compte
			</button>
                
            </div>
        </div>
        

    );
}

export default AdminHeader;