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
		width: '59%',
		boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		height: '70%', 
		overflowY: 'auto'
	},
	details: {
		width: '59%',
		boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		overflowY: 'auto',
		marginTop: '1em'
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
	
	removeLocation(location){
		
		let trip = []
		let oldTrip = this.state.trip
		
		for(var i = 0; i < this.state.trip.length; i++ ){
			if(i != this.state.selectedLocationIndex){				
				trip.push(this.state.trip[i])
			}
		}
				
		this.setState({
			trip : trip,			
		})
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
	
	
	/*funcMoveDown(){
		let trip = this.state.trip
		let places = this.state.places
		let temp = trip[this.state.selectedLocationIndex + 1]
		let tempPlace = places[this.state.selectedLocationIndex + 1]
		if(this.state.selectedLocationIndex + 1 < this.state.trip.length){
			trip[this.state.selectedLocationIndex + 1] = trip[this.state.selectedLocationIndex]
			places[this.state.selectedLocationIndex + 1] = places[this.state.selectedLocationIndex]
			trip[this.state.selectedLocationIndex] = temp
			places[this.state.selectedLocationIndex] = tempPlace
			this.setState({
				trip : trip,
				places: places
			})
		}
	}
	
	funcMoveUp(){		
		//Go up
		let trip = this.state.trip
		let places = this.state.places
		let temp = trip[this.state.selectedLocationIndex - 1]
		let tempPlace = places[this.state.selectedLocationIndex - 1]
		if(this.state.selectedLocationIndex - 1 >= 0){
			trip[this.state.selectedLocationIndex - 1] = trip[this.state.selectedLocationIndex]
			places[this.state.selectedLocationIndex - 1] = places[this.state.selectedLocationIndex]
			trip[this.state.selectedLocationIndex] = temp
			places[this.state.selectedLocationIndex] = tempPlace
			this.setState({
				trip : trip,
				places: places
			})
		}
	}*/

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
		<div className={classes.root}>
			<div style={{width: '100%', height: '44rem', display: 'inline-block'}}>
				{this.state.places}
			</div>
		</div>
		<div className={classes.details}>
			<div style={{display: 'inline-flex', justifyContent: 'center', width: '100%'}}>
				<Typography variant="title" color="inherit" noWrap style={{margin: '1em', fontWeight: '400', fontSize: '2rem', color: 'rgba(0, 0, 0, 0.87)'}}>
					Time: {this.state.time}
				</Typography>
				<Typography variant="title" color="inherit" noWrap style={{margin: '1em', fontWeight: '400', fontSize: '2rem', color: 'rgba(0, 0, 0, 0.87)'}}>
					Distance: {this.state.dist}
				</Typography>
			</div>
		</div>
		{/*<div style={{display: 'inline-block', width: '60%'}}>*/}
			<GoogleMap updateTripDetails={this.updateTripDetails} ref = 'googlemap' trip = {this.state.trip} date = {this.uniqueId.bind(this)}/>
		{/*</div>*/}
		{/*<div style={{width: '50%', display: 'inline-flex'}}>
			<TripBuilder trip = {this.state.trip} selectedIndex = {this.funcUpdateSelectedIndex.bind(this)}/>
		</div>*/}
		{/*<TripControl trip = {this.state.trip} removeLocation = {this.removeLocation.bind(this)} moveDown = {this.funcMoveDown.bind(this)} moveUp = {this.funcMoveUp.bind(this)}/>*/}
		
		<TripProps places={this.state.places} locations={this.state.locations}/>
		
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