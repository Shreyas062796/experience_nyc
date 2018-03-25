import React, { Component } from 'react';
import GoogleMap from './googleMap';



class App extends Component{
  render() {
    return (	
      < div > 
	  <ul>
		<li>
			<GoogleMap />	  
		</li>		
	  </ul>
	  
	  </div>
    );
  }
}


export default App;