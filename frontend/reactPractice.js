const navbar = <div className="navbar-fixed">
  <nav className="nav-extended" style={{backgroundColor: '#333333'}}>
    <div className="nav-wrapper">
      <a href="#!" className="brand-logo"></a>
      <a className="center">Experience NYC</a>
      <ul className="right hide-on-med-and-down">
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact</a></li>
        <li><a className="modal-trigger" href="#loginModal">Login | Signup</a></li>
      </ul>
    </div>
  </nav>
</div>;

const sidebar = <ul id="nav-mobile" className="sidenav sidenav-fixed" style={{overflowY: 'scroll', height: '100%', transform: 'translateX(0%)', top: 65}}>
  {/*<div class="col s1">
  <a id="sideBtn" class="btn-floating btn-medium waves-effect waves-light red" style="background-color: #333333 !important;position:absolute;left: 2px;top:2px;"><i class="material-icons">remove</i></a>
</div>*/}
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
          <a className="modal-trigger" href="#modal1">View</a>
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
          <a className="modal-trigger" href="#modal1">View</a>
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
          <a className="modal-trigger" href="#modal1">View</a>
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
          <a className="modal-trigger" href="#modal1">View</a>
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
          <a className="modal-trigger" href="#modal1">View</a>
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
</ul>;

const modal = <div id="modal1" className="modal">
  <div className="modal-content">
    <h4>Modal Header</h4>
    <p>A bunch of text</p>
  </div>
  <div className="modal-footer">
    <a href="#!" className="modal-action modal-close waves-effect waves-green btn">Start trip</a>
  </div>
</div>;

const loginModal = <div id="loginModal" className="modal" style={{width: '45%', maxHeight: '100%',overflowY: 'hidden', backgroundImage: 'url("./newYork.jpg")'}}>
  <div className="modal-content">
    <ul className="tabs tabs-fixed-width z-depth-1">
      <li className="tab"><a className="active" href="#login">Login</a></li>
      <li className="tab"><a href="#register">Register</a></li>
    </ul>

    <div className="card-panel" id="login">
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input id="user" className="validate" />
              <label htmlFor="user">Username or Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="loginPassword" type="password" className="validate" />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row center">
            <button className="btn waves-effect waves-light" type="submit" name="action" id="login">Login
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    </div>

    <div className="card-panel" id="register">
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input id="first_name" type="text" className="validate" />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="input-field col s6">
              <input id="last_name" type="text" className="validate" />
              <label htmlFor="last_name">Last Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="username" className="validate" />
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="registrationPassword" type="password" className="validate" />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="registrationEmail" type="email" className="validate" />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row center">
            <button className="btn waves-effect waves-light" type="submit" name="action" id="register">Register
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>;

const filter = <div className="card-panel" style={{zIndex: 2,marginTop: 0,width: '100%',position: 'fixed', padding: '0', paddingTop: '1%'}}>
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
      <input type="text" className="datepicker" defaultValue="Today" id="date"/><label>Date</label>
    </div>
    <div className="input-field col s1">
      <button className="btn waves-effect waves-light" type="submit" name="action" id="search">Search</button>
    </div>
    </div>
  </div>;

const cards = <div className="row" style={{marginTop: "1%"}}>
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
  </div></div>;

  const footer = <footer className="page-footer" style={{backgroundColor: '#333333'}}>
  <div className="container">
    <div className="row">
      <div className="col l6 s12">
        <h5 className="white-text">Footer Content</h5>
        <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
      </div>
      <div className="col l4 offset-l2 s12">
        <h5 className="white-text">Links</h5>
        <ul>
          <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
          <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
          <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
          <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div className="footer-copyright">
    <div className="container">
      © 2014 Copyright Text
      <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
    </div>
  </div>
</footer>;



function App() {
  return (
    <div>
      {navbar}
      {sidebar}
      {modal}
      {loginModal}
      {filter}
      {cards}
      {footer}
    </div>
  );
}

ReactDOM.render(
<App />,document.getElementById('root')
);
