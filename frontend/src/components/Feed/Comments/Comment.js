import React, { useState } from "react";
import axios from "axios";
import cookies from "js-cookie";


function Comments() {
	const token = cookies.get('token');
    const userInfo = JSON.parse(localStorage.getItem('profile'));

    const [comment, setComment] = useState({
        authorname: userInfo.name,
        authorfirstname: userInfo.firstname,
        authorid: userInfo.id,
        publicationid: window.location.href.split('=').reverse()[0],
		commentary: "",
    });

    const submitForm = e => {
        e.preventDefault();
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
		axios.post("http://localhost:3000/api/comments/", comment)
			.then(res => {
                window.location.reload(false);
			})
			.catch(error => {
				alert({ error: comment.error })
			});
	};

    return (
        <div>
            <div>
                <form onSubmit={submitForm}>
                    <div className="form-group">
                        <label htmlFor="commentary">Votre commentaire :</label>
                        <input
                            type="commentary"
                            className="form-control"
                            name="commentary"
                            id="commentary"
                            value={comment.commentary}
                            onChange={e => setComment({ ...comment, commentary: e.target.value })}
                            aria-describedby="commentaryHelp"
                            placeholder="Votre commentaire ..."
                        />
                    </div>
                    <button type="submit" className="btn-connect">
                        Postez votre commentaire
                    </button>
                </form>
            </div>

        </div>       
    );
}
export default Comments;