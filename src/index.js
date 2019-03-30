'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

function Rows(props) {
    return props.users.map((row, rowIndex) => {
	const editingStyle = {
	    backgroundColor: 'red'
	}
	return <tr key={row.id} style={props.editing === rowIndex ? editingStyle : {}}>
	    <td>{row.id}</td>
	    <td>{row.name}</td>
	    <td>{row.email}</td>
	    <td>{row.phone}</td>
	    <td><i id={'e_' + rowIndex} className='fas fa-edit' onClick={event => {
		props.setEditing(parseInt(/^e_(\d+)/.exec(event.target.id)[1], 10));
	    }}></i></td>
	    <td><i id={'r_' + rowIndex} className='fas fa-trash' onClick={event => {
		const toBeRemoved = parseInt(/^r_(\d+)/.exec(event.target.id)[1], 10);
		props.removeUser(toBeRemoved);
	    }}></i></td>
	    </tr>
    });
}

function Users(props) {
    const [sortedBy, setSortedBy] = React.useState(['id', true]);

    function sortedByArrow(str) {
	if(str === sortedBy[0]) {
	    return sortedBy[1] ?
		<i className='fas fa-angle-down'></i> :
		<i className='fas fa-angle-up'></i>;
	} else {
	    return null;
	}
    }

    function changeSortedBy(str) {
	return event => {
	    if(str === sortedBy[0]) {
		setSortedBy([sortedBy[0], !sortedBy[1]]);
	    } else {
		setSortedBy([str, true]);
	    }
	};
    }

    React.useEffect(() => {
	props.sortUsers(sortedBy);
    }, [sortedBy]);

    return <table className='w3-table-all'>
	<thead>
	<tr>
	<th onClick={changeSortedBy('id')}> ID {sortedByArrow('id')}</th>
	<th onClick={changeSortedBy('name')}> Name {sortedByArrow('name')}</th>
	<th onClick={changeSortedBy('email')}> Email {sortedByArrow('email')}</th>
	<th onClick={changeSortedBy('phone')}> Phone {sortedByArrow('phone')}</th>
	<th/>
	<th/>
	</tr>
	</thead>
	<tbody>
	<Rows users = {props.users} removeUser = {props.removeUser}
    editing={props.editing} setEditing={props.setEditing}/>
	</tbody>
	</table>;
}

function NewUserForm(props) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('+358');

    React.useEffect(() => {
	if(props.editing >= 0) {
	    setName(props.users[props.editing].name);
	    setEmail(props.users[props.editing].email);
	    setPhone(props.users[props.editing].phone);
	}
    }, [props.editing]);

    function valid(name, email, phone) {
	return (name.length > 0 && /@/.test(email) && /^\+\d{4}/.test(phone));
    }
    
    return <form className='w3-container' id='newUser' onSubmit={event => {
	event.preventDefault();
	if(props.editing >= 0) {
	    props.replaceUser(props.editing, name, email, phone);
	    props.setEditing(-1);
	} else {
	    props.addUser(name, email, phone);
	}
	setName('');
	setEmail('');
	setPhone('+358');
    }}>
	<label htmlFor='name'>Name:</label>
	<input className='w3-input' type='text' id='name' name='name'
    placeholder='Name' value={name}
    onChange={event => {
	setName(event.target.value);
    }}/>
	<label htmlFor='email'>Email:</label>
	<input className='w3-input' type='email' id='email' name='email'
    placeholder='Email' value={email}
    onChange={event => {
	setEmail(event.target.value);
    }}/>
	<label htmlFor='phone'>Phone:</label>
	<input className='w3-input' type='text' id='phone' name='phone'
    placeholder='Phone' value={phone}
    onChange={event => {
	setPhone(event.target.value);
    }}/>
	<button className='w3-btn w3-blue w3-margin submitBtn' type='submit'
    disabled={!valid(name, email, phone)}>Submit</button>
	<button className='w3-btn w3-pale-yellow w3-margin cancelBtn' type='button' onClick={event => {
	    props.setEditing(-1);
	    setName('');
	    setEmail('');
	    setPhone('+358');
	}}>Cancel</button>
	</form>
}

function App(props) {
    const [users, setUsers] = React.useState([]);
    const [editing, setEditing] = React.useState(-1);

    React.useEffect(() => {
	$.getJSON('/random-users', function(data) {
	    setUsers(data);
	});
    }, []);

    function addUser(name, email, phone) {
	let tmpUsers = [...users];
	let maxId = 0;
	for(let i=0;i<tmpUsers.length;i++) {
	    if(tmpUsers[i].id > maxId) {
		maxId = tmpUsers[i].id;
	    }
	}
	tmpUsers.push({
	    id: maxId + 1,
	    name,
	    email,
	    phone
	});
	setUsers(tmpUsers);
    }
    
    function replaceUser(index, name, email, phone) {
	let tmpUsers = [...users];
	tmpUsers[index] = {
	    id: tmpUsers[index].id,
	    name,
	    email,
	    phone
	};
	setUsers(tmpUsers);
    }
    
    function removeUser(index) {
	let tmpUsers = [...users];
	tmpUsers.splice(index, 1);
	setUsers(tmpUsers);
    }

    function sortUsers(sortedBy) {
	let tmpUsers = [...users];
	if(sortedBy[0] === 'id') {
	    tmpUsers.sort((x, y) => {
		if(sortedBy[1]) {
		    return x.id-y.id;
		} else {
		    return y.id-x.id;
		}
	    });
	}
	setUsers(tmpUsers);
    }
    
    return <>
	<h1>Signup with Browserify</h1>
	<hr/>
	<Users users={users} removeUser={removeUser} sortUsers={sortUsers}
    editing={editing} setEditing={setEditing}/>
	<NewUserForm users={users} addUser={addUser} replaceUser={replaceUser}
    editing={editing} setEditing={setEditing}/>
	</>;
}

ReactDOM.render(<App name='Signup with Browserify'/>,
		document.getElementById('root'));
