import React, { Component } from 'react';
import TripBuilderLocation from './tripBuilderLocation'

class TripBuilder extends Component{
	handleClick(){
		this.props.selectedIndex(this.refs.selectBox.selectedIndex)	
	}
	
  render() {
	
	let location;
	
	if (this.props.trip){		
		location = this.props.trip.map(destination =>{
			//console.log(destination)
			return (
				<TripBuilderLocation location = {destination}/>
			)
		})		
	}
	
    return (
		<div className = "TripBuilder">
			<h2> Destinations </h2>		  
		  <select multiple ref = "selectBox" onClick = {this.handleClick.bind(this)} id = "slct"> 
			
			{location}
		  </select>		  
	  </div>
    );
  }
}


export default TripBuilder;