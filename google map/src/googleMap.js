import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


class GoogleMap extends Component{
	static defaultProps = {
	  center: {lat: 42.95, lng: -71.33},
	  zoom: 8
	};
  render() {
    return (	
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
		
        style={{height : '50hv'}}
      />	  
    );
	
  }
}


export default GoogleMap;