import React from "react";
import Main from './Main';
import MainMobile from './MainMobile';

export default class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {mobile: window.innerWidth <= 760};
  }

  state = {
    mobile: window.innerWidth <= 760
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({mobile: window.innerWidth <= 760});
  }

  getMainComponent(){
    if(this.state.mobile == true){
      return <MainMobile />
    }
    else{
      return <Main />
    }
  }

  render() {

    return (
      <div>
        {this.getMainComponent()}
      </div>
    );
  }
}
