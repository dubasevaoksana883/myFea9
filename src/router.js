import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import App from "./containers/App";
import Auth from "./containers/Auth";

import Header from "./components/header";

import PrivateRoute from "./privateRouter";

const Router = () => (
	<div className="container">
		<Header />
		<Switch>
			<PrivateRoute exact path="/" component={App} />
			<Route exact path="/auth" component={Auth} />
		</Switch>
	</div>
);

export default withRouter(Router);
