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

	generateJson(result, places, user){
		return ({
			num_places: this.props.trip.length,
		   distance: 2.3,
			places:
			this.props.trip
	})
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
				lat: this.props.trip[0].lat,
				lng: this.props.trip[0].lng
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
				console.log(result, status);
				if (status == 'OK'){
					dirDisp.setDirections(result);
				}
			});
		}
	}

	componentDidMount(){
		this.map = new google.maps.Map(this.refs.map,{
			center: { lat: this.props.lat, lng: this.props.lng },
			zoom: 8
		});
	}


  render() {
    return (
	<div>
		<div id = "map" ref = "map" style={{height: '400px'}}/>
		<br />
	</div>
    );
  }
}


export default GoogleMap;
