import React, { Component } from "react";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";

import InputComponent from "../common";

class SignIn extends Component {
	componentDidMount() {
		const token = localStorage.getItem("token");

		if (token) {
			this.setState({ token });
		}
	}

	state = {
		singIn: {
			email: {
				value: "",
				config: {
					type: "email",
					name: "email",
					placeholder: "Enter your email"
				},
				valid: false,
				touch: false,
				validation: {
					required: true
				}
			},
			password: {
				value: "",
				config: {
					type: "password",
					name: "password",
					placeholder: "Enter your password"
				},
				valid: false,
				touch: false,
				validation: {
					required: true,
					minLength: 5
				}
			}
		},
		isValid: false,
		token: null
	};

	submit = e => {
		e.preventDefault();
		const { singIn } = this.state;
		// https://test-app-a-level.herokuapp.com
		const values = Object.keys(singIn).reduce((prev, elem) => ({ ...prev, [elem]: singIn[elem].value }), {});
		console.log("values", values);

		axios({
			url: "https://test-app-a-level.herokuapp.com/auth/login",
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			data: values
		})
			.then(res => {
				this.setState({ token: res.data.token });
				localStorage.setItem("token", res.data.token);
			})
			.catch(err => console.log(err.response));
	};

	validator = (value, rules) => {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		return isValid;
	};

	change = e => {
		const { name, value } = e.target;

		this.setState(prevState => {
			const valid = this.validator(value, prevState.singIn[name].validation);

			const otherValid = Object.keys(prevState.singIn).some(el => !prevState.singIn[el].valid);

			return {
				singIn: {
					...prevState.singIn,
					[name]: {
						...prevState.singIn[name],
						value,
						touch: true,
						valid
					}
				},
				isValid: otherValid && valid
			};
		});
	};

	btnGoogle = event=>{
		console.log(this);
		axios({
			url: "https://test-app-a-level.herokuapp.com/auth/google",
			method: "GET",
		})
		.then(response=>console.log(response))
		.catch(er=>console.warn(er.response))
	}

	render() {
		const { singIn, isValid, token } = this.state;

		if (token) {
			return <Redirect to="/" />;
		}

		return (
			<div>
					<form className="auth-box__sign-in-form" onSubmit={this.submit}>
						{Object.keys(singIn).map(el => (
							<InputComponent
								key={el}
								touch={singIn[el].touch}
								valid={!singIn[el].valid}
								config={{ ...singIn[el].config, value: singIn[el].value, onChange: this.change }}
							/>
						))}
						<button disabled={!isValid} type="submit">
							Sign in
						</button>
					</form>
					<button onClick = {this.btnGoogle}>
							sigi in with google
					</button>
			</div>
		);
	}
}

export default withRouter(SignIn);
