import React from "react";
import TopNav from './TopNav';
import FilterBar from './FilterBar';

export default class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: ""};
  }

  render() {
    return (
      <div style={{marginRight: 300}}>
        <TopNav />
        <FilterBar />
      </div>
    );
  }
}
