/*global google*/
import React, { Component } from 'react';
//import icon from './googleMapIcons/number_0.png';

/*function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./googleMapIcons', false, /\.(png|jpe?g|svg)$/));*/


class GoogleMap extends Component{
	
	constructor(){
		super()
		this.state = {
			time : 0,
			dist : 0,
			inst : 0,
			markers: [],
			disp : new google.maps.DirectionsRenderer({
				suppressMarkers: true
			})
		}
	}

	createMap = () => {
		//directions
		var dirDisp = this.state.disp;

		var dirServ = new google.maps.DirectionsService();
						
		let endIndex = this.props.trip.length

		this.clearMarkers();

		let markers = this.state.markers

		this.props.trip.forEach(function(element, index) {
			let label = (index+1).toString()
			//import icon from "'./googleMapIcons/number_0' + index+1 +'.png'";
			var marker = new google.maps.Marker({
				animation: this.props.selected == index ? google.maps.Animation.BOUNCE : false,
				label: {text: label, color: "white"},
				position: {lat: element.lat, lng: element.lng}
				//icon: icon
			});

			markers.push(marker);

		}.bind(this));

		this.setMarkers(markers);
		
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
						
			var request = {
				origin: start,
				destination: end,
				waypoints: waypts,
				optimizeWaypoints: true,
				travelMode: 'WALKING'
			};
			dirServ.route(request, function(result, status){
				if (status == 'OK'){
					dirDisp.setDirections(result);
					//dirDisp.setPanel(document.getElementById('directionsPanel'));	
					
					//console.log(result);

					var distance= 0;
					var time = 0;
					for(i = 0; i < result.routes[0].legs.length; i++){
						distance += parseFloat(result.routes[0].legs[i].distance.value);
						time += parseFloat(result.routes[0].legs[i].duration.value);
					}
					
					time = this.fancyTimeFormat(time);
					distance = Math.round(distance* 0.000621371192 * 100) / 100 + " Miles";

					this.getWaypointTimeAndDist(result);

					this.setState({
						time : time,
						dist : distance,						
					}, function() {
						this.props.updateTripDetails(this.state.time, this.state.dist);
					}.bind(this) )
				}
			}.bind(this))
			dirDisp.setMap(this.map);
			
		}
	}

	getWaypointTimeAndDist = (result) => {
		let tempArr = []

		for(var i = 0; i < result.routes[0].legs.length; i++){
			var distance = parseFloat(result.routes[0].legs[i].distance.value);
			var time = parseFloat(result.routes[0].legs[i].duration.value);
			distance = Math.round(distance* 0.000621371192 * 100) / 100 + " Miles";
			time = this.fancyTimeFormat(time);
			tempArr.push({time: time, dist: distance})
		}

		this.props.updateWaypointTimeAndDist(tempArr);
	}

	setMarkers = (markers) => {
		for (var i = 0; i < markers.length; i++ ) {
			if(markers[i] != null){
				markers[i].setMap(this.map);
			}	
		}
		this.setState({markers: markers})
	}

	clearMarkers() {
		let markers = this.state.markers;
		for (var i = 0; i < markers.length; i++ ) {
			if(markers[i] != null){
				markers[i].setMap(null);
				markers[i] = null;
			}
		}

		this.setState({markers: markers})
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
			ret += "" + hrs + " Hours " + (mins < 10 ? "0" : "");
		}

		ret += "" + mins + " Minutes"
		return ret;
	}
	
	componentWillReceiveProps(nextProps){
		if(this.props.trip != nextProps.trip)
			this.setState({places: nextProps.trip}, function() {
			this.createMap();
		})
	}
	
	componentDidMount(){
		this.map = new google.maps.Map(this.refs.map,{
			center: { lat: this.props.trip[0].lat, lng: this.props.trip[0].lng },
			zoom: 8
		});
		this.setState({places: this.props.trip}, function() {
			this.createMap();
		})
	}
	
  render(){
    return (		
	<div style={{height: window.innerWidth <= 768 ? '40%' : false}}>
		<div style={{height: '100%', width: window.innerWidth <= 768 ? '100%' : '40%', display: 'inline-flex', position: window.innerWidth <= 768 ? 'relative' : 'absolute', top: 0, right: 0}} id = "map" ref = "map">
		</div>	
		{/*<div style={{width: '100%', height: '300px',overflow: 'auto'}} id="directionsPanel"></div>
		<br />*/}
	</div>
    );
  }
  
}


export default GoogleMap;