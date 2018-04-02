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
			endTripIndex : 0
		}
	}

	componentWillMount(){
		let tempArray = this.props.locations;

		this.setState({
			locations : [
			{
				name: 'Location 1',
				title: 42.8,
				category: -71.6
			},
			{
				name: 'Location 2',
				title: 42.5,
				category: -71.1
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
		],
		selectedLocationIndex : 0,
		endTripIndex : 0
		})
		console.log(this.state.locations);
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
		});
	}

	funcClearTrip(location){
		this.setState({trip : []})
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


			<GoogleMap lat = {42.1} lng = {-71.8} trip = {this.state.trip}/>

			<TripBuilder trip = {this.state.trip} selectedIndex = {this.funcUpdateSelectedIndex}/>

			<TripControl trip = {this.state.trip} clearTrip = {this.funcClearTrip} moveDown = {this.funcMoveDown}/>

			<TripProps />

			<br/>

		</MuiThemeProvider>

	  </div>
    );
  }

}


export default App;
