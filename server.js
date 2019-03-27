#!/usr/bin/env node

'use strict';

const express = require('express');
const path = require('path');
const app = express();
const random = require('./random.js');
const PORT = 3000;

app.get('/random-users', (req, res) => {
    let amount = 20;
    try {
	let amount2 = parseInt(req.query.n, 10);
	if(!isNaN(amount2)) {
	    amount=amount2;
	}
    } catch (er) {
	console.log(`Using default amount: ${amount}`);
    }
    const randomUsers = [];
    for(let i=0; i<amount; i++) {
	const randomUser = {};
	randomUser.id = i;
	randomUser.name = random.randomName();
	randomUser.email = random.randomEmail();
	randomUser.phone = random.randomPhone();
	randomUsers.push(randomUser);
    }
    res.jsonp(randomUsers);
});

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
