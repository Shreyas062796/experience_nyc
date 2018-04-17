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
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
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
import noPhoto from "./Images/nophoto.png";
import { PulseLoader } from 'react-spinners';
import Divider from 'material-ui-next/Divider';
import Check from 'material-ui-icons/Check';
import PlaceCard from './PlaceCard.js';
import TripCard from './TripCard.js';

const styles = theme => ({
  card1: {
    maxWidth: 400,
    borderRadius: '4px',
    border: '1px solid #24292e'
  },
  card2: {
    maxWidth: 400,
    borderRadius: '4px',
    boxShadow: '0px 0px 18px -1px rgba(0,208,255,1)',
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
    fontSize: '1vh',
  }
});

class Recommended extends React.Component {
  state = { items: [],
            favorites: [],
            filter: {search: '', types: '', price_level: '', num: '100', page: '1'},
            username: sessionStorage.getItem('username'),
            inTrip: [],
          };

  handleScroll = () => {
    const thisPos = document.getElementById('recommendedDiv').scrollTop;
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
        url:"https://experiencenyc.herokuapp.com/users/getfavoriteplacesIds",
        type:"POST",
        data: JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        dataType:"json"})
        .done((response) => {
          this.setState({favorites: response})
        })
    }
  }

  inTrip = (id) => {
    if(this.props.inTrip.includes(id)){
      return true;
    }
    else{
      return false;
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
          this.props.snackbar('Added To Favorites!')
          this.setFavorites();
          //this.getRecommended();
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
          this.props.snackbar('Removed From Favorites!')
          this.setFavorites();
          //this.getRecommended();
        }
      })
  }

  //get a list of the place IDs that the user is building a trip with
  getTripPlacesIDs = () => {
    var data = {username: sessionStorage.getItem('username')};

    $.ajax({
      url:"https://experiencenyc.herokuapp.com/users/gettripplacesIds",
      type:"POST",
      data: JSON.stringify(data),
      contentType:"application/json; charset=utf-8",
      dataType:"json"})
      .done((response) => {
        this.setState({inTrip: response});
      })
  }

  getTripPlaces = () => {
    if(this.state.loggedIn){
      var data = {username: sessionStorage.getItem('username')};

      $.ajax({
        url:"https://experiencenyc.herokuapp.com/users/gettripplaces",
        type:"POST",
        data: JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        dataType:"json"})
        .done((response) => {
          const { classes } = this.props;

          if(response['response'] != 'There is no values'){
            const result = response.map((value) =>
            (
              <TripCard
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
              />
            ))
          this.props.updateTripPlaces(result);
          }
        })
      }
      else{
          var data = {placeIds: this.state.inTrip};

          $.ajax({
            url:"https://experiencenyc.herokuapp.com/places/getusertripplaces",
            type:"GET",
            data: data,
            contentType:"application/json; charset=utf-8",
            dataType:"json"})
            .done((response) => {
              const { classes } = this.props;

              if(response['response'] != 'There is no values'){
                const result = response.map((value) =>
                (
                  <TripCard
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
                  />
                ))
              this.props.updateTripPlaces(result);
              }
              else{
                this.props.updateTripPlaces('');
              }
          })
        }
        this.getTripPlacesIDs();
  }

  //adds the passed id to the database and adds the lat and lng to a list for the trip creation
  addToTrip = (id) => {
    if(sessionStorage.getItem('username')){
      var data = {username: sessionStorage.getItem('username'), place_id: id};

      $.ajax({
        url:"https://experiencenyc.herokuapp.com/users/addtripplaces",
        type:"POST",
        data: JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        dataType:"json"})
        .done((response) => {
          if(response['response'] == "True"){
            this.props.snackbar('Added To Trip!')
            this.getTripPlaces();
          }
        })
    }

    let tempInTrip = this.state.inTrip;
    tempInTrip.push(id);

    this.setState({inTrip: tempInTrip}, function(){
      if(!sessionStorage.getItem('username')){
        this.props.snackbar('Added To Trip!')
        this.getTripPlaces();
      }
        //this.getRecommended();
    })

  }

  //removes the passed id and lat/lng from the db and from the trip id list
  removeFromTrip = (id) => {
    if(sessionStorage.getItem('username')){
      var data = {username: sessionStorage.getItem('username'), place_id: id};

      $.ajax({
        url:"https://experiencenyc.herokuapp.com/users/removetripplaces",
        type:"POST",
        data: JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        dataType:"json"})
        .done((response) => {
          if(response['response'] == "True"){
            this.props.snackbar('Removed From Trip!')
            this.getTripPlaces();
          }
        })
    }

    //let tempArr = this.state.trip;
    let tempInTrip = this.state.inTrip;

    var index = tempInTrip.indexOf(id);
    tempInTrip.splice(index, 1);

    /*tempArr = $.grep(tempArr, function(e){
     return (e.lat != lat && e.lng != lng);

    });*/

    this.setState({inTrip: tempInTrip}, function(){
      if(!sessionStorage.getItem('username')){
        this.props.snackbar('Removed From Trip!')
        this.getTripPlaces();
      }
        //this.getRecommended();
    })
  }


  getPhotos = (photos) => {
    this.props.modalPhotos(photos);
  }

  openPhotoModal = (photo) => {
    this.props.modalPhotos(photo);
  }

  //listen for new props
  componentWillReceiveProps(nextProps){
    if((nextProps.loggedIn != this.state.loggedIn) && nextProps.loggedIn){
      this.setState({loggedIn: nextProps.loggedIn}, function() {
        this.setFavorites();
        this.getRecommended();
      });
    }
    else if((nextProps.page != this.props.page) && nextProps.page == "Recommended"){
      this.getRecommended();
    }

    if(nextProps.inTrip != this.state.inTrip){
      this.setState({inTrip: nextProps.inTrip});
    }
  }

  //search for places
  getRecommended = () => {

    //set list of favorites for current user
    //this.setFavorites();

    this.setState({items: [<div className='sweet-loading'>
      <PulseLoader
        color={'#123abc'}
        loading={this.state.loading}
      />
    </div>]})

    var data = {username: sessionStorage.getItem('username'), address: '33rd Street station New York, NY 10001'};

    $.ajax({
      url:"https://experiencenyc.herokuapp.com/recommendations/placeRecommendations",
      type:"POST",
      data: JSON.stringify(data),
      contentType:"application/json; charset=utf-8",
      dataType:"json"})
      .done((response) => {
       const { classes } = this.props;

       const result = response.map((value) =>(
         <PlaceCard
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
         />
        ))
      if(JSON.stringify(this.state.items) != JSON.stringify(result)){
       this.setState({items: result});
     }
    })
  }

  componentWillMount = () => {
    this.setState({loggedIn: this.props.loggedIn});
  }

  //Get recommended places when component mounts
  componentDidMount = () => {
    if(this.props.loggedIn){
      this.getRecommended();
    }
  }

  render() {
    const { classes } = this.props;



    return (
      <div id='recommendedDiv' style={{margin: '1em', marginTop: 0, height:  window.innerWidth <= 760 ? '75vh' : '100vh',overflowY: 'auto', overflowX: 'hidden'}} onScroll={this.handleScroll}>
        <Grid container spacing={40} justify={'center'} style={{padding: 25, paddingTop: 0, marginTop: '3em', paddingBottom: window.innerWidth <= 760 ? '1em' : '12em', alignItems: 'center', height: this.state.items.length == 1 ? '100%' : 'auto'}}>
          {this.state.items}
        </Grid>
      </div>
    );
  }
}

Recommended.propTypes = {
  classes: PropTypes.object.isRequired,
};

const cardsWrapped = withStyles(styles)(Recommended);

export default cardsWrapped;
