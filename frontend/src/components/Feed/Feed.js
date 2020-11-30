import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import FeedHeader from "./FeedHeader";
import axios from "axios";
import cookies from "js-cookie";
import * as moment from 'moment';
import 'moment/locale/fr';

function Feed() {

	const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        const token = cookies.get('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.get("http://localhost:3000/api/publications/")
        .then(result => {
            setIsLoaded(true);
            const publications = result.data.result;
            setPublications(publications);
          })
          .catch(error => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, []);

    const handleClick = e => {
        const valueid = e.target.id
        console.log(valueid)

        window.location = `/publications/&id=${valueid}`
    };

    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
      } else {
      return (
        <div className="feeddiv">
            <div>
                <FeedHeader />
                <div>
                    <h1>Fil d'actualité Groupomania</h1>
                </div>
                <div className="homepage-link">
					<NavLink to="/publish"><span className="link">Pour publier sur le mur, cliquez ICI</span></NavLink>
				</div>
            </div>
            <div id="feed-container">
                {publications.map(item => (     
                    <div key={item.id} className="grid-container" >
                        <div key="date" className="date">
                            {moment(item.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                        </div>
                        <div key="infos" className="infos"  >
                            <div key="title" className="title">
                                <h3>{item.title}</h3>
                                
                            </div>
                            <div key="name" className="name">
                                <p className="authorname">{item.authorfirstname} {item.authorname}</p>
                            </div>
                        </div>
                        <div key="img" className="image">
                            <img className="img-container" src={`http://localhost:3000/images/${item.attachment}`} alt="img-publication"></img>
                        </div>
                        <button
                            id={item.id}
                            onClick={handleClick}
                        >
                            Voir les commentaires
                        </button>
                    </div>
                ))}                     
            </div>
        </div>
      );
    }
}
export default Feed;