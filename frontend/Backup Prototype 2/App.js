import React, {Component} from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import ExperienceNYCScripts from './ExperienceNYCScripts.js';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.min.js';
import TopNav from './Components/TopNav';
import SideNav from './Components/SideNav';
import LoginModal from './Components/LoginModal';
import TripModal from './Components/TripModal';
import FilterBar from './Components/FilterBar';
import Cards from './Components/Cards';
import Footer from './Components/Footer';

function App() {
  return (
    <div>
      <TopNav />
      <SideNav />
      <LoginModal />
      <TripModal />
      <FilterBar />
      <Cards />
      <Footer />
    </div>
  );
}

ReactDOM.render(
<App />,document.getElementById('root')
);
