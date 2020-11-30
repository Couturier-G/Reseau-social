import React, { useState, useEffect } from "react";
import axios from "axios";
import cookies from "js-cookie";
import ProfileHeader from './ProfileHeader'

function Profile() {
	
	const userInfo = JSON.parse(localStorage.getItem('profile'));
	const userNormal = userInfo.role;
	
	const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
	const [userInformation, setuserInformation] = useState([]);

	useEffect(() => {
		const token = cookies.get('token');
		const id = cookies.get('id');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
		axios.get(`http://localhost:3000/api/user/myprofile/${id}`)
        .then(result => {
			setIsLoaded(true);
            const userInformation = result.data.result;
			setuserInformation(userInformation);
          })
          .catch(error => {
			console.log(error);
            setIsLoaded(true);
            setError(error);
          }
        )
	}, []);

	const handleDisconnect = () => {
		cookies.remove('token');
		cookies.remove('id');
		localStorage.clear('profile');
		window.location = "/";
	};

	const handleDeleteUser = () => {
		const token = cookies.get('token');
		const id = cookies.get('id');
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
		axios.delete(`http://localhost:3000/api/user/${id}`)
		.then(response => {
			setTimeout(() => {
				window.location = "/";
			}, 1000);
			cookies.remove('token');
			cookies.remove('id');
			localStorage.clear('profile');
		})
		.catch(err => setError(true));
	};

	if (error) {
		return <div>Erreur : {error.message}</div>;
	  } else if (!isLoaded) {
		  return <div>Chargement...</div>;
		} else {	
	
		return (
			<div className="container-fluid">
				<div key="header" className="header">
					<ProfileHeader />
					<div key="myprofile">
						<h2 className="myprofile">Informations de votre profil :</h2>
					</div>
					<div key="user-information" className="user-information">
						{userInformation.map(item => (
							<div key ={item.id} className="profile-info">
								<div className ="name">
									<h4>Nom : {item.name}</h4>
									<h4>Prénom : {item.firstname}</h4>
									<h4>Email : {item.email}</h4>
								</div>
							</div>
						))}	
					</div>
					<div className="button-profile">
						<div className="button-disconnect">
							<button
								type="button"
								onClick={handleDisconnect}
								className="btn btn-danger"
							>
								Se déconnecter
							</button>
						</div>							
					</div>
					<div className="button-delete-account">
							{userNormal === 'user' &&
							<button
								type="button"
								onClick={handleDeleteUser}
								className="btn btn-danger"
							>
								Supprimer mon compte
							</button>}
					</div>	
				</div>
			</div>
		);
	}
}

export default Profile;