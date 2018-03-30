import React, { Component } from 'react';

class TripBuilderLocation extends Component{


  render() {

    return (
		<option className = "TripBuilderLocation">
			Lat: {this.props.location.lat}, Lng: {this.props.location.lng}
		</option>
    );
  }
}


export default TripBuilderLocation;
