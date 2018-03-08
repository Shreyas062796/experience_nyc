import React from "react";
import FlatButton from 'material-ui/FlatButton';
<<<<<<< HEAD
import AppBar from 'material-ui-next/AppBar';
import Typography from 'material-ui-next/Typography';
import Toolbar from 'material-ui-next/Toolbar';
import LoginModal from './LoginModal';
import Place from 'material-ui-icons/Place';

=======
import AppBar from 'material-ui/AppBar';
import LoginModal from './LoginModal';
>>>>>>> master
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
<<<<<<< HEAD
  //iconElementRight={<FlatButton onClick={this.handleLoginClick} label="Login | Signup"/>}
  //iconElementRight={<Place onClick={this.handleLoginClick} label="Trips"/>}
  render() {
    return (
      <div>
        <AppBar>
          <Toolbar>
            <Typography variant="title" color="inherit">
              Experience NYC
            </Typography>
          </Toolbar>
        </AppBar>
=======

  render() {
    return (
      <div>
        <AppBar
          title="ExperienceNYC"
          iconElementRight={<FlatButton onClick={this.handleLoginClick} label="Login | Signup"/>}
        />
>>>>>>> master
        <LoginModal clicked={this.state.loginClick}/>
      </div>
    );
  }
}
