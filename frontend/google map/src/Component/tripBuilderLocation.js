import React, { Component } from 'react';

class TripBuilderLocation extends Component{
	
	
  render() {
	  
    return (
		<option className = "TripBuilderLocation">
		{this.props.location.name}
		</option>
    );
  }
}


export default TripBuilderLocation;