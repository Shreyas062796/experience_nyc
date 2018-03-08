import React from "react";
import TopNav from './TopNav';
import FilterBar from './FilterBar';
<<<<<<< HEAD
import Cards from './Cards';
import SideNav2 from './SideNav2';
=======
>>>>>>> master

export default class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: ""};
  }

  render() {
    return (
<<<<<<< HEAD
      <div>
        <SideNav2 />
        
=======
      <div style={{marginRight: 300}}>
        <TopNav />
        <FilterBar />
>>>>>>> master
      </div>
    );
  }
}
