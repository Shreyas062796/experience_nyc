import React from "react";
import TopNav from './TopNav';
import FilterBar from './FilterBar';
import Cards from './Cards';
import SideNav2 from './SideNav2';

export default class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: ""};
  }

  render() {
    return (
      <div>
        <SideNav2 />
        
      </div>
    );
  }
}
