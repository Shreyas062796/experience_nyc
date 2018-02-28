import React from "react";

export default class LoginModal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    $('.tabs').tabs();
  }

  render() {
    return (
      <div id="loginModal" className="modal" style={{width: '45%', maxHeight: '100%',overflowY: 'hidden', backgroundImage: 'url("./newYork.jpg")'}}>
        <div className="modal-content">
          <ul className="tabs tabs-fixed-width z-depth-1">
            <li className="tab"><a className="active" href="#login">Login</a></li>
            <li className="tab"><a href="#register">Register</a></li>
          </ul>

          <div className="card-panel" id="login">
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <input id="user" className="validate" />
                    <label htmlFor="user">Username or Email</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="loginPassword" type="password" className="validate" />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                <div className="row center">
                  <button className="btn waves-effect waves-light" type="submit" name="action" id="login">Login
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="card-panel" id="register">
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s6">
                    <input id="first_name" type="text" className="validate" />
                    <label htmlFor="first_name">First Name</label>
                  </div>
                  <div className="input-field col s6">
                    <input id="last_name" type="text" className="validate" />
                    <label htmlFor="last_name">Last Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="username" className="validate" />
                    <label htmlFor="username">Username</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="registrationPassword" type="password" className="validate" />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="registrationEmail" type="email" className="validate" />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="row center">
                  <button className="btn waves-effect waves-light" type="submit" name="action" id="register">Register
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
