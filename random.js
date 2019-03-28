'use strict';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function randomMember(str) {
    return str[getRandomInt(str.length)];
}

function randomNumber() {
    return randomMember('0123456789');
}

function randomCharacter() {
    return randomMember('abcdefghijklmnopqrstuvwxyz');
}

const random = {
    randomName: function() {
	let name = '';
	for(let i=0;i<10;i++) {
	    name += randomCharacter();
	}
	return name;
    },
    randomEmail: function() {
	let email = '';
	for(let i=0;i<10;i++) {
	    email += randomCharacter();
	}
	email += '@';
	for(let i=0;i<5;i++) {
	    email += randomCharacter();
	}
	email += '.com';
	return email;
    },
    randomPhone: function() {
	let phone = '+';
	for(let i=0;i<3;i++) {
	    phone += randomNumber();
	}
	for(let i=0;i<8;i++) {
	    phone += randomNumber();
	}
	return phone;
    }
};

module.exports = random;
