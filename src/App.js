import React, { Component } from 'react';
import './App.css';
import Persons from './components/persons';

class App extends Component {
	// id, name, email address, and phone number
	state = {
		persons: [
			{ id: 1, name: "John Doe", email: "xxx@yyy.fi", phone: "000-000 000" },
			{ id: 2, name: "John Doe", email: "xxx@yyy.fi", phone: "000-000 000" },
			{ id: 3, name: "John Doe", email: "xxx@yyy.fi", phone: "000-000 000" },
			{ id: 4, name: "John Doe", email: "xxx@yyy.fi", phone: "000-000 000" },
			{ id: 5, name: "John Doe", email: "xxx@yyy.fi", phone: "000-000 000" },
			{ id: 6, name: "John Doe", email: "xxx@yyy.fi", phone: "000-000 000" }
		]
	};

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1>Hard Software</h1>
				</header>
				<div className="ContentWrapper">
				<h2>List of participants</h2>
				<div className="AddPerson">
					<input type="text" name="name" value="Full name" />
					<input type="text" name="name" value="E-mail address"/>
					<input type="text" name="name" value="Phone number" />
					<button>Add New</button>
				</div>
				<div className="Container">
					<Persons/>
				</div>
				</div>
			</div>
		);
	}
}

export default App;
