/*global google*/
import React, { Component } from 'react';


class GoogleMap extends Component{
	
	constructor(){
		super()
		this.state = {
			dirDisp : new google.maps.DirectionsRenderer(),
			dirServ : new google.maps.DirectionsService(),
			time : 0,
			dist : 0,
			inst : 0
		}
	}

	createMap = () => {
		//directions
		var dirDisp = this.state.dirDisp;
		var dirServ = this.state.dirServ;

			
		dirDisp.setMap(this.map);
		
		//var start = new google.maps.LatLng(42.1, -71.2);
		
		//console.log(markers[0].getPosition().lng())
		
		let endIndex = this.props.trip.length
			
			
		if(endIndex > 0){	
			
			var start = {					
				lat : this.props.trip[0].lat, 
				lng : this.props.trip[0].lng
			}
			
			
			var end = {					
				lat : this.props.trip[endIndex - 1].lat, 
				lng : this.props.trip[endIndex - 1].lng
			}
			
			
			let waypts = [];
			for(var i = 1; i < endIndex - 1; i++){
				//lat and lng				
			
				waypts.push({
					location: {lat: Number(this.props.trip[i].lat), lng: Number(this.props.trip[i].lng)},
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
				console.log(result)
				if (status == 'OK'){
					dirDisp.setDirections(result);
					//dirDisp.setPanel(document.getElementById('directionsPanel'));	
					//console.log(result.routes[0].legs[0])

					var distance= 0;
					var time = 0;
					for(i = 0; i < result.routes[0].legs.length; i++){
						distance += parseFloat(result.routes[0].legs[i].distance.value);
						time += parseFloat(result.routes[0].legs[i].duration.value);
					}
					
					time = this.fancyTimeFormat(time);
					distance = Math.round(distance* 0.000621371192 * 100) / 100 + " Miles";

					this.setState({
						time : time,
						dist : distance,						
					}, function() {
						this.props.updateTripDetails(this.state.time, this.state.dist);
					}.bind(this) )
				}
			}.bind(this))			
			
		}
	}

	fancyTimeFormat(time)
	{   
		// Hours, minutes and seconds
		var hrs = ~~(time / 3600);
		var mins = ~~((time % 3600) / 60);
		var secs = time % 60;

		// Output like "1:01" or "4:03:59" or "123:03:59"
		var ret = "";

		if (hrs > 0) {
			ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
		}

		ret += "" + mins + ":" + (secs < 10 ? "0" : "");
		ret += "" + secs;
		return ret;
	}
	
	componentWillReceiveProps(props){
		this.createMap();
	}
	
	componentDidMount(){
		this.map = new google.maps.Map(this.refs.map,{
			//center: { lat: this.props.lat, lng: this.props.lng },
			center: { lat: 42.95, lng: -71.33 },
			zoom: 8
		});
		this.createMap();
	}
	
  render(){
    return (		
	<div >
		<div style={{height: '100%', width: '40%', display: 'inline-flex', position: 'absolute', top: 0, right: 0}} id = "map" ref = "map">
		</div>	
		{/*<div style={{width: '100%', height: '300px',overflow: 'auto'}} id="directionsPanel"></div>
		<br />*/}
	</div>
    );
  }
  
}


export default GoogleMap;