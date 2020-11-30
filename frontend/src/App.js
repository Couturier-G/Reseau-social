import React, { Component } from "react";
import Login from "./components/Homepage/Login";
import Signup from "./components/Homepage/Signup";
import Profile from "./components/Profile/Profile";
import Feed from "./components/Feed/Feed";
import Publish from "./components/Feed/Publish";
import { BrowserRouter as Router, Route} from "react-router-dom";
import "./App.css";
import AdminBoard from "./components/Admin/AdminBoard";
import SeeComments from "./components/Feed/Comments/SeeComments";

export class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/" component={Login} />
					<Route exact path="/feed" component={Feed} />
          			<Route exact path="/myprofile/:id" component={Profile} />
					<Route exact path="/publish" component={Publish} />
					<Route exact path="/adminarea" component={AdminBoard} />
					<Route exact path="/publications/:id" component={SeeComments} />
				</div>
			</Router>
		);
	}
}

export default App;
