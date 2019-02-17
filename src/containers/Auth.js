import React, { Component } from "react";

import SignIn from "../components/signIn";
import SignUp from "../components/signUp";

export default class Auth extends Component {
	state = { switchForm: false };

	switchForm = () => this.setState(prevState => ({ switchForm: !prevState.switchForm }));

	render() {
		const { switchForm } = this.state;

		return (
			<div className="auth-box">
				<div className="auth-box__wrapper">
					{switchForm ? <SignUp /> : <SignIn />}

					<button onClick={this.switchForm}>Don't have account?</button>
				</div>
			</div>
		);
	}
}
