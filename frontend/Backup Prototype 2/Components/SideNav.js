import React from "react";
import MaterialIcon, {colorPallet} from 'material-icons-react';

export default class SideNav extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    $('.sidenav').sideNav({edge: 'right'});
  }

  render() {
    return (
      <ul id="nav-mobile" className="sidenav sidenav-fixed" style={{overflowY: 'scroll', height: '100%', transform: 'translateX(0%)', top: 65}}>
        <div className="row center">
          <p /><h3><i className="material-icons" style={{fontSize: 50}}>place</i>Trips</h3><p />
        </div>
        <div className="col s12 m7" style={{marginLeft: '5%', marginRight: '5%'}}>
          <div className="input-field">
            <input id="cardSearch" type="search" className="validate" />
            <label htmlFor="cardSearch">Search</label>
          </div>
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <p>
                  The broke college kid
                  <a className="right">
                    <i className="material-icons" style={{width: 0, fontSize: 16, margin: 5}}>attach_money</i>
                  </a>
                </p>
              </div>
              <div className="card-action">
                <a className="modal-trigger" href="#tripModal">View</a>
                <a className="right" style={{marginRight: 0}}>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col s12 m7" style={{marginLeft: '5%', marginRight: '5%'}}>
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <p>
                  Trip for a drunk
                  <a className="right">
                    <i className="material-icons" style={{width: 0, fontSize: 16, margin: 5}}>attach_money</i>
                    <i className="material-icons" style={{width: 0, fontSize: 16, margin: 5}}>attach_money</i>
                    <i className="material-icons" style={{width: 0, fontSize: 16, margin: 5}}>attach_money</i>
                  </a>
                </p>
              </div>
              <div className="card-action">
                <a className="modal-trigger" href="#tripModal">View</a>
                <a className="right" style={{marginRight: 0}}>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col s12 m7" style={{marginLeft: '5%', marginRight: '5%'}}>
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <p>
                  Date night
                  <a className="right">
                    <i className="material-icons" style={{width: 0, fontSize: 16, margin: 5}}>attach_money</i>
                    <i className="material-icons" style={{width: 0, fontSize: 16, margin: 5}}>attach_money</i>
                    <i className="material-icons" style={{width: 0, fontSize: 16, margin: 5}}>attach_money</i>
                  </a>
                </p>
              </div>
              <div className="card-action">
                <a className="modal-trigger" href="#tripModal">View</a>
                <a className="right" style={{marginRight: 0}}>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col s12 m7" style={{marginLeft: '5%', marginRight: '5%'}}>
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <p>
                  On a budget
                  <a className="right">
                    <i className="material-icons" style={{width: 0, fontSize: 16, margin: 5}}>attach_money</i>
                  </a>
                </p>
              </div>
              <div className="card-action">
                <a className="modal-trigger" href="#tripModal">View</a>
                <a className="right" style={{marginRight: 0}}>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col s12 m7" style={{marginLeft: '5%', marginRight: '5%'}}>
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <p>
                  Bar hop
                  <a className="right">
                    <i className="material-icons" style={{width: 0, fontSize: 16, margin: 5}}>attach_money</i>
                    <i className="material-icons" style={{width: 0, fontSize: 16, margin: 5}}>attach_money</i>
                    <i className="material-icons" style={{width: 0, fontSize: 16, margin: 5}}>attach_money</i>
                  </a>
                </p>
              </div>
              <div className="card-action">
                <a className="modal-trigger" href="#tripModal">View</a>
                <a className="right" style={{marginRight: 0}}>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                  <i className="material-icons" style={{width: 0, fontSize: 15, margin: 5}}>star</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </ul>
    );
  }
}
