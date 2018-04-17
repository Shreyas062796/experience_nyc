import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from "material-ui/RaisedButton";

class TripControl extends Component{		
	
	handleRemove(){		
		this.props.removeLocation(0)
	}
	handleUp(){		
		this.props.moveUp()
	}
	handleDown(){		
		this.props.moveDown()
	}
	
  render() {
    return (
	<div >
		<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>			
			<RaisedButton label = "move up" onClick = {this.handleUp.bind(this)} /><RaisedButton label = "move down" onClick = {this.handleDown.bind(this)} />
		</MuiThemeProvider>
	</div>
    );
  }
  
}

export default TripControl