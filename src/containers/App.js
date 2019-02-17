import React, { Component } from "react";
import "./App.css";

import axios from "axios";

class App extends Component {
	state = { category: [] };

	async componentDidMount() {
		try {
			const token = localStorage.getItem("token");
			const response = await axios({
				url: "https://test-app-a-level.herokuapp.com/category",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				params: {
					page: 1,
					size: 50
				}
			});
			this.setState({ category: response.data.category });
			console.log("response", response);
		} catch (e) {
			console.log("e", e.response);
		}
		// console.log("this.", this.props);
	}

	render() {
		const { category } = this.state;
		return (
			<div className="App">
				<header className="App-header">
					<p className="foo">
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
						Learn React
					</a>
				</header>

				{category.map(el => (
					<div key={el._id}>
						<p>{el.name}</p>
					</div>
				))}
			</div>
		);
	}
}

export default App;
