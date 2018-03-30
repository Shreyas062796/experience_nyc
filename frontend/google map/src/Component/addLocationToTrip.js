import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from "material-ui/RaisedButton";

class AddLocationToTrip extends Component{
	constructor(){
		super()
		this.state = {
			newLocation:{}
		}
	}

	submitForm(e){
		let index = this.props.selectedIndex


		this.setState({
			newLocation : {
				lat : Number(this.props.locations[index].lat),
				lng: Number(this.props.locations[index].lng)
			}
			}, function(){

				this.props.addLocationToTrip(this.state.newLocation)
			})
		console.log('Submitted')
		e.preventDefault();
	}

    render() {

    return (
	<div>
		<div>
			<RaisedButton label = "Add Selected to Trip" onClick = {this.submitForm.bind(this)} />
		</div>
	</div>
    );
  }
}

export default AddLocationToTrip;
