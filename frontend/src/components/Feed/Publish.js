import React, { useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import FeedHeader from "./FeedHeader";

function Publish() {
	const token = cookies.get('token');
	const id = cookies.get('id');
	const userInfo = JSON.parse(localStorage.getItem('profile'));
	const userName = userInfo.name;
	const userFirstname = userInfo.firstname;

	const [Publish, setPublish] = useState({
        authorname: userName,
        authorfirstname: userFirstname,
        authorid: id,
        title: "",
        attachment: ""
	});
	const handlerPublish = e => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("authorname", Publish.authorname);
		formData.append("authorfirstname", Publish.authorfirstname);
		formData.append("authorid", Publish.authorid);
		formData.append("title", Publish.title);
		formData.append("attachment", Publish.attachment);

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
		axios.post("http://localhost:3000/api/publications/publish", formData,{
			headers: { "Content-Type": "multipart/form-data" }
		}
		)
			.then(res => {
				window.location = "/feed/";
			})
			.catch(error => {
				alert({ error: Publish.error });
			});
	};

	if (Publish.title === null) {
		console.log("connexion impossible");
	}
	return (
		<div>
			<FeedHeader />
            <div className="homepage-link">
					<NavLink to="/feed"><span className="link">Retour</span></NavLink>
				</div>
			<h2>Le partage c'est par ici !</h2>
			<form onSubmit={handlerPublish}>
				<div className="form-group">
					<label htmlFor="title">Titre de votre publication :</label>
					<input
						type="title"
						className="form-control"
						name="title"
						id="title"
						value={Publish.title}
						onChange={e => setPublish({ ...Publish, title: e.target.value })}
						aria-describedby="titleHelp"
						placeholder="Votre titre ..."
					/>
				</div>
				<div className="form-group">
					<div className="file-upload">
						<input
							type="file"
							className="attachment"
							name="attachment"
							id="attachment"
							onChange={e => setPublish({ ...Publish, attachment: e.target.files[0] })}
						/>
                	</div>
				</div>		
				<button type="submit" className="btn btn-danger">
					Publier
				</button>
			</form>
		</div>
	);
}

export default Publish;