import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			const token = localStorage.getItem("token");
			console.log("token", token);
			if (!token) {
				return <Redirect to="auth" />;
			}

			return <Component {...props} />;
		}}
	/>
);

export default PrivateRoute;
