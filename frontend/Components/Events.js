import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui-next/Card';
import Collapse from 'material-ui-next/transitions/Collapse';
import Avatar from 'material-ui-next/Avatar';
import IconButton from 'material-ui-next/IconButton';
import Typography from 'material-ui-next/Typography';
import red from 'material-ui-next/colors/red';
import Favorite from 'material-ui-icons/Favorite';
import FavoriteBorder from 'material-ui-icons/FavoriteBorder';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMore from 'material-ui-icons/ExpandMore';
import ExpandLess from 'material-ui-icons/ExpandLess';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Grid from 'material-ui-next/Grid';
import Button from 'material-ui-next/Button';
import Star from 'material-ui-icons/Star';
import StarHalf from 'material-ui-icons/StarHalf';
import StarBorder from 'material-ui-icons/StarBorder';
import Send from 'material-ui-icons/Send';
import AttachMoney from 'material-ui-icons/AttachMoney';
import Add from 'material-ui-icons/Add';
import Tooltip from 'material-ui-next/Tooltip';
import cyan from 'material-ui-next/colors/cyan';
import eventbriteLogo from "./Images/eventbriteLogo.png";
import noPhoto from "./Images/nophoto.png";
import Check from 'material-ui-icons/Check';
import Divider from 'material-ui-next/Divider';
import EventCard from './EventCard.js'
import { PulseLoader } from 'react-spinners';

const styles = theme => ({
  card1: {
    maxWidth: 400,
    borderRadius: '4px',
    border: '1px solid #24292e'
  },
  button: {
    minWidth: '0px',
    color: 'rgba(0, 0, 0, 0.87)',
    border: '1px solid',
    borderRadius: '4px',
  },
  subheader: {
    height: '5em'
  },
  media: {
    height: 150,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  title: {
    fontSize: '1.5vh',
  }
});

class Events extends React.Component {
  state = { expanded: false,
            items: [],
            favorites: [],
            filter: {search: '', types: '', price_level: '', num: '100'},
            username: sessionStorage.getItem('username'),
            lastScrollPos: 0,
            changedPos: undefined,
            down: true
          };

  cardWidth = () => {
    return $(card).width();
  }

  handleScroll = () => {
    const thisPos = document.getElementById('eventsDiv').scrollTop;
    const down = thisPos > this.state.lastScrollPos;
    // If current `down` value is differs from `down` from state,
    // assign `thisPos` to variable, else assigning current `changedPos` state value.
    const changedPos = down !== this.state.down ? thisPos : this.state.changedPos;
    this.setState({
      lastScrollPos: thisPos,
      changedPos,
      down
    }, function() {
      this.props.handleScroll(down);
    });
  }

  //set list of favorites for current user
  setFavorites = () => {
    var data = {username: sessionStorage.getItem('username')};

    if(data['username']){
      $.ajax({
        url:"https://experiencenyc.herokuapp.com/users/users/getfavoriteplacesIds",
        type:"POST",
        data: JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        dataType:"json"})
        .done((response) => {
          this.setState({favorites: response})
        })
    }
  }

  //add passed id to favorites for current user
  addFavorite = (id) => {
    var data = {username: sessionStorage.getItem('username'), place_id: id};

    $.ajax({
      url:"https://experiencenyc.herokuapp.com/users/addfavoriteplaces",
      type:"POST",
      data: JSON.stringify(data),
      contentType:"application/json; charset=utf-8",
      dataType:"json"})
      .done((response) => {
        if(response['response'] == "True"){
          this.searchPlaces();
        }
      })
  }

  //remove passed id from user's favorites
  removeFavorite = (id) => {
    var data = {username: sessionStorage.getItem('username'), place_id: id};

    $.ajax({
      url:"https://experiencenyc.herokuapp.com/users/removefavoriteplaces",
      type:"POST",
      data: JSON.stringify(data),
      contentType:"application/json; charset=utf-8",
      dataType:"json"})
      .done((response) => {
        if(response['response'] == "True"){
          this.searchPlaces();
        }
      })
  }

  handleExpandClick = (id) => {
    /*let tempExpanded = this.state.expanded;

    if(tempExpanded.includes(id)){
      var index = tempExpanded.indexOf(id);
      tempExpanded.splice(index, 1);
    }
    else{
      tempExpanded.push(id);
    }*/

    this.setState({expanded: true});
  };

  //check favorite list for passed id and return either a filler in or empty heart component
  isFavorite = (id) => {
    var button = ''

    if(this.state.favorites.includes(id) && sessionStorage.getItem('username')){
      button = (<Tooltip id="tooltip-bottom" title="Remove Favorite" placement="bottom">
                  <IconButton aria-label="Remove from Favorites" onClick={() => { this.removeFavorite(id) }}>
                      <Favorite />
                  </IconButton>
                </Tooltip>);
    }
    else if(sessionStorage.getItem('username')) {
      button = (<Tooltip id="tooltip-bottom" title="Add Favorite" placement="bottom">
                  <IconButton aria-label="Add to Favorites" onClick={() => { this.addFavorite(id) }}>
                    <FavoriteBorder />
                  </IconButton>
                </Tooltip>);
    }

    return button;
  }

  isFree(value){
    if(value == true){
      return <Typography style={{fontSize: '1.5rem'}}>Free</Typography>;
    }
    else{
      return <Typography style={{fontSize: '1.5rem'}}>Not Free</Typography>;
    }

  }

  //listen for new props
  /*componentWillReceiveProps(nextProps) {
      this.setState({filter: nextProps.filter}, function() {
        this.searchPlaces();
      });
  }*/

  //search for places
  searchEvents = () => {
    this.setState({items: [<div style={{textAlign: 'center'}} className='sweet-loading'>
        <Typography style={{color: '#3f51b5', margin: '1rem', fontSize: '1rem'}}>Retrieving Events</Typography>
        <PulseLoader
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div>]})
    //set list of favorites for current user
    //this.setFavorites();

    var data = {amount: '100'};

    $.ajax({
      url:"https://experiencenyc.herokuapp.com/todayevents",
      type:"GET",
      data: data,
      contentType:"application/json; charset=utf-8",
      dataType:"json"})
      .done((response) => {
       const { classes } = this.props;

       response.shift();
       const result = response.map((value) =>
        (<EventCard
        value={value}
        inTrip={this.state.inTrip}
        addToTrip={this.addToTrip}
        removeFromTrip={this.removeFromTrip}
        addFavorite={this.addFavorite}
        removeFavorite={this.removeFavorite}
        getTripPlaces={this.getTripPlaces}
        searchPlaces={this.searchPlaces}
        getPhotos={this.getPhotos}
        snackbar={this.props.snackbar}
        favorites={this.state.favorites}
      />));

       this.setState({items: result});

    })
  }

  //Load places when component mounts
  componentDidMount = () => {
    this.searchEvents();
  }

  render() {
    const { classes } = this.props;



    return (
      <div id="eventsDiv" style={{margin: '1em', height:  window.innerWidth <= 760 ? '75vh' : '100vh',overflowY: 'auto', overflowX: 'hidden'}} onScroll={this.handleScroll}>
        <Grid container spacing={40} justify={'center'} style={{padding: 25, paddingTop: 0, paddingBottom: window.innerWidth <= 760 ? '1em' : '12em', alignItems: 'center', marginTop: '3em',height: this.state.items.length == 1 ? '100%' : 'auto'}}>
          {this.state.items}
        </Grid>
      </div>
    );
  }
}

Events.propTypes = {
  classes: PropTypes.object.isRequired,
};

const cardsWrapped = withStyles(styles)(Events);

export default cardsWrapped;
