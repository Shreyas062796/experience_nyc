import React, { Component } from 'react';
import GoogleMap from './Component/map'
import ControlMap from './Component/size'
import Locations from './Component/locations'
import TripBuilder from './Component/tripBuilder'
import AddLocation from './Component/addLocation'
import AddLocationToTrip from './Component/addLocationToTrip'
import TripControl from './Component/tripControl'
import MapControl from './Component/mapControl'

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
			endTripIndex : 0
		}
		
	}
	
	componentWillMount(){		
		this.setState({
			locations : [
			{
				title: 42.8,
				category: -71.6
			},				
			{
				title: 42.5,
				category: -71.1
			}
		],
		trip : [
			{
				title: 42.1,
				category: -71.8
			}
		],
		selectedLocationIndex : 0,
		endTripIndex : 0
		})
	}
	
	funcAddLocation(location){
		let locations = this.state.locations
		locations.push(location)
		this.setState(locations)
	}
	
	
	funcAddLocationToTrip(location){		
		let trip = this.state.trip
		trip.push(location)
		this.setState({
			trip : trip
			})
		
	}
	
	funcClearTrip(location){
		this.setState({trip : []})
	}
	
	funcUpdateSelectedIndex(selectedIndex){
		this.setState({
			selectedLocationIndex : selectedIndex
		})
	}
	
	funcMoveDown(){		
		
	}
	
  render(){
    return (	
      <div> 
		
		
	  
		<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>  
			
		
			
			<AddLocation addLocation = {this.funcAddLocation.bind(this)}/>
			<Locations locations = {this.state.locations} updateSelectedIndex = {this.funcUpdateSelectedIndex.bind(this)} />
			
			<AddLocationToTrip locations = {this.state.locations} selectedIndex = {this.state.selectedLocationIndex} addLocationToTrip = {this.funcAddLocationToTrip.bind(this)}/>
			
			<TripBuilder trip = {this.state.trip}/>
			<TripControl trip = {this.state.trip} clearTrip = {this.funcClearTrip.bind(this)} moveDown = {this.funcMoveDown.bind(this)}/>
			
			<br/>
			
			<GoogleMap lat = {42.1} lng = {-71.8} trip = {this.state.trip}/>
		</MuiThemeProvider>
		
	  </div>
    );
  }
  
}


export default App;