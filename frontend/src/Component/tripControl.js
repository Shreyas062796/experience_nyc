import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from "material-ui/RaisedButton";

class TripControl extends Component{		
	
	handleClear(){		
		this.props.clearTrip()
	}
  render() {
    return (
	<div>
		<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>			
			<RaisedButton label = "remove" onClick = {this.handleClear.bind(this)} /><RaisedButton label = "move up"/><RaisedButton label = "move down"/>
		</MuiThemeProvider>
	</div>
    );
  }
}

export default TripControl