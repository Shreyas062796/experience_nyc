/*global google*/
import React, { Component } from 'react';




class GoogleMap extends Component{
	
	constructor(){
		super()
		this.state = {
			dirDisp : new google.maps.DirectionsRenderer(),
			dirServ : new google.maps.DirectionsService()
		}
	}
	
	shouldComponentUpdate(){
		return false;
	}
	
	componentWillReceiveProps(props){
		
		//directions
		var dirDisp = this.state.dirDisp;
		var dirServ = this.state.dirServ;

			
		dirDisp.setMap(this.map);
		
		//var start = new google.maps.LatLng(42.1, -71.2);
		
		//console.log(markers[0].getPosition().lng())
		
		let endIndex = this.props.trip.length
			
		if(endIndex > 0){	
			
			var start = {					
				lat: this.props.trip[0].title, 
				lng: this.props.trip[0].category
			}
			
			var end = {					
				lat : this.props.trip[endIndex - 1].title, 
				lng : this.props.trip[endIndex - 1].category
			}
			
			let waypts = [];
			for(var i = 1; i < endIndex - 1; i++){
				//lat and lng				
			
				waypts.push({
					location: {lat: Number(this.props.trip[i].title), lng: Number(this.props.trip[i].category)},
					stopover: true
				})
			}
			
			

			
			//var end = new google.maps.LatLng(42.7, -71.8);
			
			
			
			var request = {
				origin: start,
				destination: end,
				waypoints: waypts,
				optimizeWaypoints: true,
				travelMode: 'WALKING'
			};
			
			dirServ.route(request, function(result, status){
				console.log(result, status);
				if (status == 'OK'){
					dirDisp.setDirections(result);			
					//console.log(result.routes[0].legs[0])
					
					alert(this.refs.time)
				}
			});
		}
	}
	
	componentDidMount(){
		this.map = new google.maps.Map(this.refs.map,{
			center: { lat: this.props.lat, lng: this.props.lng },
			zoom: 8
		});
		this.componentWillReceiveProps()
		
	}
	
	
  render() {
    return (		
	<div>
		<div id = "map" ref = "map"/>
		<h2 ref = "time" > Time: </h2>
		<h2 ref = "dist" > Distance: </h2>
		<br />
	</div>
    );
  }
}


export default GoogleMap;