import React from "react";
import Modal from 'material-ui-next/Modal';
import PropTypes from 'prop-types';
import Typography from 'material-ui-next/Typography';
import Tabs, { Tab } from 'material-ui-next/Tabs';
import { withStyles } from 'material-ui-next/styles';
import Input, { InputLabel } from 'material-ui-next/Input';
import TextField from 'material-ui-next/TextField';
import { FormControl } from 'material-ui-next/Form';

const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  }
});

class LoginModal extends React.Component {
  state = {
    open: '',
    value: '0',
  }

  componentDidMount() {
    this.setState({open: true});
  }

  componentWillReceiveProps = (nextProps) => {

  }

  handleClose = () => {
    this.setState({ open: ''});
    this.props.onClose();
  };

  changeDisplay = () => {

  }

  handleTabChange = (event, value) => {
    this.setState({ value }, function(){
      this.changeDisplay();
    })
  }

  handleLogin = () => {
    this.setState({open: ''});
    this.props.loggedIn();
  }

  handleRegister = () => {
    this.setState({open: ''});
    this.props.registered();
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
          onRendered={this.changeDisplay}
        >
          <div className={classes.paper} style={{width: '80%', height: '80%'}}>
            <Tabs
              value={this.state.value}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleTabChange}
              fullWidth
            >
              <Tab label="About Experience NYC" />
              <Tab label="Instructions" />
              <Tab label="Help" />
              <Tab label="Contact Us" />
            </Tabs>
            <div style={{height: '100%'}}>
              <div>

              </div>
              <div>
                <p>
                  <Typography>
                    Have you ever wanted to go into the city and not known what to do?
                  </Typography>
                </p>
              </div>
            </div>
          </div>

        </Modal>
      </div>
    );
  }
}

const LoginModalWrapped = withStyles(styles)(LoginModal);

export default LoginModalWrapped;
