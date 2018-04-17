import React, { Component } from 'react';
import Location from './location'


class Locations extends Component{
	shout(){
		this.forceUpdate()
		this.props.updateSelectedIndex(this.refs.selectTripLocation.selectedIndex)
	}
	
  render() {
	constructor:{
		
	}
	  
	let location;
	
	if (this.props.locations){
		location = this.props.locations.map(destination =>{
			//console.log(destination)
			return (
				<Location location = {destination} />
			)
		})
	}
	
	
	
	
    return (
      <div className = "Locations"> 				
		Selected Locations
		
		<br />
		
		<select multiple size = '8' ref = 'selectTripLocation' onClick = {this.shout.bind(this)}>
			{location}
		</select>
		
	  </div>
    );
  }
}

export default Locations