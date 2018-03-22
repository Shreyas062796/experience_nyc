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
    marginLeft: -12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    //...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
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
});

class Main extends React.Component {
  state = {
    drawerOpen: true,
    clicked: '',
    username: '',
    anchorEl: null
  };

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
    this.setState({username: sessionStorage.getItem('username'), loginClick: ''})
  }

  handleLogout = () => {
    this.setState({username: ''})
    sessionStorage.setItem('username', '')
    alert("Logged Out!")
  }

  handleModalClose = () => {
    this.setState({clicked: ''})
  }

  render() {
    const { classes, theme  } = this.props;
    const { drawerOpen, username, anchorEl } = this.state;

    const menuOpen = Boolean(anchorEl);

    let userAppbarOption = null;

    if(this.state.username != ''){
      console.log(sessionStorage.getItem('username'))
      userAppbarOption = (<div><Typography style={{color: 'white', display: 'inline-block'}}>{this.state.username}</Typography>
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
                            onClose={this.handleClose}
                          >
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                          </Menu></div>);
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
    const tripCards = (<Card className={classes.card} style={{margin: '5%'}}>
                        <CardContent>
                          <Typography className={classes.title}>The Broke College Kid</Typography>
                          <Typography component="p">
                            For a student on a budget
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button color="primary" style={{width: '100%',color: 'white', backgroundColor: 'rgb(0, 188, 212)'}}>
                              View Trip
                          </Button>
                        </CardActions>
                      </Card>);

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
              <div style={{width: '50%'}}>
                <Typography variant="title" color="inherit" noWrap>
                  Experience NYC
                </Typography>
              </div>
              <div style={{width: '50%', alignItems: 'center', justifyContent: 'flex-end', display: 'flex'}}>
                {userAppbarOption}
                <IconButton
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, drawerOpen && classes.hide)}
                >
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
            <div className={classes.drawerHeader} />
            <FilterBar />
            <LoginModal
              clicked={this.state.clicked}
              onClose={this.handleModalClose}
            />
            <Cards />
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
              <Typography variant="headline" component="h1" align="center">Trips</Typography>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            {tripCards}
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
