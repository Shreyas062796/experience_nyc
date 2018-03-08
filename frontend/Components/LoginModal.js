import React from "react";
import Modal from 'material-ui-next/Modal';
import PropTypes from 'prop-types';
import Typography from 'material-ui-next/Typography';
import Tabs, { Tab } from 'material-ui-next/Tabs';
import { withStyles } from 'material-ui-next/styles';
import Input, { InputLabel } from 'material-ui-next/Input';
import TextField from 'material-ui-next/TextField';
import { FormControl } from 'material-ui-next/Form';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  }
});

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
      //console.log(nextProps);
      this.setState({open: nextProps, value: 0});
  }

  state = {
    open: false,
    value: 0,
    loginForm: 'block',
    registerForm: 'none'
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleTabChange = (event, value) => {
    console.log(value);
    this.setState({ value });
    if(this.state.value == 1){
      this.setState({loginForm: 'block',
                     registerForm: 'none'})
    }
    else if(this.state.value == 0){
      this.setState({loginForm: 'none',
                     registerForm: 'block'})
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal style={{justifyContent: 'center', alignItems: 'center'}}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <Tabs
              value={this.state.value}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleTabChange}
              fullWidth
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
              <LoginForm display={this.state.loginForm}/>
              <RegisterForm display={this.state.registerForm}/>
          </div>
        </Modal>
      </div>
    );
  }
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> master
}

const LoginModalWrapped = withStyles(styles)(LoginModal);

export default LoginModalWrapped;
<<<<<<< HEAD
=======
=======
}
>>>>>>> master
>>>>>>> master
