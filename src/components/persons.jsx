import React, { Component } from "react";
import Person from './person';
// import Counter from "./counter";

class Persons extends Component {
  render() {
    // const { persons } = this.props;
    // console.log(this.props);
    return (
      <React.Fragment>
      <table>
      <thead>
      <tr>
      <th>Name</th><th>E-mail address</th><th>Phone number</th><th> </th>
      </tr>
      </thead>
      <tbody>
        <Person/>
        <Person/>
        <Person/>
      </tbody>
      </table>
      </React.Fragment>
    );
  }
}

export default Persons;
