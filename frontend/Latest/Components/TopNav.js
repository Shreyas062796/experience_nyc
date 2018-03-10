import React from "react";
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import LoginModal from './LoginModal';
export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: "", loginClick: false};
  }

  state = {
    loginClick: false
  }

  handleLoginClick = () => {
    this.setState({loginClick: true});
    console.log(this.state.loginClick);
  }

  render() {
    return (
      <div>
        <AppBar
          title="ExperienceNYC"
          iconElementRight={<FlatButton onClick={this.handleLoginClick} label="Login | Signup"/>}
        />
        <LoginModal clicked={this.state.loginClick}/>
      </div>
    );
  }
}
