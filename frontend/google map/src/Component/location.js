import React, { Component } from 'react';

class Location extends Component{
	
	
  render() {
	
    return (			
      <option className = "Location"> 	
		
		Lat: {this.props.location.title}, Lng: {this.props.location.category}
	  </option>
    );
  }
}


export default Location;