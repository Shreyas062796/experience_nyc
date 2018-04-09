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
            inTrip: [],
            favorites: []
          };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.page == "Favorites"){
      this.getFavorites();
    }

    if(nextProps.inTrip != this.state.inTrip){
      this.setState({inTrip: nextProps.inTrip});
    }
  }

  componentWillMount = () => {
    this.setState({loggedIn: this.props.loggedIn});
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

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

  returnPriceLevel = (items) => {
    let price = [];
    for(var i=0; i < items; i++){
      price.push(<AttachMoney style={{color: 'rgba(0, 0, 0, 0.87)', width: '20px'}}/>);
    }
    return price;
  }

  returnRatingLevel = (items) => {
    let ratingStars = [];
    let floor = Math.floor(items)
    for(var i=0; i < floor; i++){
      ratingStars.push(<Star style={{color: 'rgba(0, 0, 0, 0.87)', height: '', width: '20px'}}/>);
    }
    if((items % 1) > 0.2){
      ratingStars.push(<StarHalf style={{color: 'rgba(0, 0, 0, 0.87)', height: '', width: '20px'}}/>);
      for(var i = 0; i < (4-floor); i++){
        ratingStars.push(<StarBorder style={{color: 'rgba(0, 0, 0, 0.87)', height: '', width: '20px'}}/>);
      }
    }
    else{
      for(var i = 0; i < (5-floor); i++){
        ratingStars.push(<StarBorder style={{color: 'rgba(0, 0, 0, 0.87)', height: '', width: '20px'}}/>);
      }
    }
    return ratingStars;
  }

  cardWidth = () => {
    return $(card).width();
  }

  componentDidMount = () => {
    if(sessionStorage.getItem('username')){
      this.getFavorites();
    }
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
        //this.props.snackbar('Added To Trip!')
        this.getTripPlaces();
      }
        this.getFavorites();
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
        this.getFavorites();
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
              <Card style={{margin: '1em'}} className={this.inTrip(value['place_id'])}>
                <CardHeader classes={{subheader: classes.subheader}}
                  avatar={
                    <Avatar aria-label="Recipe" src={value['icon']} className={this.props.avatar}/>
                  }
                  title={value['name']}
                  subheader={value['formatted_address']}
                />
                <Divider inset/>
                <div style={{display:'flex'}}>
                  <div style={{width: '50%', justifyContent: 'center', display: 'inline-flex'}}>
                    <IconButton style={{flex: 'auto'}}>
                      {this.returnPriceLevel(value['price_level'])}
                    </IconButton>
                  </div>
                  <div style={{width: '40%',display: 'inline-flex'}}>
                    {/*<Typography style={{marginTop: '14px', marginRight: '5px', }}>{value['rating']}</Typography>*/}
                    <IconButton style={{flex: 'auto'}}>
                      {this.returnRatingLevel(value['rating'])}
                    </IconButton>
                  </div>
                </div>
              <div style={{overflow:'hidden'}} onClick={() =>{this.getPhotos(value['place_id'])}}>
                 <img className="image" style={{width:'100%', height:'226px', objectFit: 'cover', cursor: 'pointer'}} src={value['photos'] ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + "1000"+ "&maxheight=" + "1000" + "&photoreference=" + value['photos'][0]['photo_reference'] + "&key=AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A" : noPhoto}/>
               </div>
                <CardActions className={this.props.actions} disableActionSpacing>
                  <div style={{width: '100%', textAlign: 'center'}}>
                    <Button target="_blank" onClick={() => {this.removeFromTrip(value['place_id'])}} className={classes.button}>
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
                  <Card style={{margin: '1em'}} className={this.inTrip(value['place_id'])}>
                    <CardHeader classes={{subheader: classes.subheader}}
                      avatar={
                        <Avatar aria-label="Recipe" src={value['icon']} className={this.props.avatar}/>
                      }
                      title={value['name']}
                      subheader={value['formatted_address']}
                      action={
                              <Tooltip id="tooltip-bottom" title={this.inTrip(value['place_id']) ? "Remove From Trip" : "Add to Trip"} placement="bottom">
                                <IconButton aria-label={this.inTrip(value['place_id']) ? "Remove from Trip" : "Add to Trip"} onClick={() => {this.inTrip(value['place_id']) ? this.removeFromTrip(value['place_id']) : this.addToTrip(value['place_id'], this)}}>
                                  {this.inTrip(value['place_id']) ? <Check  /> : <Add  />}
                                </IconButton>
                              </Tooltip>
                       }
                    />
                    <Divider inset/>
                    <div style={{display:'flex'}}>
                      <div style={{width: '50%', justifyContent: 'center', display: 'inline-flex'}}>
                        <IconButton style={{flex: 'auto'}}>
                          {this.returnPriceLevel(value['price_level'])}
                        </IconButton>
                      </div>
                      <div style={{width: '40%',display: 'inline-flex'}}>
                        {/*<Typography style={{marginTop: '14px', marginRight: '5px', }}>{value['rating']}</Typography>*/}
                        <IconButton style={{flex: 'auto'}}>
                          {this.returnRatingLevel(value['rating'])}
                        </IconButton>
                      </div>
                    </div>
                  <div style={{overflow:'hidden'}} onClick={() =>{this.getPhotos(value['place_id'])}}>
                     <img className="image" style={{width:'100%', height:'226px', objectFit: 'cover', cursor: 'pointer'}} src={value['photos'] ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + "1000"+ "&maxheight=" + "1000" + "&photoreference=" + value['photos'][0]['photo_reference'] + "&key=AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A" : noPhoto}/>
                   </div>
                    <CardActions className={this.props.actions} disableActionSpacing>
                      <div style={{width: '100%', textAlign: 'center'}}>
                        <Button target="_blank" onClick={() => {this.removeFromTrip(value['place_id'])}} className={classes.button}>
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
        this.getTripPlacesIDs();
        this.getFavorites();
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
          this.props.snackbar("Removed From Favorites")
          this.getFavorites();
        }
      })
  }

  inTrip = (id) => {
    if(this.props.inTrip.includes(id)){
      return true;
    }
    else{
      return false;
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

  //get favorites and display
  getFavorites = () => {
    var data = {username: sessionStorage.getItem('username')};

    $.ajax({
      url:"https://experiencenyc.herokuapp.com/getfavoriteplaces",
      type:"POST",
      data: JSON.stringify(data),
      contentType:"application/json; charset=utf-8",
      dataType:"json"})
      .done((response) => {
       const { classes } = this.props;
       const result = response.map((value) =>
        (<Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
         <Card className={classes.card1}>
           <CardHeader classes={{subheader: classes.subheader}}
             avatar={
               <Avatar aria-label="Recipe" src={value['icon']} className={this.props.avatar}/>
             }
             title={value['name']}
             subheader={value['formatted_address']}
             action={
                     <Tooltip id="tooltip-bottom" title={this.inTrip(value['place_id']) ? "Remove From Trip" : "Add to Trip"} placement="bottom">
                       <IconButton aria-label={this.inTrip(value['place_id']) ? "Remove from Trip" : "Add to Trip"} onClick={() => {this.inTrip(value['place_id']) ? this.removeFromTrip(value['place_id']) : this.addToTrip(value['place_id'], this)}}>
                         {this.inTrip(value['place_id']) ? <Check  /> : <Add  />}
                       </IconButton>
                     </Tooltip>
              }
           />
           <Divider inset/>
           <div style={{display:'flex'}}>
             <div style={{width: '50%', justifyContent: 'center', display: 'inline-flex'}}>
               <IconButton style={{flex: 'auto'}}>
                 {this.returnPriceLevel(value['price_level'])}
               </IconButton>
             </div>
             <div style={{width: '40%',display: 'inline-flex'}}>
               {/*<Typography style={{marginTop: '14px', marginRight: '5px', }}>{value['rating']}</Typography>*/}
               <IconButton style={{flex: 'auto'}}>
                 {this.returnRatingLevel(value['rating'])}
               </IconButton>
             </div>
           </div>
         <div style={{overflow:'hidden'}} onClick={() =>{this.getPhotos(value['place_id'])}}>
            <img className="image" style={{width:'100%', height:'226px', objectFit: 'cover', cursor: 'pointer'}} src={value['photos'] ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + "1000"+ "&maxheight=" + "1000" + "&photoreference=" + value['photos'][0]['photo_reference'] + "&key=AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A" : noPhoto}/>
          </div>
           <CardActions className={this.props.actions} disableActionSpacing>
             <div style={{width: '33%'}}>
             <Tooltip id="tooltip-bottom" title="Remove Favorite" placement="bottom">
                 <IconButton aria-label="Remove from Favorites" onClick={() => { this.removeFavorite(value['place_id']) }}>
                     <Favorite />
                 </IconButton>
               </Tooltip>
             </div>
             <div style={{width: '34%', display: 'block', textAlign: 'center'}}>
                 <Typography style={{display: 'inline-flex', cursor: 'pointer'}}>
                   Details
                 </Typography>
                 <IconButton
                    aria-label="Show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
             </div>
             <div style={{width: '33%', textAlign: 'right'}}>
               <Button href={"https://www.google.com/maps/search/?api=1&query=Google&query_place_id=" + value['place_id']} target="_blank" style={{minWidth: '0px', color: 'rgba(0, 0, 0, 0.87)', border: '1px solid', borderRadius: '4px', marginRight: '1em'}}>
                GO
               </Button>
             </div>
           </CardActions>
         </Card>
       </Grid>
     ));
      if(JSON.stringify(this.state.items) != JSON.stringify(result)){
        this.setFavorites();
        this.setState({items: result});
     };
    });
  }

  render() {
    const { classes } = this.props;



    return (
      <div style={{margin: '1em', height: '90vh',overflowY: 'auto', overflowX: 'hidden'}}>
        <Grid container spacing={40} justify={'center'} style={{padding: 25}}>
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
