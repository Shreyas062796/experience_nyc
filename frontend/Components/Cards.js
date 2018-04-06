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

const styles = theme => ({
  card1: {
    maxWidth: 400,
    borderRadius: '4px',
    //border: '1px solid #8080806e',
  },
  card2: {
    maxWidth: 400,
    borderRadius: '4px',
    boxShadow: '0px 0px 18px -1px rgba(0,208,255,1)'
  },
  button: {
    backgroundColor: red[500],
    minWidth: '0px',
    color: 'white',
  },
  subheader: {
    display: 'block',
    height: '2rem'
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

  state = { expanded: false,
            items: [],
            favorites: [],
            trip: [],
            inTrip: [],
            filter: {types: [''], price_level: [''], num: '100'},
            username: sessionStorage.getItem('username'),
            tripMode: false,
            loggedIn: false,
            lastScrollPos: 0,
            changedPos: undefined,
            down: true,
            pressed: false
          };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleScroll = () => {
    const thisPos = document.getElementById('cardDiv').scrollTop;
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

  //generate list of dollar sign components based on passed price level
  returnPriceLevel = (items) => {
    let price = [];
    for(var i=0; i < items; i++){
      price.push(<AttachMoney style={{color: 'rgb(0, 188, 212)', width: '40px'}}/>);
    }
    return price;
  }

  //generate list of star components based on passed rating
  returnRatingLevel = (items) => {
    let ratingStars = [];
    let floor = Math.floor(items)
    for(var i=0; i < floor; i++){
      ratingStars.push(<Star style={{color: 'rgb(0, 188, 212)', height: '', width: '75px'}}/>);
    }
    if((items % 1) > 0.2){
      ratingStars.push(<StarHalf style={{color: 'rgb(0, 188, 212)', height: '', width: '75px'}}/>);
      for(var i = 0; i < (4-floor); i++){
        ratingStars.push(<StarBorder style={{color: 'rgb(0, 188, 212)', height: '', width: '75px'}}/>);
      }
    }
    else{
      for(var i = 0; i < (5-floor); i++){
        ratingStars.push(<StarBorder style={{color: 'rgb(0, 188, 212)', height: '', width: '75px'}}/>);
      }
    }
    return ratingStars;
  }

  cardWidth = () => {
    return $(card).width();
  }

  //set list of favorites for current user
  setFavorites = () => {
    var data = {username: sessionStorage.getItem('username')};

    if(data['username']){
      $.ajax({
        url:"https://experiencenyc.herokuapp.com/getfavoriteplacesIds",
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
      url:"https://experiencenyc.herokuapp.com/addfavoriteplaces",
      type:"POST",
      data: JSON.stringify(data),
      contentType:"application/json; charset=utf-8",
      dataType:"json"})
      .done((response) => {
        if(response['response'] == "True"){
          this.props.snackbar('Added To Favorites!')
          this.searchPlaces("addFavoritePlace");
        }
      })
  }

  //remove passed id from user's favorites
  removeFavorite = (id) => {
    var data = {username: sessionStorage.getItem('username'), place_id: id};

    $.ajax({
      url:"https://experiencenyc.herokuapp.com/removefavoriteplaces",
      type:"POST",
      data: JSON.stringify(data),
      contentType:"application/json; charset=utf-8",
      dataType:"json"})
      .done((response) => {
        if(response['response'] == "True"){
          this.props.snackbar('Removed From Favorites!')
          this.searchPlaces("removeFavoritePlace");
        }
      })
  }

  //get a list of the place IDs that the user is building a trip with
  getTripPlacesIDs = () => {
    var data = {username: sessionStorage.getItem('username')};

    $.ajax({
      url:"https://experiencenyc.herokuapp.com/gettripplacesIds",
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
        url:"https://experiencenyc.herokuapp.com/gettripplaces",
        type:"POST",
        data: JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        dataType:"json"})
        .done((response) => {
          const { classes } = this.props;

          if(response['response'] != 'There is no values'){
            const result = response.map((value) =>
            (
              <Card style={{margin: '1em'}} className={this.inTrip(value['id'] && this.props.tripMode) ? classes.card2 : classes.card1}>
                <CardHeader classes={{subheader: classes.subheader}}
                  avatar={
                    <Avatar aria-label="Recipe" src={value['icon']} className={this.props.avatar}/>
                  }
                  title={value['name']}
                  subheader={value['formatted_address']}
                />
              <div style={{overflow:'hidden'}} onClick={() =>{this.getPhotos(value['place_id'])}}>
                 <img className="image" style={{width:'100%', height:'226px', objectFit: 'cover', cursor: 'pointer'}} src={value['photos'] ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + "1000"+ "&maxheight=" + "1000" + "&photoreference=" + value['photos'][0]['photo_reference'] + "&key=AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A" : noPhoto}/>
               </div>
                <CardActions className={this.props.actions} disableActionSpacing>
                  <div style={{width: '20%', textAlign: 'center', display: 'flex'}}>
                    <IconButton>
                      {this.returnPriceLevel(value['price_level'])}
                    </IconButton>
                  </div>
                  <div style={{width: '40%', textAlign: 'center', display: 'flex'}}>
                    <Typography style={{marginTop: '14px', marginRight: '5px', }}>{value['rating']}</Typography>
                    <IconButton style={{flex: 'auto'}}>
                      {this.returnRatingLevel(value['rating'])}
                    </IconButton>
                  </div>
                  <div style={{width: '40%', textAlign: 'right'}}>
                    <Button target="_blank" onClick={() => {this.removeFromTrip(value['id'])}} className={classes.button}>
                     Remove
                    </Button>
                  </div>
                </CardActions>
              </Card>
            ))


          this.props.updateTripPlaces(result);
          }
        })
      }
      else{
          var data = {placeIds: this.state.inTrip};

          $.ajax({
            url:"https://experiencenyc.herokuapp.com/getqueryplaces",
            type:"GET",
            data: data,
            contentType:"application/json; charset=utf-8",
            dataType:"json"})
            .done((response) => {
              const { classes } = this.props;

              if(response['response'] != 'There is no values'){
                const result = response.map((value) =>
                (
                  <Card style={{margin: '1em'}} className={this.inTrip(value['id'] && this.props.tripMode) ? classes.card2 : classes.card1}>
                    <CardHeader classes={{subheader: classes.subheader}}
                      avatar={
                        <Avatar aria-label="Recipe" src={value['icon']} className={this.props.avatar}/>
                      }
                      title={value['name']}
                      subheader={value['formatted_address']}
                    />
                  <div style={{overflow:'hidden'}} onClick={() =>{this.getPhotos(value['place_id'])}}>
                     <img className="image" style={{width:'100%', height:'226px', objectFit: 'cover', cursor: 'pointer'}} src={value['photos'] ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + "1000"+ "&maxheight=" + "1000" + "&photoreference=" + value['photos'][0]['photo_reference'] + "&key=AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A" : noPhoto}/>
                   </div>
                    <CardActions className={this.props.actions} disableActionSpacing>
                      <div style={{width: '20%', textAlign: 'center', display: 'flex'}}>
                        <IconButton>
                          {this.returnPriceLevel(value['price_level'])}
                        </IconButton>
                      </div>
                      <div style={{width: '40%', textAlign: 'center', display: 'flex'}}>
                        <Typography style={{marginTop: '14px', marginRight: '5px', }}>{value['rating']}</Typography>
                        <IconButton style={{flex: 'auto'}}>
                          {this.returnRatingLevel(value['rating'])}
                        </IconButton>
                      </div>
                      <div style={{width: '40%', textAlign: 'right'}}>
                        <Button target="_blank" onClick={() => {this.removeFromTrip(value['id'])}} className={classes.button}>
                         Remove
                        </Button>
                      </div>
                    </CardActions>
                  </Card>
                ))
              this.props.updateTripPlaces(result);
              }
              else{
                this.props.updateTripPlaces('');
              }
          })
        }
        this.searchPlaces('');
  }

  //adds the passed id to the database and adds the lat and lng to a list for the trip creation
  addToTrip = (id) => {

    if(sessionStorage.getItem('username')){
      var data = {username: sessionStorage.getItem('username'), place_id: id};

      $.ajax({
        url:"https://experiencenyc.herokuapp.com/addtripplaces",
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
        this.searchPlaces("addToTrip");
    })

  }

  //removes the passed id and lat/lng from the db and from the trip id list
  removeFromTrip = (id) => {

    if(sessionStorage.getItem('username')){
      var data = {username: sessionStorage.getItem('username'), place_id: id};

      $.ajax({
        url:"https://experiencenyc.herokuapp.com/removetripplaces",
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
        this.searchPlaces('removeFromTrip');
    })
  }

  //check favorite list for passed id and return either a filler in or empty heart component
  getIcon = (id) => {
    var button = ''


    if(this.state.favorites.includes(id) && (sessionStorage.getItem('username')) && (this.props.tripMode == false)){
      button = (<Tooltip id="tooltip-bottom" title="Remove Favorite" placement="bottom">
                  <IconButton aria-label="Remove from Favorites" onClick={() => { this.removeFavorite(id) }}>
                      <Favorite />
                  </IconButton>
                </Tooltip>);
    }
    else if(sessionStorage.getItem('username') && (this.props.tripMode == false)) {
      button = (<Tooltip id="tooltip-bottom" title="Add Favorite" placement="bottom">
                  <IconButton aria-label="Add to Favorites" onClick={() => { this.addFavorite(id) }}>
                    <FavoriteBorder />
                  </IconButton>
                </Tooltip>);
    }
    else if(this.props.tripMode == true){
      button = (<Tooltip id="tooltip-bottom" title={this.inTrip(id) ? "Remove From Trip" : "Add to Trip"} placement="bottom">
                  <IconButton aria-label={this.inTrip(id) ? "Remove from Trip" : "Add to Trip"} onClick={() => {this.inTrip(id) ? this.removeFromTrip(id) : this.addToTrip(id, this)}}>
                    {this.inTrip(id) ? <Check  /> : <Add  />}
                  </IconButton>
                </Tooltip>);
    }
    return button;
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
      this.getPlaces(data);
    }

    if(message == "removeFromTrip" || message == "addToTrip"){
      data = this.state.filter;
      this.getPlaces(data);
    }

    if(message == ("tripMode")){
      data = this.state.filter;
      this.getPlaces(data);
    }

    if(message == "loggedIn" || message == "loggedOut"){
      data = this.state.filter;
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
      this.setState({filter: tempArr}, function() {
        data = this.state.filter;
        this.getPlaces(data);
      })
    }


  }

  getPhotos = (placeID) => {
    $.ajax({
      url:"https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeID + "&key=AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A",
      type:"GET",
      contentType:"application/json; charset=utf-8",
      dataType:"json"})
      .done((response) => {
       const { classes } = this.props;
        const result = response['result']['photos'].map((value) => (
          <img className="image" style={{width:'100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1}} src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + "10000"+ "&maxheight=" + "10000" + "&photoreference=" + value['photo_reference'] + "&key=AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A"}/>
        ))
        this.props.modalPhotos(result);
     })
  }

  openPhotoModal = (photo) => {
    this.props.modalPhotos(photo);
  }

  //sends ajax request to get places data
  getPlaces = (data) => {

    this.setState({items: [<div className='sweet-loading'>
      <PulseLoader
        color={'#123abc'}
        loading={this.state.loading}
      />
    </div>]})

    $.ajax({
      url:"https://experiencenyc.herokuapp.com/queryplaces",
      type:"GET",
      data: data,
      contentType:"application/json; charset=utf-8",
      dataType:"json"})
      .done((response) => {
       const { classes } = this.props;

       if(response['response'] != "There is no values"){
         const result = response.map((value) =>
         (<Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
           <Card id="card" className={this.inTrip(value['id'] && this.props.tripMode) ? classes.card2 : classes.card1}>
             <CardHeader classes={{subheader: classes.subheader}}
               avatar={
                 <Avatar aria-label="Recipe" src={value['icon']} className={this.props.avatar}/>
               }
               title={value['name']}
               subheader={value['formatted_address']}
             />
           <div style={{overflow:'hidden'}} onClick={() =>{this.getPhotos(value['place_id'])}}>
              <img className="image" style={{width:'100%', height:'226px', objectFit: 'cover', cursor: 'pointer'}} src={value['photos'] ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + "1000"+ "&maxheight=" + "1000" + "&photoreference=" + value['photos'][0]['photo_reference'] + "&key=AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A" : noPhoto}/>
            </div>
             <CardActions className={this.props.actions} disableActionSpacing>
               <div style={{width: '20%'}}>
                   {this.getIcon(value['id'])}
               </div>
               <div style={{width: '25%', textAlign: 'center', display: 'flex'}}>
                 <IconButton>
                   {this.returnPriceLevel(value['price_level'])}
                 </IconButton>
               </div>
               <div style={{width: '35%', textAlign: 'center', display: 'flex'}}>
                 <Typography style={{marginTop: '14px', marginRight: '5px', }}>{value['rating']}</Typography>
                 <IconButton style={{flex: 'auto'}}>
                   {this.returnRatingLevel(value['rating'])}
                 </IconButton>
               </div>
               <div style={{width: '25%', textAlign: 'right'}}>
                 <Button href={"https://www.google.com/maps/search/?api=1&query=Google&query_place_id=" + value['place_id']} target="_blank" color="primary" style={{minWidth: '0px', color: 'white', backgroundColor: 'rgb(0, 188, 212)'}}>
                  GO
                 </Button>
               </div>
             </CardActions>
           </Card>
         </Grid>)
       )
        this.setState({items: result});

       }
       else{
         alert('No data available for that filter!')
         this.setState({filter: {types: [''], price_level: [''], num: '100'}});
       }
    })
  }

  //Load places when component mounts
  componentDidMount = () => {
    this.searchPlaces("initial");
    if(sessionStorage.getItem('username')){
      this.setState({loggedIn: true}, function(){
      this.getTripPlaces();
      this.getTripPlacesIDs();
      })
    }

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
  //listen for new props
  componentWillReceiveProps(nextProps) {
      if(JSON.stringify(nextProps.filter) != JSON.stringify(this.state.filter)){
        this.setState({filter: nextProps.filter}, function() {
          this.searchPlaces("filter");
        });
      }

      if(nextProps.tripMode != this.props.tripMode){
        this.searchPlaces("tripMode");
      }

      if(nextProps.loggedIn != this.props.loggedIn){
        if(nextProps.loggedIn){
          this.setState({inTrip: [], loggedIn: true}, function() {
            this.searchPlaces("loggedIn");
            this.getTripPlaces();
          });
        }
        else{
          this.setState({inTrip: [], loggedIn: false}, function() {
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
      <div id="cardDiv" style={{margin: '1em', height:  window.innerWidth <= 760 ? '75vh' : '100vh',overflowY: 'auto', overflowX: 'hidden'}} onScroll={this.handleScroll}>
        <Grid container spacing={40} justify={'center'} style={{padding: 25, paddingBottom: window.innerWidth <= 760 ? '1em' : '12em', alignItems: 'center', height: this.state.items.length == 1 ? '100%' : 'auto'}}>
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
