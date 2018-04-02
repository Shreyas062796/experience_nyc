import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Card, { CardActions, CardContent } from 'material-ui-next/Card';
import classNames from 'classnames';
import Grid from 'material-ui-next/Grid';
import Drawer from 'material-ui-next/Drawer';
import AppBar from 'material-ui-next/AppBar';
import Toolbar from 'material-ui-next/Toolbar';
import List from 'material-ui-next/List';
import Typography from 'material-ui-next/Typography';
import TextField from 'material-ui-next/TextField';
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
import Tabs from './Tabs'
import Trips from './Trips.js';
import Events from './Events.js';
import Favorites from './Favorites.js';
import Recommended from './Recommended.js';
import Switch from 'material-ui-next/Switch';
import cyan from 'material-ui-next/colors/cyan';
import blue from 'material-ui-next/colors/blue';
import Modal from 'material-ui-next/Modal';
import Badge from 'material-ui-next/Badge';
import Divider from 'material-ui-next/Divider';
import App from '../src/App';

const drawerWidth = 300;


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  badge: {
    padding: '0.5em',
    marginTop: '1.5em',
    position: 'absolute'
  },
  hover: {
    ':hover': {
      opacity: 0.5
    }
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginRight: 20,
    marginLeft: 10
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    padding: '0 8px',
    //...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    marginTop: '4em',
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  tripButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-right': {
    marginRight: 0,
  },
  checked: {
    color: cyan[500],
    '& + $bar': {
      backgroundColor: cyan[500],
    },
  },
  bar: {},
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  }
});

class Main extends React.Component {
  state = {
    drawerOpen: true,
    clicked: '',
    username: sessionStorage.getItem('username'),
    anchorEl: null,
    filter: {types: [''], price_level: [''], num: '100'},
    currentPage: 'Places',
    tripMode: false,
    open: '',
    tripButton: false,
    tripLocations: [],
    tripPlaces: [],
    removeFromTrip: "",
    loggedIn: false,
  };

  componentWillMount = () => {
    if(sessionStorage.getItem('username')){
      this.setState({loggedIn: true});
    }
  }

  //handles scroll action, empty for non-mobile
  handleScroll = (down) => {

  }

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

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

  handleLogin = () => {
    this.setState({username: sessionStorage.getItem('username'), loginClick: '', clicked: '', loggedIn: true, currentPage: 'Recommended'})
    this.handleMenuClose();
  }

  handleRegister = () => {
    this.setState({clicked: 0});
  }

  handleLogout = () => {
    this.setState({username: '', currentPage: 'Places', clicked: '', favorites: [], filter: {types: [''], price_level: [''], num: '100'}, removeFromTrip: "", tripPlaces: [], loggedIn: false})
    sessionStorage.setItem('username', '')
    alert("Logged Out!")
  }

  handleModalClose = () => {
    this.setState({clicked: ''})
  }

  setFilter = (response) => {
    this.setState({filter: response})
  }

  handlePageDisplay = (page) => {
    if(page == this.state.currentPage){
      return 'block';
    }
    else{
      return 'none';
    }
  }

  handlePage = (page) => {
    this.setState({
      currentPage: page
    })
  }

  handleTripSwitch = name => event => {
    this.setState({ [name]: event.target.checked }, function() {
      if(this.state.tripMode){
        this.setState({tripButton: true})
      }
      else{
        this.setState({tripButton: false})
      }
    });
  };

  //Test for map*************************
  handleTripClose = () => {
    this.setState({open: ''});
    this.props.onClose();
  };

  openTripModal = () => {
    this.setState({open: true});
  }

  updateTripLocations = (locations) => {
    this.setState({tripLocations: locations});
  }

  updateTripPlaces = (places) => {
    this.setState({tripPlaces: places});
  }

  removeFromTrip = (id) =>{
    this.setState({removeFromTrip: id}, function(){
      this.setState({removeFromTrip: ''});
    })
  }

  handleTripButton = () => {
    if(this.state.tripButton){
      return (<Button style={{width: '100%', height:'100%', backgroundColor:'#3f51b5'}} disabled={this.state.tripPlaces.length < 2} onClick={() => { this.openTripModal()}}>
                <Typography style={{color: 'white', display: 'inline-block'}}>
                  {(this.state.tripPlaces.length < 2) ? 'Select At Least 2 Places' : 'Start Trip'}
                </Typography>
              </Button>);
    }
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };
  //**************************************

  getToolbarHeight = () => {
    return $('header').css('height');
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextState.clicked == 0 || nextState.clicked == 1){
      return true;
    }
  }

  render() {
    const { classes, theme  } = this.props;
    const { drawerOpen, username, anchorEl } = this.state;

    const menuOpen = Boolean(anchorEl);

    let userAppbarOption = null;

    if(sessionStorage.getItem('username')){
      userAppbarOption = (<div>
                            <Typography style={{color: 'white', display: 'inline-block'}}>{sessionStorage.getItem('username')}</Typography>
                            <IconButton
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
                            </Menu>
                          </div>);
    }
    else {
      userAppbarOption = (<Typography style={{color: 'white', cursor: 'pointer'}}>
                            <a className={classes.hover}
                               onClick={this.handleLoginClick}>
                               Login
                            </a> | <a className={classes.hover}
                               onClick={this.handleRegisterClick}>
                               Signup
                            </a>
                          </Typography>);

    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: drawerOpen,
              [classes[`appBarShift-right`]]: drawerOpen,
            })}

          >
            <Toolbar disableGutters={!open}>
              <div style={{width: '33%'}}>
                <Typography variant="title" color="inherit" noWrap>
                  Experience NYC
                </Typography>
              </div>
              <div style={{display: 'inline-block', width: '34%', textAlign: 'center'}}>
                <Typography style={{color: 'white', display: 'inline-block'}}>Trip Mode</Typography>
                <Switch
                  checked={this.state.tripMode}
                  onChange={this.handleTripSwitch('tripMode')}
                  value=""
                  classes={{
                    checked: classes.checked,
                    bar: classes.bar,
                  }}
                />
              </div>
              <div style={{width: '33%', alignItems: 'center', justifyContent: 'flex-end', display: 'flex'}}>
                {userAppbarOption}

                <IconButton
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, drawerOpen && classes.hide)}
                >
                  <Typography style={{color: 'white'}}>Trips</Typography>
                  <Place color="white" />
                </IconButton>
              </div>
            </Toolbar>

          </AppBar>
          <main
            className={classNames(classes.content, classes[`content-right`], {
              [classes.contentShift]: drawerOpen,
              [classes[`contentShift-right`]]: drawerOpen,
            })}
          >

          <Modal
            style={{justifyContent: 'center', alignItems: 'center'}}
            open={this.state.open}
            onClose={this.handleTripClose}
          >
            <div className={classes.paper} style={{width: '75%', height: '75%'}}>
              <App locations={this.state.tripLocations}/>
            </div>
          </Modal>

            <div className={classes.drawerHeader} />
            <Tabs pageChange={this.handlePage} loggedIn={this.state.loggedIn}/>
              <div style={{display: this.handlePageDisplay('Recommended')}}>
                <Recommended
                  filter={this.state.filter}
                  tripMode={this.state.tripMode}
                  onAddPlaceToTrip={this.updateTripLocations}
                  updateTripPlaces={this.updateTripPlaces}
                  loggedIn={this.state.loggedIn}
                />
              </div>
              <div style={{display: this.handlePageDisplay('Places')}}>
                <FilterBar setFilter={this.setFilter}/>
                <LoginModal
                  clicked={this.state.clicked}
                  onClose={this.handleModalClose}
                  loggedIn={this.handleLogin}
                  registered={this.handleRegister}
                />
                <Cards
                  filter={this.state.filter}
                  tripMode={this.state.tripMode}
                  onAddPlaceToTrip={this.updateTripLocations}
                  updateTripPlaces={this.updateTripPlaces}
                  loggedIn={this.state.loggedIn}
                  handleScroll={this.handleScroll}
                />
              </div>
              <div style={{display: this.handlePageDisplay('Events')}}>
                <Events />
              </div>
              <div style={{display: this.handlePageDisplay('Favorites')}}>
                <Favorites page={this.state.currentPage}/>
              </div>
          </main>
          <Drawer
            variant="persistent"
            anchor={'right'}
            open={drawerOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <div style={{height: this.getToolbarHeight()}}>
                <Badge color="primary" badgeContent={this.state.tripPlaces.length} className={classes.badge}>
                </Badge>
                  <Typography variant="headline" component="h1" align="right" style={{paddingTop: '.75em'}}>Trip Cart
                    <IconButton style={{marginLeft: '2em'}} onClick={this.handleDrawerClose}>
                      {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                  </Typography>
              </div>
            </div>
            <Divider />
            <div style={{overflowY: 'auto', height: '90vh'}}>
              {this.state.tripPlaces}
            </div>
            <Divider />
            <div style={{width: '100%',height: '3.5em', bottom: 0, position: 'absolute'}}>
              {this.handleTripButton()}
            </div>
          </Drawer>
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
