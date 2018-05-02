import React, { Component } from 'react';
import Button from 'material-ui-next/Button';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui-next/styles';
import Input, { InputLabel, InputAdornment } from 'material-ui-next/Input';
import Typography from 'material-ui-next/Typography';
import Directions from 'material-ui-icons/Directions';
import Save from 'material-ui-icons/Save';
import { FormGroup, FormControlLabel } from 'material-ui-next/Form';
import Checkbox from 'material-ui-next/Checkbox';
import Divider from 'material-ui-next/Divider'
import SavePopup from './SavePopup.js';

const styles = theme => ({
  button: {
    minWidth: '0px',
    color: 'rgba(0, 0, 0, 0.87)',
    border: '1px solid',
    borderRadius: '4px',
	},
	/*tripSave: {
		position: 'relative',
    //width: window.innerWidth <= 768 ? '100%' : '60%',
    textAlign: 'center',
		display: 'inline-lflex',
	},*/
	checkboxLabel: {
		fontSize: '1.5rem'
	}
});

class TripProps extends Component{	
	state={
		saveClick: false,
		tripSaved: false
	}

	componentWillReceiveProps = (nextProps) => {
		if(this.props.places != nextProps.places){
			this.isSaved();
		}
	}

	componentWillMount = () => {
		this.isSaved();
	}

	handleCheck = name => event => {
    this.setState({ [name]: event.target.checked });
	};
	
	saveClick = () => {
		if(sessionStorage.getItem('username')){
			this.setState({saveClick: true});
		}
		else{
			alert('You must be logged in to save a trip!')
		}
	};
	
	handleSave = () => {
    this.setState({saveClick: false});
	};

	getPlaceIds = () => {
    let places = [];

    this.props.places.forEach(function(element) {
        places.push(element['props']['value']['place_id'])
    })
    return places;
	}
	
	isSaved = () => {
		let exists = false;
		let ref = this;
		if(sessionStorage.getItem('username')){
			let placeIds = this.getPlaceIds();

			var data = {
				placeIds: placeIds,
				username: sessionStorage.getItem('username'),
			}
			$.ajax({
					url:"https://experiencenyc.herokuapp.com/trips/tripIsSaved",
					type:"POST",
					data: JSON.stringify(data),
					contentType:"application/json; charset=utf-8",
					dataType:"json"})
					.done(function(response){
							if(response['response'] == "True"){
								ref.setState({tripSaved: true})
							}
							else if(response['response'] == "False"){
								ref.setState({tripSaved: false})
							}
					})
		}
		else{
			ref.setState({tripSaved: false})
		}
	}

  render() {
		const { classes } = this.props;

    return (
	<div style={{width: '100%'}}>
		{/*<div style={{display: 'table-cell', verticalAlign: 'middle', width: '100%'}}>
			<Typography variant="title" color="inherit" noWrap style={{fontWeight: '400', fontSize: '2rem', color: 'rgba(0, 0, 0, 0.87)'}}>
				Save Your Trip
			</Typography>
			<InputLabel style={{fontSize: '1.5rem', color: 'rgba(0, 0, 0, 0.87)'}}>
				Trip Name:
			</InputLabel>
			<Input id="tripName" style={{textAlign: 'center', marginLeft: '1em'}}/>

			<FormControlLabel
					classes={{label: classes.checkboxLabel}}
          control={
            <Checkbox
							style={{marginLeft: '1em', color: '#3f51b5', fontSize: '30px'}}
              checked={this.state.checked}
              onChange={this.handleCheck('checked')}
              value="checked"
            />
					}
          label="Public"
      />
			<Button onClick = {this.handleSave.bind(this)} style={{color: 'white', backgroundColor: '#3f51b5'}}>
				Save
			</Button>
				</div>*/}
		<SavePopup open={this.state.saveClick} close={this.handleSave} places={this.props.places} updateSaved={this.isSaved}/>
		<div style={{display: 'inline-flex', width: '100%', height: '100%'}}>
			<Button  disabled={this.state.tripSaved ? true : false}  onClick={this.saveClick} style={{paddingTop: 0, paddingBottom: 0, height: '100%', width: '100%', backgroundColor: '#5d6382', color: 'white', fontSize: '2rem', borderRadius: '0px'}}>
			 {this.state.tripSaved ? 'Saved' : 'Save'}
			<Save style={{width: '35px', height: '35px', color: 'white'}}/>
			</Button>
			<Button href={"https://www.google.com/maps/dir/?api=1&waypoints=" + this.props.locations} target="_blank" style={{paddingTop: 0, paddingBottom: 0, height: '100%', width: '100%', backgroundColor: '#3f51b5', color: 'white', fontSize: '2rem', borderRadius: '0px'}}>
				Start
				<Directions style={{width: '35px', height: '35px', color: 'white'}}/>
			</Button>
		</div>
	</div>
    );
  }
}

TripProps.propTypes = {
  classes: PropTypes.object.isRequired,
};

const wrapped = withStyles(styles)(TripProps);

export default wrapped;