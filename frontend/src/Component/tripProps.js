import React, { Component } from 'react';
import Button from 'material-ui-next/Button';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui-next/styles';
import Input, { InputLabel, InputAdornment } from 'material-ui-next/Input';
import Typography from 'material-ui-next/Typography';
import Directions from 'material-ui-icons/directions';
import { FormGroup, FormControlLabel } from 'material-ui-next/Form';
import Checkbox from 'material-ui-next/Checkbox';
import Divider from 'material-ui-next/Divider'

const styles = theme => ({
  button: {
    minWidth: '0px',
    color: 'rgba(0, 0, 0, 0.87)',
    border: '1px solid',
    borderRadius: '4px',
	},
	tripSave: {
		position: 'absolute',
    bottom: 0,
    width: '60%',
    textAlign: 'center',
    left: 0,
		display: 'table',
		height: '10%',
		boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
	},
	checkboxLabel: {
		fontSize: '1.5rem'
	}
});

class TripProps extends Component{	
	state={
		checked: false
	}
	
	handleClick(){

		let placeIds = this.getPlaceIds();
		let tripName = $('tripName').val();

		if(sessionStorage.getItem('username')){
			var data = {
				placeIds: [],
				trip_name: tripName,
				public: this.state.checked,
				username: sessionStorage.getItem('username'),
			}

			$.ajax({
				url:"https://experiencenyc.herokuapp.com/createtrip",
				type:"POST",
				data: JSON.stringify(data),
				contentType:"application/json; charset=utf-8",
				dataType:"json"})
				.done((response) => {
					if(response['response'] == "True"){
						alert("Trip was saved!");
					}
					else {
						alert("Trip failed to save!");
					}
				})
		}
		else{
			alert('You must be logged in to save a trip!')
		}
	}

	getPlaceIds = () => {
		let places = [];

		this.props.places.forEach(function(element) {
			places.push(element['props']['value']['place_id'])
		})

		return places;
	}

	handleCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
		const { classes } = this.props;

    return (
	<div className={classes.tripSave}>
		<div style={{display: 'table-cell', verticalAlign: 'middle', width: '100%'}}>
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
			<Button onClick = {this.handleClick.bind(this)} style={{color: 'white', backgroundColor: '#3f51b5'}}>
				Save
			</Button>
		</div>
		<div style={{display: 'table-cell', verticalAlign: 'middle', width: '100%'}}>
			<Button href={"https://www.google.com/maps/dir/?api=1&waypoints=" + this.props.locations} target="_blank" style={{height: '100%', width: '100%', backgroundColor: '#3f51b5', color: 'white', fontSize: '2rem', borderRadius: '0px'}} onClick = {this.handleClick.bind(this)}>
				Start
				<Directions style={{width: '50px', height: '50px', color: 'white'}}/>
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