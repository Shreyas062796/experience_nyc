import React from "react";

const loggedOut = <li><a className="modal-trigger" href="#loginModal">Login | Signup</a></li>;
const loggedIn = <li><a className="modal-trigger" href="#loginModal"></a></li>;

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: ""};
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav className="nav-extended" style={{backgroundColor: '#333333'}}>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo"></a>
            <a className="center">Experience NYC</a>
            <ul className="right hide-on-med-and-down">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              {loggedOut}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
