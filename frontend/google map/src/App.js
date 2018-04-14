import React, { Component } from 'react';
import GoogleMap from './Component/map'
import ControlMap from './Component/size'
import Locations from './Component/locations'
import TripBuilder from './Component/tripBuilder'
import AddLocation from './Component/addLocation'
import AddLocationToTrip from './Component/addLocationToTrip'
import TripControl from './Component/tripControl'
import MapControl from './Component/mapControl'
import TripProps from './Component/tripProps'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from "material-ui/RaisedButton";

class App extends Component{
	constructor(){
		super()
		this.state = {
			locations:[],
			trip:[],
			selectedLocationIndex : 0,
			endTripIndex : 0,
			time : 10,
			dist : 25
		}
	}
	
	componentWillMount(){		
		this.setState({
			locations : [
			{
				name: 'Location 1',
				title: 42.8,
				category: -71.6
			},			
		],
		trip : [
			{
				name: 'Location 3',
				title: 42.9,
				category: -75.6
			},
			{
				name: 'Location 1',
				title: 42.8,
				category: -71.6
			},				
			{
				name: 'Location 2',
				title: 42.5,
				category: -71.1
			}
		]
		})
	}
	
	
	
	uniqueId() {
		return new Date().getTime();
	}
	
	funcAddLocation(location){
		let locations = this.state.locations
		locations.push(location)
		this.setState(locations)
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
	
	funcUpdateSelectedIndex(selectedIndex){
		this.setState({
			selectedLocationIndex : selectedIndex
		})
	}
	
	
	funcMoveDown(){		
		let trip = this.state.trip
		let temp = trip[this.state.selectedLocationIndex + 1]
		
		if(this.state.selectedLocationIndex + 1 < this.state.trip.length){
			trip[this.state.selectedLocationIndex + 1] = trip[this.state.selectedLocationIndex]
			trip[this.state.selectedLocationIndex] = temp
			this.setState({
				trip : trip,
			})
		}
	}
	
	funcMoveUp(){		
		//Go up
		let trip = this.state.trip
		let temp = trip[this.state.selectedLocationIndex - 1]
		
		if(this.state.selectedLocationIndex - 1 >= 0){
			trip[this.state.selectedLocationIndex - 1] = trip[this.state.selectedLocationIndex]
			trip[this.state.selectedLocationIndex] = temp
			this.setState({
				trip : trip,
			})
		}
	}
	
	funcUpdateSelectedIndex(selectedIndex){
		
		this.setState({
			selectedLocationIndex : selectedIndex
		})
		
	}
	
  render(){
    return (	
      <div> 
		
		
	  
		<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>  
			<h1>Trip Details</h1>
			
			<TripProps />
			
			<GoogleMap ref = 'googlemap' trip = {this.state.trip} date = {this.uniqueId.bind(this)}/>
			
			<TripBuilder trip = {this.state.trip} selectedIndex = {this.funcUpdateSelectedIndex.bind(this)}/>
			
			<TripControl trip = {this.state.trip} removeLocation = {this.removeLocation.bind(this)} moveDown = {this.funcMoveDown.bind(this)} moveUp = {this.funcMoveUp.bind(this)}/>
			
			
			
			<br/>
			
			
		</MuiThemeProvider>
		
	  </div>
    );
  }
  
}


export default App;