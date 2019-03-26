import React, { Component } from "react";
// import Counter from "./counter";

class Person extends Component {
  render() {
     // const { persons } = this.props;
     console.log(this.props);
    return (
      <React.Fragment>
      <tr>
      <td>name</td>
      <td>email</td>
      <td>phone</td>
      <td>
      <button className="CancelBtn">Cancel</button>
      <button className="SaveBtn">Save</button>
      </td>
      </tr>
      </React.Fragment>
    );
  }
}

export default Person;
