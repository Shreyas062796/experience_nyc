import React from "react";

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row" style={{marginTop: "8%"}}>
        <div className="row">
          <label className="col s1 offset-s1">Filter by:</label>
          <select className="browser-default col s1">
            <option value="" disabled selected></option>
            <option value="Popularity">Popularity</option>
            <option value="Rating">Rating</option>
            <option value="Price">Price</option>
          </select>
          <select className="browser-default col s1">
            <option value="" disabled selected></option>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </select>
        </div>
        <div className="col s8 offset-s1">
          <h2 className="center">Trending</h2>
          <div className="row">
            <div className="col s4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="./moma.jpg" style={{maxHeight: 226, objectFit: 'cover'}} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">Museum of Modern Art<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">Website</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4"><i className="material-icons left">close</i></span>
                  <img src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyDC23oDwr83Xdm4SkNoVfRw_LOdBGeMrHI" />
                </div>
              </div>
            </div>
            <div className="col s4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="./office.jpg" style={{maxHeight: 226, objectFit: 'cover'}} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
              </div>
            </div>
            <div className="col s4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="./office.jpg" style={{maxHeight: 226, objectFit: 'cover'}} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
              </div>
            </div>
            <h2 className="center">Nearby</h2>
            <div className="col s4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="./office.jpg" style={{maxHeight: 226, objectFit: 'cover'}} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <img src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyDC23oDwr83Xdm4SkNoVfRw_LOdBGeMrHI" />
                </div>
              </div>
            </div>
            <div className="col s4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="./office.jpg" style={{maxHeight: 226, objectFit: 'cover'}} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
              </div>
            </div>
            <div className="col s4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="./office.jpg" style={{maxHeight: 226, objectFit: 'cover'}} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
              </div>
            </div>
            <h2 className="center">Top Rated</h2>
            <div className="col s4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="./office.jpg" style={{maxHeight: 226, objectFit: 'cover'}} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <img src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyDC23oDwr83Xdm4SkNoVfRw_LOdBGeMrHI" />
                </div>
              </div>
            </div>
            <div className="col s4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="./office.jpg" style={{maxHeight: 226, objectFit: 'cover'}} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
              </div>
            </div>
            <div className="col s4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="./office.jpg" style={{maxHeight: 226, objectFit: 'cover'}} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
              </div>
            </div>
          </div>
        </div></div>
    );
  }
}
