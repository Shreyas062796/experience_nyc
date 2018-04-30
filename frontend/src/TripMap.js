import React, { Component } from 'react';
import { withStyles } from 'material-ui-next/styles';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import GoogleMap from './Component/map';
import ControlMap from './Component/size';
import Locations from './Component/locations';
import TripBuilder from './Component/tripBuilder';
import AddLocation from './Component/addLocation';
import AddLocationToTrip from './Component/addLocationToTrip';
import TripControl from './Component/tripControl';
import MapControl from './Component/mapControl';
import TripProps from './Component/tripProps';
import Typography from 'material-ui-next/Typography';

const styles = theme => ({
	root: {
		width: window.innerWidth <= 768 ? '100%' : '59%',
		boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		height: window.innerWidth <= 768 ? '40%' : '70%', 
		overflowY: 'auto'
	},
	details: {
		width: window.innerWidth <= 768 ? '100%' : '59%',
		boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		marginTop: '1em'
	},
	tripSave: {
		width: window.innerWidth <= 768 ? '100%' : '59%',
		height: '10%',
		boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		marginTop: '1em'
	},
	totalTimeAndDistance: {
		fontWeight: '400', 
		fontSize: window.innerWidth <= 450 ? '0.75rem' : window.innerWidth <= 1060 ? '1rem' : window.innerWidth <= 1600 ? '1.5rem' : '2rem', 
		color: 'rgba(0, 0, 0, 0.87)',
		marginTop: '1em',
		marginBottom: '1em'
	}
})

class TripMap extends Component{
	constructor(){
		super()
		this.state = {
			locations:[],
			trip:[],
			selectedLocationIndex : 0,
			endTripIndex : 0,
			time : 0,
			dist : 0,
			waypointTimeAndDist: []
		}
	}
	
	componentWillMount(){
		let locs = '';
		this.props.places.forEach((element, index) => {
			if(index != this.props.places.length-1){
				locs += element['props']['value']['geometry']['location']['lat'];
				locs += ","
				locs += element['props']['value']['geometry']['location']['lng'];
				locs += "|";
			}
			else{
				locs+= "&destination=";
				locs += element['props']['value']['geometry']['location']['lat'];
				locs += ",";
				locs += element['props']['value']['geometry']['location']['lng'];
			}
		});

		const tripLocations = this.props.places.map((value) =>
		(
			{
				lat: value['props']['value']['geometry']['location']['lat'],
				lng: value['props']['value']['geometry']['location']['lng']
			}
		))
		this.setState({
			locations : locs,
			places: this.props.places,
			trip : tripLocations
		})
	}
	
	uniqueId() {
		return new Date().getTime();
	}	
	
	setDist(dist){
		this.setState({
			dist : dist			
		})
	}
	
	funcAddLocationToTrip(location){		
		let trip = this.state.trip
		trip.push(location)
		this.setState({
			trip : trip
		})		
	}
	
	setTime(time){
		this.setState({
			time : time			
		})
	}
	
	funcUpdateSelectedIndex(id){
		let tempItems = this.state.places;
		for(var innerIndex = 0; innerIndex < tempItems.length; innerIndex++){
            if(id == tempItems[innerIndex]['props']['value']['place_id']){
				this.setState({
					selectedLocationIndex : innerIndex
				})
			}
		}
	}

	updateTripDetails = (time, distance) => {
		this.setState({time: time, dist: distance})
	}

	getPlaces = () => {
		//let tempPlaces = Array.assign({}, this.state.places, array);
		let tempPlaces = [this.state.places];
		let tempArr = []
		let tempWaypointTimeAndDist = this.state.waypointTimeAndDist;
		for(var i = 0; i < tempPlaces[0].length; i++){
			//tempPlaces[i].push(tempWaypointTimeAndDist[i]);

			tempArr.push(tempPlaces[0][i]);

			if(i != tempPlaces[0].length-1 && tempWaypointTimeAndDist[i]){
				tempArr.push(<div style={{display: 'flex', justifyContent: 'center'}}><Typography style={{margin: '1em'}}> Time: {tempWaypointTimeAndDist[i]['time']} </Typography>
							 <Typography style={{margin: '1em'}}> Distance: {tempWaypointTimeAndDist[i]['dist']} </Typography></div>
							)
			}
		}
		return tempArr;
	}

	updateWaypointTimeAndDist = (arr) => {
		this.setState({waypointTimeAndDist : arr});
	}

	componentWillReceiveProps = (nextProps) => {
		if(this.props.selected != nextProps.selected){
			this.funcUpdateSelectedIndex(nextProps.selected)
		}

		if(this.props.places != nextProps.places){
			let locs = '';
			nextProps.places.forEach(function(element, index) {
				if(index != nextProps.places.length-1){
					locs += element['props']['value']['geometry']['location']['lat'];
					locs += ","
					locs += element['props']['value']['geometry']['location']['lng'];
					locs += "|";
				}
				else{
					locs+= "&destination=";
					locs += element['props']['value']['geometry']['location']['lat'];
					locs += ",";
					locs += element['props']['value']['geometry']['location']['lng'];
				}
			});

			const tripLocations = nextProps.places.map((value) =>
			(
				{
					lat: value['props']['value']['geometry']['location']['lat'],
					lng: value['props']['value']['geometry']['location']['lng']
				}
			))

			this.setState({
				locations : locs,
				places: nextProps.places,
				trip : tripLocations
			})
		}
	}
	
  render(){
	const { classes } = this.props;

    return (	
      <div style={{height: '100%'}}>
	  	{window.innerWidth <= 768 ? <GoogleMap updateWaypointTimeAndDist={this.updateWaypointTimeAndDist} selected={this.state.selectedLocationIndex} updateTripDetails={this.updateTripDetails} ref = 'googlemap' trip = {this.state.trip} date = {this.uniqueId.bind(this)}/> : false}		
		<div className={classes.root}>
			<div style={{width: '100%', height: window.innerWidth <= 768 ? '' : '44rem', display: 'inline-block'}}>
				{this.getPlaces()}
				{/*this.state.places*/}
			</div>
		</div>
		<div className={classes.details}>
			<div style={{display: 'inline-flex', justifyContent: 'center', width: '100%'}}>
				<Typography variant="title" color="inherit" noWrap className={classes.totalTimeAndDistance} style={{marginRight: '1em'}}>
					Time: {this.state.time}
				</Typography>
				<Typography variant="title" color="inherit" noWrap className={classes.totalTimeAndDistance}>
					Distance: {this.state.dist}
				</Typography>
			</div>
		</div>
		{/*<div style={{display: 'inline-block', width: '60%'}}>*/}
		{window.innerWidth <= 768 ? false : <GoogleMap updateWaypointTimeAndDist={this.updateWaypointTimeAndDist} selected={this.state.selectedLocationIndex}  updateTripDetails={this.updateTripDetails} ref = 'googlemap' trip = {this.state.trip} date = {this.uniqueId.bind(this)}/>}
		<div className={classes.tripSave}>
			<div style={{display: 'inline-flex', justifyContent: 'center', width: '100%', height: '100%'}}>
			<TripProps places={this.state.places} locations={this.state.locations}/>
			</div>
		</div>
		{/*</div>*/}
		{/*<div style={{width: '50%', display: 'inline-flex'}}>
			<TripBuilder trip = {this.state.trip} selectedIndex = {this.funcUpdateSelectedIndex.bind(this)}/>
		</div>*/}
		{/*<TripControl trip = {this.state.trip} removeLocation = {this.removeLocation.bind(this)} moveDown = {this.funcMoveDown.bind(this)} moveUp = {this.funcMoveUp.bind(this)}/>*/}
		<br/>
	  </div>
    );
  }
  
}


TripMap.propTypes = {
	classes: PropTypes.object.isRequired,
  };
  
  const wrapped = withStyles(styles)(TripMap);
  
  export default wrapped;