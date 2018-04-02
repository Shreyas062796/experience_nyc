import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from "material-ui/RaisedButton";
class AddLocation extends Component{	
	constructor(){
		super()
		this.state = {
			newLocation:{}
		}
	}
	
	submitForm(e){		
		if(this.refs.locationLat.value === '' || this.refs.locationLng.value === ''){
			alert("Please enter a valid location")			
		}else{
			this.setState({
				newLocation : {
					title :this.refs.locationLat.value,
						category: this.refs.locationLng.value
				}
				}, function(){
					this.props.addLocation(this.state.newLocation)
				})
		}
		
		e.preventDefault();
	}
	
	
  render() {	
    return (
	<div>
		<h3> Map Visualizer</h3>
		<form>
			<div>
				<br />
				Lat: <input type = "text" ref = "locationLat"/> Lng: <input type = "text" ref = "locationLng"/> 
				
				
				
				<RaisedButton label = "add Loaction" onClick = {this.submitForm.bind(this)}/>
				
			</div>		
		</form>
	</div>
    );
  }
}

export default AddLocation;