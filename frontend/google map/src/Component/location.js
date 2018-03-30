import React, { Component } from 'react';

class Location extends Component{


  render() {

    return (
      <option className = "Location"> 	

		Lat: {this.props.location.lat}, Lng: {this.props.location.lng}
	  </option>
    );
  }
}


export default Location;
