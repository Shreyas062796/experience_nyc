import React from "react";
import PropTypes from 'prop-types';
import Typography from 'material-ui-next/Typography';
import { withStyles } from 'material-ui-next/styles';
import IconButton from 'material-ui-next/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui-next/Input';
import TextField from 'material-ui-next/TextField';
import { FormControl } from 'material-ui-next/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import Button from 'material-ui-next/Button';
import Grid from 'material-ui-next/Grid';
import md5 from 'md5.js';
import Snackbar from 'material-ui-next/Snackbar';
import CloseIcon from 'material-ui-icons/Close';
import $ from 'jquery';
//import {md5} from 'js-md5';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '100%',
    marginTop: 20
  },
  inputLabelFocused: {
    color: 'blue',
  },
  inputInkbar: {
    '&:after': {
      backgroundColor: 'blue',
    },
  },
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  textFieldFormLabel: {
    fontSize: 18,
  }
});


class LoginForm extends React.Component {
  state = {
    display: 'block',
    showPassword: false,
    open: false,
    message: [],
    usernameError: false,
    passwordError: false
  }

  handleLoggedIn = (event, value) => {
    this.props.loggedIn();
  };

  componentWillReceiveProps(nextProps) {
    this.setState({display: nextProps.display});
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleLogin = () => {
    var data = this.validation();

    if(data == false){
      return;
    }

    $.ajax({
      url:"https://experiencenyc.herokuapp.com/authenticate",
      type:"POST",
      data: JSON.stringify(data),
      contentType:"application/json; charset=utf-8",
      dataType:"json"})
      .done((response) => {
        if(response['response'] == "True"){
          sessionStorage.setItem('username', data['username']);
          this.handleLoggedIn();
          alert("Logged In!");
        }
        else {
          alert("Incorrect Credentials!");
        }
      })
  }

  validation = () => {
    let missingFields = false;
    this.setState({message :[], passwordError: false, usernameError: false})

    var user = $('#user').val();
    if(!user){
      missingFields = true;
      this.setState({usernameError: true})
      this.state.message.push(<span>username</span>)
    }

    var password = $('#loginPassword').val();
    if(!password){
      missingFields = true;
      this.setState({passwordError: true})
      this.state.message.push(<span>password</span>)
    }

    if(missingFields){
      this.setState({open: true})
      return false;
    }

    var data = {password: password, username: user};

    return data;
  }

  handleMessage = () => {
    return this.state.message;
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container} style={{display: this.state.display, marginTop: 10}}>
        <Snackbar
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  open={this.state.open}
                  onClose={this.handleClose}
                  autoHideDuration={2000}
                  SnackbarContentProps={{
                    'aria-describedby': 'message-id',
                  }}
                  message={this.handleMessage()}
                />
              <FormControl className={classes.formControl} error={this.state.usernameError}>
          <InputLabel FormControlClasses={{focused: classes.inputLabelFocused}} htmlFor="custom-color-input">
            User Name
          </InputLabel>
          <Input classes={{inkbar: classes.inputInkbar}} id="user" />
        </FormControl>

        <FormControl className={classes.formControl} error={this.state.passwordError}>
          <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="loginPassword"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={this.handleClickShowPasssword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
        </FormControl>
        <FormControl className={classes.formControl}>
            <Grid item md={4}>
              <Typography>
                <a href="#" style={{textDecoration: "none"}}>Forgot Username or Password?</a>
              </Typography>
            </Grid>
            <div style={{textAlign: "center"}}>
              <Button id='login' className={classes.button} onClick={this.handleLogin} style={{width: '25%',color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.87)'}}>
                Login
              </Button>
            </div>
        </FormControl>
      </div>
    );
  }
}

const LoginFormWrapped = withStyles(styles)(LoginForm);

export default LoginFormWrapped;
