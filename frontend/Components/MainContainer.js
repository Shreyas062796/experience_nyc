import React from "react";
import Main from './Main';

export default class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: ""};
  }

  render() {
    return (
      <div>
        <Main />
      </div>
    );
  }
}
