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
    return <table>
	<thead>
	<tr>
	<th>ID</th>
	<th>Name</th>
	<th>Email</th>
	<th>Phone</th>
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
    
    return <form id='newUser' onSubmit={event => {
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
	<input type='text' id='name' name='name' placeholder='Name' value={name}
    onChange={event => {
	setName(event.target.value);
    }}/>
	<br/>
	<label htmlFor='email'>Email:</label>
	<input type='email' id='email' name='email' placeholder='Email' value={email}
    onChange={event => {
	setEmail(event.target.value);
    }}/>
	<br/>
	<label htmlFor='phone'>Phone:</label>
	<input type='text' id='phone' name='phone' placeholder='Phone' value={phone}
    onChange={event => {
	setPhone(event.target.value);
    }}/>
	<br/>
	<button className='submitBtn' type='submit'
    disabled={!valid(name, email, phone)}>Submit</button>
	<button className='cancelBtn' type='button' onClick={event => {
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
    
    return <>
	<Users users={users} removeUser={removeUser} editing={editing}
    setEditing={setEditing}/>
	<NewUserForm users={users} addUser={addUser} replaceUser={replaceUser} editing={editing}
    setEditing={setEditing}/>
	</>;
}

ReactDOM.render(<App name='Signup with Browserify'/>,
		document.getElementById('root'));
