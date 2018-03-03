import React from "react";
import MaterialIcon, {colorPallet} from 'material-icons-react';

export default class FilterBar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    $('#catagory').material_select();
    $('#price').material_select();
    $('.datepicker').pickadate();
  }

  render() {
    return (
      <div className="card-panel" style={{zIndex: 2,marginTop: 0,width: '100%',position: 'fixed', padding: '0', paddingTop: '1%'}}>
        <div className="row">
          <div className="input-field col s2 offset-s1">
            <input id="keywords" type="search"/>
            <label htmlFor="keywords">Search</label>
          </div>
          <div className="input-field col s2">
            <select multiple id="catagory">
              <option value disabled selected>All</option>
              <option value={'Bars'}>Bars</option>
              <option value={'Restaurants'}>Restaurants</option>
              <option value={'Museums'}>Museums</option>
              <option value={'Clubs'}>Clubs</option>
            </select>
            <label>Catagory</label>
          </div>
          <div className="input-field col s1">
            <input id="distance" type="text"/>
            <label htmlFor="distance">Distance (miles)</label>
          </div>
          <div className="input-field col s1">
            <select id="price">
              <option value disabled selected />
              <option value={'1'}>$</option>
              <option value={'2'}>$$</option>
              <option value={'3'}>$$$</option>
            </select>
            <label>Price</label>
          </div>
          <div className="input-field col s1">
            <input type="text" className="datepicker" defaultValue="" id="date"/><label>Date</label>
          </div>
          <div className="input-field col s1">
            <button className="btn waves-effect waves-light" type="submit" name="action" id="search">Search</button>
          </div>
          </div>
        </div>
    );
  }
}
