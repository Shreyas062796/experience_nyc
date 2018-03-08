import React from "react";
import TopNav from './TopNav';
import FilterBar from './FilterBar';
<<<<<<< HEAD
<<<<<<< HEAD
import Cards from './Cards';
import SideNav2 from './SideNav2';
=======
>>>>>>> master
=======
>>>>>>> 3f14d1de5d8a582c053f88b622271b73013d8f33

export default class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: ""};
  }

  render() {
    return (
<<<<<<< HEAD
<<<<<<< HEAD
      <div>
        <SideNav2 />
        
=======
      <div style={{marginRight: 300}}>
        <TopNav />
        <FilterBar />
>>>>>>> master
=======
      <div style={{marginRight: 300}}>
        <TopNav />
        <FilterBar />
>>>>>>> 3f14d1de5d8a582c053f88b622271b73013d8f33
      </div>
    );
  }
}
