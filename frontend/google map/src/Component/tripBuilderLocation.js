import React, { Component } from 'react';

class TripBuilderLocation extends Component{
	
	
  render() {
	
    return (
		<option className = "TripBuilderLocation">
			Lat: {this.props.location.title}, Lng: {this.props.location.category}
		</option>
    );
  }
}


export default TripBuilderLocation;