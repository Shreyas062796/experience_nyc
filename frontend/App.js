import React, {Component} from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
//import ExperienceNYCScripts from './ExperienceNYCScripts.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
<<<<<<< HEAD
import LoginModal from './Components/LoginModal';
import TripModal from './Components/TripModal';
import SideNav from './Components/SideNav';
import Cards from './Components/Cards';
=======
import SideNav from './Components/SideNav';
import LoginModal from './Components/LoginModal';
import TripModal from './Components/TripModal';

import Cards from './Components/Cards';

>>>>>>> master
import MainContainer from './Components/MainContainer';

function App() {
  return (
    <MuiThemeProvider>
      <MainContainer />
<<<<<<< HEAD
=======
      <SideNav />
>>>>>>> master
    </MuiThemeProvider>
  );
}

ReactDOM.render(
<App />,document.getElementById('root')
);
