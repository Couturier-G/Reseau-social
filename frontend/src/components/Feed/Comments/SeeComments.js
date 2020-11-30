import React, { useState, useEffect } from "react";
import axios from "axios";
import cookies from "js-cookie";
import CommentsHeader from './CommentsHeader';
import Comment from './Comment'
import DisplayComments from './DisplayComments';
import * as moment from 'moment';
import 'moment/locale/fr';

function SeeComments() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
	const [publicationId, setPublicationId] = useState([]);

	useEffect(() => {
        const token = cookies.get('token');
        const id = window.location.href.split('=').reverse()[0]
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
		axios.get(`http://localhost:3000/api/publications/${id}`)
        .then(result => {
			setIsLoaded(true);
            const publicationId = result.data.result;
            setPublicationId(publicationId);
          })
          .catch(error => {
			console.log(error);
            setIsLoaded(true);
            setError(error);
          }
        )
    }, []);
    

    if (error) {
		return <div>Erreur : {error.message}</div>;
	  } else if (!isLoaded) {
		  return <div>Chargement...</div>;
		} else {	
	
		return (
            <div className="feeddiv">
                <CommentsHeader />
                <div className="feed-container">
                    {publicationId.map(item => (     
                        <div key={item.id} className="grid-container" >
                            <div className="infos"  >
                                <div className="title">
                                    <h3>{item.title}</h3>
                                </div>
                                <div className="date">
                                    {moment(item.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                                </div>
                                <div className="name">
                                    <p className="authorname">{item.authorfirstname} {item.authorname}</p>
                                </div>
                            </div>
                            <div className="image">
                                <img className="img-container" src={`http://localhost:3000/images/${item.attachment}`} alt="img-publication"></img>
                            </div>
                        </div>
                    ))}                     
                </div>
                    <div>
                        <Comment />
                    </div>
                    <div>
                        <DisplayComments />
                    </div>
            </div>
		);
	}
}

export default SeeComments;