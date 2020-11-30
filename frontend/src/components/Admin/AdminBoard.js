import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import 'reactjs-popup/dist/index.css';
import cookies from "js-cookie";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import * as moment from 'moment';
import 'moment/locale/fr';

function AdminBoard() {

    const userInfo = JSON.parse(localStorage.getItem('profile'));
    const userAdmin = userInfo.role;

    
	const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [publications, setPublications] = useState([]);
    const [comments, setComments] = useState([]);

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

    useEffect(() => {
        const token = cookies.get('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.get("http://localhost:3000/api/comments/")
        .then(result => {
            setIsLoaded(true);
            const comments = result.data.result;
            setComments(comments);
          })
          .catch(error => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, []);

    const handleDeletePublication = (e) => {
        const token = cookies.get('token');
        const id = e.currentTarget.id
        console.log(id)
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
		axios.delete(`http://localhost:3000/api/publications/${id}`)
		.then(response => {
			setTimeout(() => {
				window.location = "/";
			}, 1000);
            window.location = "/adminArea";
		})
		.catch(err => setError(true));
    };

    const handleDeleteComment = (e) => {
        const token = cookies.get('token');
        const commentId = e.currentTarget.id
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
		axios.delete(`http://localhost:3000/api/comments/${commentId}`)
		.then(response => {
			setTimeout(() => {
				window.location = "/";
			}, 1000);
            window.location = "/adminArea";
		})
		.catch(err => setError(true));
    };
 
    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
          return <div>Chargement...</div>;
    } else {
        return (
           <div key="admin-feed" className="feeddiv">
               {userAdmin === 'user' && 
                   <div key="user">
                        <h3>Vous n'êtes pas admin !</h3>
                        <NavLink to="/feed">
                            <span className="link">Clic ICI pour retourner à l'accueil.</span>
                        </NavLink>
                   </div>
                }
               {userAdmin === 'admin' && 
                <div>
                    <div>
                        <AdminHeader />
                    </div>
                        <h2>Espace ADMIN : Vous pouvez supprimer des publications et/ou des commentaires </h2>
                    <div key="container" className="admin-container">
                        <div key ="publications" className="admin-publications">
                            <h4>Liste des dernières publications :</h4>
                            {publications.map(item => (     
                                <div key={item.id} className="pub-container" >
                                    <div className="title">
                                        <p>Créé le : {moment(item.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
                                        <p>Créateur : {item.authorfirstname} {item.authorname}</p>
                                        <h3 className="content">{item.title}</h3>                               
                                    </div>
                                    <div className="name">
                                        <p className="content">{item.content} </p>
                                        <img className="img-container" src={`http://localhost:3000/images/${item.attachment}`} alt="img-publications"></img>
                                    </div>
                                    <Popup trigger={<button >Supprimer la publication</button>} position="right center">
                                        <div>
                                            <div>
                                                <h4 className="popup-title">Attention vous allez supprimer cette publication</h4>
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    id={item.id}
                                                    onClick={handleDeletePublication}
                                                    className="btn-myaccount"
                                                >
                                                    Confirmer
                                                </button>
                                            </div>
                                        </div>                  
                                    </Popup>
                                </div>
                            ))}
                        </div>
                        <div key="comments" className="admin-comments">
                            <h4>Liste des derniers commentaires :</h4>
                            {comments.map(item => (     
                                <div key={item.id} className="com-container" >
                                    <div className="comment-title">
                                        <p>Crée le : {moment(item.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
                                        <p>Créateur : {item.authorfirstname} {item.authorname}</p>                              
                                    </div>
                                    <div className="name">
                                        <p className="content">Commentaire : {item.commentary} </p>
                                    </div>
                                    <Popup trigger={<button >Supprimer le commentaire</button>} position="right center">
                                        <div>
                                            <div>
                                                <h4 className="popup-title">Attention vous allez supprimer ce commentaire</h4>
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    id={item.id}
                                                    onClick={handleDeleteComment}
                                                    className="btn-myaccount"
                                                >
                                                    Confirmer
                                                </button>
                                            </div>
                                        </div>                  
                                    </Popup>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                }
           </div>
        )
    } 
}
export default AdminBoard;