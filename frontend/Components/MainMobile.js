import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Card, { CardActions, CardContent } from 'material-ui-next/Card';
import classNames from 'classnames';
import Grid from 'material-ui-next/Grid';
import BottomNav from './BottomNav';
import AppBar from 'material-ui-next/AppBar';
import Toolbar from 'material-ui-next/Toolbar';
import List from 'material-ui-next/List';
import Typography from 'material-ui-next/Typography';
import TextField from 'material-ui-next/TextField';
import Divider from 'material-ui-next/Divider';
import IconButton from 'material-ui-next/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import Place from 'material-ui-icons/Place';
import FilterBar from './FilterBar';
import Cards from './Cards';
import Button from 'material-ui-next/Button';
import LoginModal from './LoginModal';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui-next/Menu';
import Trips from './Trips.js';
import Favorites from './Favorites.js';
import Events from './Events.js';
import TabsMobile from './TabsMobile.js'
import Recommended from './Recommended.js';
import RecommendedEvents from './RecommendedEvents.js';
import Icon from 'material-ui-next/Icon';
import Switch from 'material-ui-next/Switch';
import cyan from 'material-ui-next/colors/cyan';
import blue from 'material-ui-next/colors/blue';
import Snackbar from 'material-ui-next/Snackbar';
import PhotoModal from './PhotoModal.js';
import TripMap from '../src/TripMap.js';
import Modal from 'material-ui-next/Modal';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    width: '100%',
  },
  appBar: {
    position: 'absolute'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  checked: {
    color: cyan[500],
    '& + $bar': {
      backgroundColor: cyan[500],
    },
  },
  bar: {},
});

class Main extends React.Component {
  constructor(props){
    super(props)

    this.handlePage = this.handlePage.bind(this)
  }
  state = {
    clicked: '',
    username: sessionStorage.getItem('username'),
    filter: {search: '', types: [''], price_level: [''], num: '100'},
    currentPage: 'Places',
    currentTab: 'Search',
    anchorEl: null,
    open: '',
    tripButton: false,
    tripLocations: [],
    tripPlaces: [],
    removeFromTrip: "",
    loggedIn: false,
    displayBottomNav: true,
    snackbarMessage: '',
    snackbarOpen: false,
    photos: [],
    photoModalOpened: false
  };

  componentWillMount = () => {
    if(document.location.href.split('/')[3] == "login"){
      this.setState({clicked: 0})
    }
    if(document.location.href.split('/')[4] == "verify"){
      alert('Thanks for verifying your email! Login and enjoy our app!')
    }
    if(sessionStorage.getItem('username')){
      this.setState({loggedIn: true});
    }
  }

  componentDidMount = () => {
    if(sessionStorage.getItem('username')){
      this.setState({loggedIn: true, currentTab: 'Recommended'});
    }
	}

  handleScroll = (down) => {
    if(down){
      this.setState({displayBottomNav: false});
    }
    else{
      this.setState({displayBottomNav: true});
    }
  }

  handleLoginClick = () => {
    this.setState({clicked: 0});
  }

  handleRegisterClick = () => {
    this.setState({clicked: 1});
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handlePage = (page) => {
    this.setState({
      currentPage: page
    })
    if(this.state.loggedIn){
      this.setState({currentTab: 'Recommended'});
    }
  }

  handleTab = (page) => {
    this.setState({
      currentTab: page
    })
  }

  handleLoginPopup = () => {
    this.handleLoginClick();
  }

  handleModalClose = () => {
    this.setState({clicked: '', photoModalOpened: false})
  }

  handleLogin = () => {
    this.setState({username: sessionStorage.getItem('username'), loginClick: '', clicked: '', loggedIn: true, currentTab: 'Recommended'})
    this.handleMenuClose();
    history.pushState({}, null, document.location.href.split('/')[0] + "//" + document.location.href.split('/')[1] + document.location.href.split('/')[2]);
  }

  handleLogout = () => {
    this.setState({username: '', clicked: '', currentTab: 'Search', favorites: [], filter: {search: '', types: [''], price_level: [''], num: '100'}, removeFromTrip: "", tripPlaces: [], loggedIn: false})
    sessionStorage.setItem('username', '')
    alert("Logged Out!")
  }

  handlePageDisplay = (page) => {
    if(page == this.state.currentPage){
      return 'block';
    }
    else{
      return 'none';
    }
  }

  handleTabDisplay = (page) => {
    if(page == this.state.currentTab + this.state.currentPage){
      return 'block';
    }
    else{
      return 'none';
    }
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

  handleTripClose = () => {
    this.setState({open: ''});
  };

  openTripModal = () => {
    this.setState({open: true});
  }

  setModalPhotos = (photos) => {
    let temp = [];
    temp.push(photos);
    this.setState({photos: temp, photoModalOpened: true});
  }

  snackbar = (message) => {
    this.setState({
      snackbarOpen: true,
      snackbarMessage: message
    })
  }

  updateTripLocations = (location) => {
    let tempTripLocs = this.state.tripLocations;
    tempTripLocs.push(location);
    this.setState({tripLocations: tempTripLocs, drawerOpen: true});
  }

  updateTripPlaces = (places) => {
    this.setState({tripPlaces: places});
  }

  updateTripOrder = (mapPlaces) => {
    this.setState({tripMapPlaces: mapPlaces}, () => {
      if(this.state.tripMapPlaces.length < 1){
        this.setState({open: false});
      }
    });
  }

  removeFromTrip = (id) =>{
    this.setState({removeFromTrip: id}, function(){
      this.setState({removeFromTrip: ''});
    })
  }

  handleTripClose = () => {
    this.setState({open: ''});
    this.props.onClose();
  };

  setFilter = (response) => {
    this.setState({filter: response})
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  shouldComponentUpdate(nextProps, nextState){
    if(nextState.clicked == 0 || nextState.clicked == 1){
      return true;
    }
  }

  render() {
    const { classes, theme  } = this.props;
    const { username, anchorEl } = this.state;

    const menuOpen = Boolean(anchorEl);

    let userAppbarOption = null;

    if(sessionStorage.getItem('username')){
      userAppbarOption = (<div>
                          <Typography style={{color: 'white', display: 'inline-block'}}>{sessionStorage.getItem('username')}</Typography><IconButton
                            aria-owns={menuOpen ? 'menu-appbar' : null}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                          >
                            <AccountCircle color="white"/>
                          </IconButton>
                          <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            open={menuOpen}
                            onClose={this.handleMenuClose}
                          >
                            <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
                            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                          </Menu></div>);
    }
    else {
      userAppbarOption = (<Typography style={{color: 'white', cursor: 'pointer'}}>
                            <a onClick={this.handleLoginClick}>Login</a> | <a onClick={this.handleRegisterClick}>Signup</a>
                          </Typography>);

    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classes.appBar}

          >
            <Toolbar disableGutters={!open}>
              <div style={{width: '60%'}}>
                <Typography variant="title" color="inherit" noWrap>
                  Experience NYC
                </Typography>
              </div>
              <div style={{width: '50%', alignItems: 'center', justifyContent: 'flex-end', display: 'flex'}}>
                {userAppbarOption}
              </div>
            </Toolbar>

          </AppBar>
          <Modal
            style={{justifyContent: 'center', alignItems: 'center'}}
            open={this.state.open}
            onClose={this.handleTripClose}
          >
            <div className={classes.paper} style={{width: '85%', height: '85%', backgroundColor: 'white'}}>
              <TripMap 
                  places={this.state.tripMapPlaces} 
                  selected={this.state.selectedCard}/>
            </div>
          </Modal>
          <LoginModal
            clicked={this.state.clicked}
            onClose={this.handleModalClose}
            loggedIn={this.handleLogin}
            registered={this.handleRegister}
          />
          <PhotoModal
            photos={this.state.photos}
            onClose={this.handleModalClose}
            open={this.state.photoModalOpened}
          />
          <Snackbar
            anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}
            open={this.state.snackbarOpen}
            onClose={this.handleSnackbarClose}
            autoHideDuration={1000}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.snackbarMessage}</span>}
          />
          <div style={{display: this.handlePageDisplay('Places'), marginTop: '4em'}}>
            <TabsMobile tabChange={this.handleTab} loggedIn={this.state.loggedIn} page={this.state.currentPage} logginPopup={this.handleLoginPopup}/>
            <FilterBar setFilter={this.setFilter}/>
            <div style={{display: this.handleTabDisplay('RecommendedPlaces')}}>
              <Recommended
                filter={this.state.filter}
                onAddPlaceToTrip={this.updateTripLocations}
                updateTripPlaces={this.updateTripPlaces}
                loggedIn={this.state.loggedIn}
                handleScroll={this.handleScroll}
                snackbar={this.snackbar}
                inTrip={this.state.tripPlaces}
                modalPhotos={this.setModalPhotos}
                cardSelect={this.handleCardSelect}
                updateTripOrder={this.updateTripOrder}
              />
            </div>
            <Cards style={{display: this.handleTabDisplay('SearchPlaces')}}
              filter={this.state.filter}
              onAddPlaceToTrip={this.updateTripLocations}
              updateTripPlaces={this.updateTripPlaces}
              loggedIn={this.state.loggedIn}
              handleScroll={this.handleScroll}
              snackbar={this.snackbar}
              inTrip={this.state.tripPlaces}
              modalPhotos={this.setModalPhotos}
              cardSelect={this.handleCardSelect}
              updateTripOrder={this.updateTripOrder}
            />
          </div>
          <div style={{display: this.handlePageDisplay('Events'), marginTop: '4em'}}>
            <TabsMobile tabChange={this.handleTab} loggedIn={this.state.loggedIn} page={this.state.currentPage} logginPopup={this.handleLoginPopup}/>
            <FilterBar setFilter={this.setFilter}/>
            <div style={{display: this.handleTabDisplay('RecommendedEvents')}}>
              <RecommendedEvents
                filter={this.state.filter}
                onAddPlaceToTrip={this.updateTripLocations}
                updateTripPlaces={this.updateTripPlaces}
                loggedIn={this.state.loggedIn}
                handleScroll={this.handleScroll}
                snackbar={this.snackbar}
                inTrip={this.state.tripPlaces}
                cardSelect={this.handleCardSelect}
                updateTripOrder={this.updateTripOrder}
              />
            </div>
            <Events style={{display: this.handleTabDisplay('SearchEvents')}} handleScroll={this.handleScroll}/>
          </div>
          <div style={{display: this.handlePageDisplay('Favorites')}}>
            <Favorites
              page={this.state.currentPage}
              handleScroll={this.handleScroll}
              filter={this.state.filter}
              onAddPlaceToTrip={this.updateTripLocations}
              updateTripPlaces={this.updateTripPlaces}
              loggedIn={this.state.loggedIn}
              handleScroll={this.handleScroll}
              snackbar={this.snackbar}
              inTrip={this.state.tripPlaces}
              modalPhotos={this.setModalPhotos}
              cardSelect={this.handleCardSelect}
              updateTripOrder={this.updateTripOrder}
              />
          </div>
          <div style={{display: this.handlePageDisplay('Trips'),marginTop: '4em', height: '100%'}}>
              <div style={{overflowY: 'auto', height: '75vh'}}>
                {this.state.tripPlaces}
              </div>
              <div>
                <Button style={{width: '100%', height:'100%', backgroundColor:'#24292e'}} disabled={this.state.tripPlaces.length < 2} onClick={() => { this.openTripModal()}}>
                  <Typography style={{color: 'white', display: 'inline-block'}}>
                    {(this.state.tripPlaces.length < 2) ? 'Select At Least 2 Places' : 'Start Trip'}
                  </Typography>
                </Button>
              </div>
          </div>
          <BottomNav id='bottomNav' pageChange={this.handlePage} display={this.state.displayBottomNav} />
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Main);
