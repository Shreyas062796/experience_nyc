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
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui-next/Card';
import Button from 'material-ui-next/Button';

const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  }
});

class ResetModal extends React.Component {
  state = {
    open: '',
    value: '0',
    loginForm: 'block',
    registerForm: 'none',
    modalWidth: '400px',
    emailError: false
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({modalWidth: window.innerWidth <= 760 ? '90%' : '400px'});
  }

  componentWillReceiveProps = (nextProps) => {
      this.setState({open: nextProps.display});
  }

  handleClose = () => {
    this.setState({ open: ''});
    this.props.onClose();
  };

  resetPassword = () => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var email = $('#emailReset').val();
    if(!email || !re.test(String(email).toLowerCase())){
      this.setState({emailError: true})

    }
    else{
      this.setState({emailError: false})
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal
          style={{justifyContent: 'center', alignItems: 'center'}}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper} style={{width: this.state.modalWidth, textAlign: 'center'}}>
            <CardHeader
              title="Please enter your email"
              />
            <FormControl className={classes.formControl} error={this.state.emailError} style={{width:'100%'}}>
              <InputLabel FormControlClasses={{focused: classes.inputLabelFocused}} htmlFor="custom-color-input">
                Email
              </InputLabel>
              <Input classes={{inkbar: classes.inputInkbar}} id="emailReset" />
            </FormControl>
            <div style={{textAlign: "center", marginTop: '1em'}}>
              <Button id='Submit' className={classes.button}  onClick={this.resetPassword} style={{width: '25%',color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.87)'}}>
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const ResetModalWrapped = withStyles(styles)(ResetModal);

export default ResetModalWrapped;
