import React from "react";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="page-footer" style={{backgroundColor: '#333333'}}>
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">This is our footer</h5>
            <p className="grey-text text-lighten-4">I wish I knew what I should put in our footer</p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">About Us</h5>
            <ul>
              <li><a className="grey-text text-lighten-3" href="#!">Team</a></li>
              <li><a className="grey-text text-lighten-3" href="#!">Mission</a></li>
              <li><a className="grey-text text-lighten-3" href="#!">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2014 Copyright Text
          <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
        </div>
      </div>
    </footer>
    );
  }
}
