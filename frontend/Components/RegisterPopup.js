import React from 'react';
import Button from 'material-ui-next/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui-next/Dialog';

class RegisterPopup extends React.Component {
  state = {
    open: false,
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({open: nextProps.open})
  }

  handleClose = () => {
    this.props.close();
  };

  render() {
    return (
      <div style={{display: this.state.open ? 'block' : 'none'}}>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Registered Successfully!"}</DialogTitle>
          <DialogContent style={{paddingBottom: '0px'}}>
            <DialogContentText id="alert-dialog-description">
              You will need to verify you account by clicking the link sent to your email before you are able to login.
            </DialogContentText>
          </DialogContent>
          <div style={{textAlign: 'center', display: 'inline', height:'5em'}}>
            <Button href='https://mail.yahoo.com'  target="_blank" style={{width:'5em', padding: '0px',height: '100%'}}>
                <img src="https://fthmb.tqn.com/jubrHZ20wfDE9zneB60bxNH_DLs=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/yahoo-purple-56a2899f5f9b58b7d0cbe69d.jpg" style={{width: '5em', height: '100%'}}/>
            </Button>
            <Button href='https://mail.google.com'  target="_blank" style={{width:'5em', padding: '0px', height: '100%'}}>
                <img src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gmail_logo.max-2800x2800.png" style={{width: '5em', height: '100%'}}/>
            </Button>
          </div>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default RegisterPopup;