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
import Snackbar from 'material-ui-next/Snackbar';
import Tooltip from 'material-ui-next/Tooltip';
import Info from 'material-ui-icons/Info';
import md5 from 'md5.js';

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
  },
  snackbar: {
    backgroundColor: 'white',
    minWidth: 0
  }
});

class RegisterForm extends React.Component {
  state = {
    display: 'none',
    showPassword: false,
    open: false,
    message: [],
    first_nameError: false,
    last_nameError: false,
    emailError: false,
    usernameError: false,
    passwordError: false,
    tooltipOpen: false,
    confirmPasswordError: false
  }

  componentWillReceiveProps(nextProps) {
    this.setState({display: nextProps.display});
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleRegistered = (event, value) => {
    this.props.registered();
  };

  handleRegister = (event) => {
      event.preventDefault();
      var data = this.validation();

      if(data == false){
        return;
      }

      $.ajax({
        url:"https://experiencenyc.herokuapp.com/users/createuser",
        type:"POST",
        data: JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        dataType:"json"})
        .done((response) => {
          if(response['response'] == "True"){
            alert("Registered Successfully! You will need to verify you account by clicking the link sent to your email before you are able to login");
            this.handleRegistered();
          }
          else {
            alert("Registration Failed!");
          }
        })
  }

  validation = () => {
    let missingFields = false;
    this.setState({message :[], first_nameError: false, last_nameError: false, emailError: false, passwordError: false, usernameError: false, confirmPasswordError: false})

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    var firstName = $('#first_name').val();
    if(!firstName){
      missingFields = true;
      this.setState({first_nameError: true})

      let tempMessage = this.state.message;
      tempMessage.push(<Typography style={{color: 'red'}}>Invalid First Name</Typography>);
      tempMessage.push(<br />);
      this.setState({message: tempMessage});
    }

    var lastName = $('#last_name').val();
    if(!lastName){
      missingFields = true;
      this.setState({last_nameError: true})
      let tempMessage = this.state.message;
      tempMessage.push(<Typography style={{color: 'red'}}>Invalid Last Name</Typography>);
      tempMessage.push(<br />);
      this.setState({message: tempMessage});
    }

    var email = $('#email').val();
    if(!email || !re.test(String(email).toLowerCase())){
      missingFields = true;
      this.setState({emailError: true})
      let tempMessage = this.state.message;
      tempMessage.push(<Typography style={{color: 'red'}}>Invalid Email</Typography>);
      tempMessage.push(<br />);
      this.setState({message: tempMessage});
    }

    var username = $('#username').val();
    if(!username){
      missingFields = true;
      this.setState({usernameError: true})
      let tempMessage = this.state.message;
      tempMessage.push(<Typography style={{color: 'red'}}>Invalid Username</Typography>);
      tempMessage.push(<br />);
      this.setState({message: tempMessage});
    }

    var password = $('#registerPassword').val();
    if(!this.isOkPass(password)){
      missingFields = true;
      this.setState({passwordError: true})
      let tempMessage = this.state.message;
      tempMessage.push(<Typography style={{color: 'red'}}>Invalid Password</Typography>);
      tempMessage.push(<br />);
      this.setState({message: tempMessage});
    }

    var confirmPassword = $('#confirmPassword').val();
    if(password != confirmPassword){
      missingFields = true;
      this.setState({confirmPasswordError: true})
      let tempMessage = this.state.message;
      tempMessage.push(<Typography style={{color: 'red'}}>Passwords Don't Match</Typography>);
      tempMessage.push(<br />);
      this.setState({message: tempMessage});
    }
    if(missingFields){
      this.setState({open: true})
      return false;
    }

    var data = {firstName: firstName, lastName: lastName, username: username, password: password, email: email};

    return data;
  }

  isOkPass(p){
    var anUpperCase = /[A-Z]/;
    var aLowerCase = /[a-z]/;
    var aNumber = /\d/;
    var aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    if( (p.length < 8)  || !anUpperCase.test(p) || !aLowerCase.test(p) || !aNumber.test(p) || !aSpecial.test(p) ){
      return false;
    }
    else {
      return true;
    }
  }

  handleMessage = () => {
    return this.state.message;
  }

  handleClose = (event, reason) => {
    this.setState({message: []});
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  handleTooltipClose = () => {
    this.setState({ tooltipOpen: false });
  };

  handleTooltipOpen = () => {
    this.setState({ tooltipOpen: true });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container} style={{display: this.state.display, marginTop: 10}}>
        <Snackbar
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            open={this.state.open}
            onClose={this.handleClose}
            autoHideDuration={2000}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
              className: classes.snackbar,
            }}
            message={this.handleMessage()}
          />
        <form className="form" onSubmit={this.handleRegister}>
          <FormControl className={classes.formControl} style={{width: '50%'}} error={this.state.first_nameError}>
            <InputLabel  htmlFor="first_name">
              First Name
            </InputLabel>
            <Input classes={{inkbar: classes.inputInkbar}} id="first_name" />
          </FormControl>

          <FormControl className={classes.formControl} style={{width: '50%'}} error={this.state.last_nameError}>
            <InputLabel  htmlFor="custom-color-input">
              Last Name
            </InputLabel>
            <Input classes={{inkbar: classes.inputInkbar}} id="last_name" />
          </FormControl>

          <FormControl className={classes.formControl} error={this.state.emailError}>
            <InputLabel htmlFor="custom-color-input">
              Email
            </InputLabel>
            <Input classes={{inkbar: classes.inputInkbar}} id="email" />
          </FormControl>

          <FormControl className={classes.formControl} error={this.state.usernameError}>
            <InputLabel htmlFor="custom-color-input">
              Username
            </InputLabel>
            <Input classes={{inkbar: classes.inputInkbar}} id="username" />
          </FormControl>

          <FormControl className={classes.formControl} error={this.state.passwordError}>
            <InputLabel htmlFor="registerPassword">
              Password
            </InputLabel>
            <Input
              id="registerPassword"
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
                  <Tooltip
                  id="tooltip-controlled"
                  title="Password needs to be at least 8 characters long and must contain an upper case, lower case, number, and special character."
                  onClose={this.handleTooltipClose}
                  enterDelay={200}
                  leaveDelay={200}
                  onOpen={this.handleTooltipOpen}
                  open={this.state.tooltipOpen}
                  placement="top"
                >
                  <IconButton aria-label="Delete">
                    <Info />
                  </IconButton>
                </Tooltip>
                </InputAdornment>
              }
            />

          </FormControl>
          <FormControl className={classes.formControl} error={this.state.confirmPasswordError}>
            <InputLabel htmlFor="confirm password">Confirm Password</InputLabel>
            <Input
              id="confirmPassword"
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
              <div style={{textAlign: "center"}}>
                <Button id="register" className={classes.button} type="submit" style={{width: '25%',color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.87)'}}>
                  Register
                </Button>
              </div>
          </FormControl>
        </form>
      </div>
    );
  }
}

const RegisterFormWrapped = withStyles(styles)(RegisterForm);

export default RegisterFormWrapped;
