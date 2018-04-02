import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from "material-ui/RaisedButton";
import TextField from 'material-ui/TextField';

class TripProps extends Component{		
	handleClick(){	
		var data = {
			placeIds: [1, 2, 3],
			trip_id: 23,
			user: 'Addae',
			distance: 15
		}
		
		return;
	}
	
  render() {
    return (
	<div>
		<form>
			<br/>
			<h2>Trip Name: </h2> <TextField hintText="Hint Text"/>
			<RaisedButton label = "Save Trip!" onClick = {this.handleClick.bind(this)}/>
		</form>	
	</div>
    );
  }
}

export default TripProps