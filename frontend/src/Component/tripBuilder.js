import React, { Component } from 'react';
import TripBuilderLocation from './tripBuilderLocation'

class TripBuilder extends Component{
	
	
  render() {
	
	let location;
	
	if (this.props.trip){		
		location = this.props.trip.map(destination =>{
			//console.log(destination)
			return (
				<TripBuilderLocation location = {destination} />
			)
		})
		
	}
	
	
	
    return (
		<div className = "TripBuilder">
			<h2> Destinations </h2>
		  
		  <select multiple > 	
			{location}
		  </select>
		  
	  </div>
    );
  }
}


export default TripBuilder;