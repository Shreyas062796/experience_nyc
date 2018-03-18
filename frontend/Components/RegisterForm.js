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

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '100%'
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

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.setState({display: 'none'})
  }

  state = {
    display: 'none',
    showPassword: false
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

  componentDidMount = () => {
    $('#register').on('click', function() {
      var firstName = $('#first_name').val();
      var lastName = $('#last_name').val();
      var username = $('#username').val();
      var password = $('#password').val();
      var email = $('#email').val();
      var data = {type: "Register", firstName: firstName, lastName: lastName, username: username, password: password, email: email};

      $.post( "https://enyc-m.herokuapp.com/createuser", JSON.stringify(data))
       .done(function( response ) {
         if(response == "True"){
           alert("Registered Successfully!");
         }
         else {
           alert("Registration Failed!");
         }
      });
    })
  }

  login(data){

  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container} style={{display: this.state.display, marginTop: 10}}>

        <FormControl className={classes.formControl} style={{width: '50%'}}>
          <InputLabel FormControlClasses={{focused: classes.inputLabelFocused}} htmlFor="custom-color-input">
            First Name
          </InputLabel>
          <Input classes={{inkbar: classes.inputInkbar}} id="first_name" />
        </FormControl>

        <FormControl className={classes.formControl} style={{width: '50%'}}>
          <InputLabel FormControlClasses={{focused: classes.inputLabelFocused}} htmlFor="custom-color-input">
            Last Name
          </InputLabel>
          <Input classes={{inkbar: classes.inputInkbar}} id="last_name" />
        </FormControl>

        <FormControl className={classes.formControl} >
          <InputLabel FormControlClasses={{focused: classes.inputLabelFocused}} htmlFor="custom-color-input">
            Email
          </InputLabel>
          <Input classes={{inkbar: classes.inputInkbar}} id="email" />
        </FormControl>

        <FormControl className={classes.formControl} >
          <InputLabel FormControlClasses={{focused: classes.inputLabelFocused}} htmlFor="custom-color-input">
            Username
          </InputLabel>
          <Input classes={{inkbar: classes.inputInkbar}} id="username" />
        </FormControl>

        <FormControl className={classes.formControl} >
          <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
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
        <FormControl className={classes.formControl} style={{marginTop: 25}}>
          <Grid container>
            <Grid item md={4}>
              <a href="#">Forgot Username or Password?</a>
            </Grid>
            <Grid item md={4} style={{textAlign: "center"}}>
              <Button href="#" id="register" className={classes.button} style={{width: '25%',color: 'white', backgroundColor: 'rgb(0, 188, 212)'}}>
                Register
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </div>
    );
  }
}

const RegisterFormWrapped = withStyles(styles)(RegisterForm);

export default RegisterFormWrapped;
