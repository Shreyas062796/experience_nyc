import React from "react";
import Modal from 'material-ui-next/Modal';
import PropTypes from 'prop-types';
import Typography from 'material-ui-next/Typography';
import Tabs, { Tab } from 'material-ui-next/Tabs';
import { withStyles } from 'material-ui-next/styles';
import Input, { InputLabel } from 'material-ui-next/Input';
import TextField from 'material-ui-next/TextField';
import { FormControl } from 'material-ui-next/Form';
import NavigateNext from 'material-ui-icons/NavigateNext';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import IconButton from 'material-ui-next/IconButton';


const styles = theme => ({
  paper: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: '80%',
    height: '80%'
  }
});

class PhotoModal extends React.Component {
  state = {
    open: '',
    value: '0',
    photos: [],
    photoIndex: 0
  }

  componentDidMount() {
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({open: nextProps.open, photos: nextProps.photos, photoIndex: 0})
  }

  handleClose = () => {
    this.setState({ open: ''});
    this.props.onClose();
  };

  getPhoto = () => {
    if(this.state.photos[0])
      return this.state.photos[0][this.state.photoIndex];
  }

  nextPhoto = () => {
    var temp = this.state.photoIndex;
    temp += 1;
    this.setState({photoIndex: temp})
  }

  prevPhoto = () => {
    var temp = this.state.photoIndex;
    temp -= 1;
    this.setState({photoIndex: temp})
  }

  notLastPhoto = () => {
    if(this.state.photos[0])
      if(this.state.photoIndex != (this.state.photos[0].length-1)){
        return true;
      }
      else{
        return false;
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
          onRendered={this.changeDisplay}
        >
          <div className={classes.paper}>
            {this.getPhoto()}
            {this.notLastPhoto() ? <IconButton onClick={this.nextPhoto} style={{position: 'absolute',left:'85%',top: '45%', zIndex: 10,height: '5em', width: '5em', backgroundColor: '#ffffff4a'}}>
              <NavigateNext style={{height: '5em', width: '5em', color: 'rgba(255, 255, 255, 0.5)'}}/>
            </IconButton> : false}
            {this.state.photoIndex != 0 ? <IconButton onClick={this.prevPhoto} style={{position: 'absolute',left:'5%',top: '45%', zIndex: 10,height: '5em', width: '5em', backgroundColor: '#ffffff4a'}}>
              <NavigateBefore style={{height: '5em', width: '5em', color: 'rgba(255, 255, 255, 0.5)'}}/>
            </IconButton> : false}
        </div>
        </Modal>
      </div>
    );
  }
}

const PhotoModalWrapped = withStyles(styles)(PhotoModal);

export default PhotoModalWrapped;
