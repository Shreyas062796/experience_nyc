import React, { Component } from 'react';

class Location extends Component{
	
	
  render() {
	
    return (			
      <option className = "Location">		
	  {this.props.location.name}
	  </option>
    );
  }
}


export default Location;