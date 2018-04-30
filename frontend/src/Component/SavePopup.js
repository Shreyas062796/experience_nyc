import React from 'react';
import Button from 'material-ui-next/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui-next/Dialog';
import { FormGroup, FormControlLabel, FormControl } from 'material-ui-next/Form';
import Input, { InputLabel, InputAdornment } from 'material-ui-next/Input';
import Checkbox from 'material-ui-next/Checkbox';
import IconButton from 'material-ui-next/IconButton';
import Tooltip from 'material-ui-next/Tooltip';
import Info from 'material-ui-icons/Info';

class SavePopup extends React.Component {
  state = {
    open: false,
    checked: false,
    tripNameError: false,
    tooltipOpen: false
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({open: nextProps.open})
  }

  handleClose = () => {
    this.props.close();
  };

  handleCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleTooltipClose = () => {
    this.setState({ tooltipOpen: false });
  };

  handleTooltipOpen = () => {
    this.setState({ tooltipOpen: true });
  };

  getPlaceIds = () => {
    let places = [];

    this.props.places.forEach(function(element) {
        places.push(element['props']['value']['place_id'])
    })
    return places;
  }

  handleSave = () => {
    this.setState({tripNameError: false})
    let placeIds = this.getPlaceIds();
    let tripName = $('#tripName').val();

    if(!tripName){
        this.setState({tripNameError: true})
        return;
    }

    var data = {
        placeIds: placeIds,
        trip_name: tripName,
        public: this.state.checked,
        username: sessionStorage.getItem('username'),
    }
    $.ajax({
        url:"https://experiencenyc.herokuapp.com/trips/createtrip",
        type:"POST",
        data: JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        dataType:"json"})
        .done((response) => {
            console.log(response);
            if(response['response'] == "Trip Added"){
                alert("Trip was saved!");
                this.props.updateSaved();
                this.handleClose();
            }
            else if(response['response'] == "Trip already exists"){
                alert("Trip already exists!");
            }
        })
}

  render() {
    return (
      <div style={{display: this.state.open ? 'block' : 'none'}}>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Save Your Trip"}</DialogTitle>
          <DialogContent style={{paddingBottom: '0px'}}>
            <DialogContentText id="alert-dialog-description">
                <FormControl style={{display: 'block'}} error={this.state.tripNameError}>
                    <InputLabel  htmlFor="tripName">
                    Trip Name
                    </InputLabel>
                    <Input id="tripName" />
                </FormControl>

                <FormControl style={{display: 'block'}}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                            style={{color: '#3f51b5', fontSize: '30px'}}
                            checked={this.state.checked}
                            onChange={this.handleCheck('checked')}
                            value="checked"
                            />
                                    }
                        label="Public"
                    />
                    <Tooltip
                        id="tooltip-controlled"
                        title="If you choose public, your trip will be searchable by others."
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
                </FormControl>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSave} color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default SavePopup;