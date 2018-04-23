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
import Check from 'material-ui-icons/Check';
import Tooltip from 'material-ui-next/Tooltip';
import cyan from 'material-ui-next/colors/cyan';
import noPhoto from "./Images/nophoto.png";
import { PulseLoader } from 'react-spinners';
import Divider from 'material-ui-next/Divider';
import PlaceCard from './PlaceCard.js';
import TripCard from './TripCard.js';
import TripMapCard from './TripMapCard.js';


const styles = theme => ({
  card1: {
    maxWidth: 400,
    borderRadius: '4px',
    border: '1px solid #24292e'
  },
  card2: {
    maxWidth: 400,
    borderRadius: '4px',
    border: '1px solid #24292e',
    boxShadow: '0px 0px 18px -1px rgba(0,208,255,1)'
  },
  button: {
    minWidth: '0px',
    color: 'rgba(0, 0, 0, 0.87)',
    border: '1px solid',
    borderRadius: '4px',
  },
  subheader: {
    display: 'block',
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
  }
});

class Cards extends React.Component {

  state = { items: [],
            favorites: [''],
            trip: [],
            inTrip: [],
            result: [],
            tripMapCardResult: [],
            tripOrder: [],
            page: 1,
            selectedCard: '',
            filter: {search: '', types: [''], price_level: [''], num: '100'},
            username: sessionStorage.getItem('username'),
            loggedIn: false,
            lastScrollPos: 0,
            changedPos: undefined,
            down: true,
            pressed: false
          };

  handleScroll = () => {
    const thisPos = document.getElementById('cardDiv').scrollTop;
    const scrollHeight = document.getElementById('cardDiv').scrollHeight;
    const offset = thisPos + window.innerHeight;

    if(offset >= scrollHeight * 0.99 ){
      this.searchPlaces("nextPage");
    }

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
          this.setState({favorites: response}, function () {})
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
          this.props.snackbar('Added To Favorites!')
          //this.searchPlaces("addFavoritePlace");
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
          //this.searchPlaces("removeFavoritePlace");
        }
      })
  }

  //get a list of the place IDs that the user is building a trip with
  getTripPlacesIDs = () => {
    if(sessionStorage.getItem('username')){
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
  }

  handleCardSelect = (id) => {
    this.setState({selectedCard: id}, () => {
      this.props.cardSelect(id);
      this.updateTripCards();
    })
  }

  removeFromTripOrder = (index) => {
    console.log(index);
    let tempTrip = this.state.tripMapCardResult;
    tempTrip.splice(index, 1);
    this.setState({tripMapCardResult: tempTrip}, () => {
      this.updateTripCards();
    })
  }

  moveUpInTripOrder = (index) => {
    let tempTrip = this.state.tripMapCardResult;
    var element = tempTrip[index];
    tempTrip.splice(index, 1);
    tempTrip.splice(index-1, 0, element);

    this.setState({tripMapCardResult: tempTrip}, () => {
      this.updateTripCards();
    })
  }

  moveDownInTripOrder = (index) => {
    let tempTrip = this.state.tripMapCardResult;
    var element = tempTrip[index];
    tempTrip.splice(index, 1);
    tempTrip.splice(index+1, 0, element);

    this.setState({tripMapCardResult: tempTrip}, () => {
      this.updateTripCards();
    })
  }

  updateTripCards = () => {
    const result2 = this.state.tripMapCardResult.map((value, index) =>
    (
      <TripMapCard
        value={value}
        getTripPlaces={this.getTripPlaces}
        snackbar={this.props.snackbar}
        handleCardSelect={this.handleCardSelect}
        selectedCard={this.state.selectedCard}
        order={index}
        remove={this.removeFromTripOrder}
        moveUp={this.moveUpInTripOrder}
        moveDown={this.moveDownInTripOrder}
        last={index == this.state.tripMapCardResult.length-1}
      />
    ))
    this.setState({tripOrder: result2}, () => {
      this.props.updateTripOrder(this.state.tripOrder);
    });
  }


  getTripPlaces = () => {
    console.log('tripUpdate')
    if(this.props.loggedIn){
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
            const result2 = response.map((value, index) =>
                (
                  <TripMapCard
                    value={value}
                    getTripPlaces={this.getTripPlaces}
                    snackbar={this.props.snackbar}
                    handleCardSelect={this.handleCardSelect}
                    selectedCard={this.state.selectedCard}
                    order={index}
                    remove={this.removeFromTripOrder}
                    moveUp={this.moveUpInTripOrder}
                    moveDown={this.moveDownInTripOrder}
                    last={index == response.length-1}
                  />
                ))
                this.setState({tripOrder: result2, tripMapCardResult: response}, () => {
                  this.props.updateTripPlaces(result);
                  this.props.updateTripOrder(result2);
                });
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

                const result2 = response.map((value, index) =>
                (
                  <TripMapCard
                    value={value}
                    getTripPlaces={this.getTripPlaces}
                    snackbar={this.props.snackbar}
                    handleCardSelect={this.handleCardSelect}
                    selectedCard = {this.state.selectedCard}
                    order={index}
                    remove={this.removeFromTripOrder}
                    moveUp={this.moveUpInTripOrder}
                    moveDown={this.moveDownInTripOrder}
                    last={index == response.length-1}                   
                  />
                ))
              this.setState({tripOrder: result2, tripMapCardResult: response}, () => {
                this.props.updateTripPlaces(result);
                this.props.updateTripOrder(result2);
              });
              
              }
              else{
                this.props.updateTripPlaces('');
              }
          })
        }
        this.getTripPlacesIDs();
  }

  //adds the passed id to the database and adds the lat and lng to a list for the trip creation
  addToTrip = (id, name, lat, lng) => {

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

    this.props.onAddPlaceToTrip({name: name,lat: lat,lng: lng});

    let tempInTrip = this.state.inTrip;
    tempInTrip.push(id);

    this.setState({inTrip: tempInTrip}, function(){
      if(!sessionStorage.getItem('username')){
        this.props.snackbar('Added To Trip!')
        this.getTripPlaces();
      }
        //this.searchPlaces("addToTrip");
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
        //this.searchPlaces('removeFromTrip');
    })

    this.updateCards(id, "removeFromTrip")
  }

  updateCards =(id, message) => {
      let tempItems = this.state.items;
      if(message == "removeFromTrip"){
          for(var innerIndex = 0; innerIndex < tempItems.length; innerIndex++){
            
            if(id == tempItems[innerIndex]['props']['value']['place_id']){
              console.log(id + " " + tempItems[innerIndex]['props']['value']['place_id'])
              console.log(this.state.inTrip)
              tempItems[innerIndex] = (<PlaceCard
                                  value={this.state.result[innerIndex]}
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
                                />)
            }
          }
        this.setState({items: ''}, function() {
          this.setState({items: tempItems})
        });
      }
      
  }

  inTrip = (id) => {
    if(this.state.inTrip.includes(id)){
      return true;
    }
    else{
      return false;
    }
  }

  //search for places
  searchPlaces = (message) => {
    var data = '';

    //set list of favorites for current user
    if(message == "addFavoritePlace" || message == "removeFavoritePlace"){
      this.setFavorites();
      data = this.state.filter;
      let page = this.state.page;
      data['page'] = page;
      this.getPlaces(data);
    }

    if(message == "removeFromTrip" || message == "addToTrip"){
      data = this.state.filter;
      let page = this.state.page;
      data['page'] = page;
      this.getPlaces(data);
    }

    if(message == "loggedIn" || message == "loggedOut"){
      data = this.state.filter;
      data['page'] = 1;
      this.getPlaces(data);
    }

    if(message == "nextPage" && $.active == 0){
      let tempItems = this.state.items;
      tempItems.push(<div className='sweet-loading'>
        <PulseLoader
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div>);
      this.setState({items: tempItems});

      data = this.state.filter;
      let page = this.state.page + 1
      this.setState({page: page});
      data['page'] = page;
      this.getPlaces(data);
    }

    if(message == "initial" || message == "filter"){
      let tempArr = this.state.filter;
      
      if(tempArr['types'].length == 0){
        tempArr['types'].push('');
      }

      if(tempArr['price_level'].length == 0){
        tempArr['price_level'].push('');
      }
      this.setState({filter: tempArr}, () => {
        data = Object.assign({}, this.state.filter);
        let page = this.state.page;
        data['page'] = page;
        this.getPlaces(data);
      })
    }


  }

  getPhotos = (photos) => {
    this.props.modalPhotos(photos);
  }

  openPhotoModal = (photo) => {
    this.props.modalPhotos(photo);
  }

  //sends ajax request to get places data
  getPlaces = (data) => {
    if(data['page'] == 1){
      this.setState({items: [<div className='sweet-loading'>
        <PulseLoader
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div>]})
    }
    $.ajax({
      url:"https://experiencenyc.herokuapp.com/places/newqueryplaces",
      type:"GET",
      data: data,
      contentType:"application/json; charset=utf-8",
      dataType:"json"})
      .done((response) => {
       const { classes } = this.props;

       if(response['response'] != "There is no values"){
         const result = response.map((value) => (
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
        let tempItems = this.state.items;
        let tempResult = this.state.result;
        tempItems.pop();
        tempItems = tempItems.concat(result);
        tempResult = tempResult.concat(response);

        this.setState({items: tempItems, result: tempResult});
       }
       else{
         alert('No data available for that filter!')
         this.setState({filter: {search: '', types: [''], price_level: [''], num: '100'}}, function() {
           this.searchPlaces('filter');
         }) ;
       }
    })
  }

  //Load places when component mounts
  componentDidMount = () => {
    if(sessionStorage.getItem('username')){
      this.setState({loggedIn: true}, function(){
        this.getTripPlacesIDs();
        this.getTripPlaces();
        this.setFavorites();
      })
    }
    this.searchPlaces("initial");


    
    /*if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }*/

    function showPosition(position) {
      $.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + ',' + position.coords.longitude + "&key=AIzaSyBUJaE_AJdQNfNjyqiiAs02Zv-ZXJQxp1k"),
          function(data) {
          }
    }

    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.");
                break;
        }
    }

  }

  //scroll to last position when cards update
  componentDidUpdate = () => {
    document.getElementById('cardDiv').scrollTo(0,this.state.lastScrollPos)
  }

  //listen for new props
  componentWillReceiveProps(nextProps) {
      if(JSON.stringify(nextProps.filter) != JSON.stringify(this.state.filter)){
        this.setState({filter: nextProps.filter}, function() {
          this.searchPlaces("filter");
        });
      }

      if(nextProps.loggedIn != this.props.loggedIn){
        if(nextProps.loggedIn){
          this.setState({inTrip: [], result: [], loggedIn: true}, function() {
            this.searchPlaces("loggedIn");
            this.getTripPlaces();
          });
        }
        else{
          this.setState({inTrip: [], result: [], loggedIn: false}, function() {
            this.searchPlaces("loggedOut");
            this.getTripPlaces();
          });
        }
      }
      else{
        this.setState({loggedIn: nextProps.loggedIn})
      }

      if(nextProps.removeFromTrip){
        this.removeFromTrip(nextProps.removeFromTrip);
      }
  }


  render() {
    const { classes } = this.props;



    return (
      <div id="cardDiv" style={{margin: '1em', marginTop: 0, height:  window.innerWidth <= 760 ? '75vh' : '100vh',overflowY: 'auto', overflowX: 'hidden'}} onScroll={this.handleScroll}>
        <Grid container spacing={40} justify={'center'} style={{padding: 25, paddingTop: 0, marginTop: '3em', paddingBottom: window.innerWidth <= 760 ? '1em' : '12em', alignItems: 'center', height: this.state.items.length == 1 ? '100%' : 'auto'}}>
          {this.state.items}
        </Grid>
      </div>
    );
  }
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
};

const cardsWrapped = withStyles(styles)(Cards);

export default cardsWrapped;
