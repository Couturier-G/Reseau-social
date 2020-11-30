import React, { useState, useEffect } from 'react';
import axios from "axios";
import cookies from "js-cookie";
import * as moment from 'moment';
import 'moment/locale/fr';


function DisplayComments() {

	const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [comments, setcomments] = useState([]);

    useEffect(() => {
        const token = cookies.get('token');
        const id = window.location.href.split('=').reverse()[0]
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.get(`http://localhost:3000/api/comments/${id}`)
        .then(result => {
            setIsLoaded(true);
            const comments = result.data.result;
            setcomments(comments);
          })
          .catch(error => {
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
        <div>
            <div>
                {comments.map(item => (
                    <div key={item.id} className="feed-container">    
                        <div className="grid-container" >
                            <div key={item.authorid}className="infos"  >
                                <div key={item.authorname} className="name">
                                    {moment(item.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                                    <p className="authorname">{item.authorfirstname} {item.authorname}</p>
                                    <p>{item.commentary}</p>
                                </div>
                            </div>
                        </div>
                    </div>        
                ))} 
            </div>  
        </div>       
      );
    }
}
export default DisplayComments;