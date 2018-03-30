/*global google*/
import React, { Component } from 'react';

class ControlMap extends Component{
	constructor(){
		super()
	}
	
	yo(){
		alert('yo')
		
	}
	
  render() {
    return (	
      <div>
		<button onClick = {this.yo}>YO</button>
		//Map Size
		<h2>Map Dimensions</h2>
			<div class="slidecontainer">
				<input type="range" min="1" max="100" value="100" class="slider" id="myRange" onmouseup = "alert('hey')"/>
			</div>
		
		//Add Locations
		<h2>Locations</h2>				
		<select multiple id = "listbox" ref = "listbox" name="listbox" size="8">
			<option onClick = {this.yo}>Location1</option>
		</select>
		
		<br />
		Lat<input type = "text" id = "lat"  placeholder = "42.*"/>Lng
		<input type = "text" id = "lng" ref = "lng" placeholder = "71.*"/>
		<button id = "addLoc" type = "button"> Add Location</button> 
		
		<br />
		
		//Add to Trip
		<h2>Trip</h2>
		<select multiple id = "listboxTrips" name="listboxTrips" size="8">
		</select>
		
		<br />
		<button id = "addLocToTrip" type = "button"> Add Location to Trip</button>
		
		//Clear Trip
		<button id = "clearButton" onclick = "clearTrip()"> Clear Trip </button>
		
		//Get Directions
		<button id = "directions" type = "button"> Directions  </button>
		
		
		<br />		
		<button id = "up" onclick = "moveUp()">move up</button>
		<button id = "down" onclick = "moveDown()">move down</button>
		
		
		
		
		<br />
		<h3>Trip Details</h3>
		distance(mi):  <span id = "dist"> </span>
		<br />
		time(mins): <span id = "time"> </span>

	  </div>
    );
  }
}

export default ControlMap;