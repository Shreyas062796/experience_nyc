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
import Check from 'material-ui-icons/Check';
import Tooltip from 'material-ui-next/Tooltip';
import cyan from 'material-ui-next/colors/cyan';
import noPhoto from "./Images/nophoto.png";
import { PulseLoader } from 'react-spinners';
import Divider from 'material-ui-next/Divider';
import Chip from 'material-ui-next/Chip';


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
  },
  divider: {
    margin: '1em'
  },
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: '1%',
  },
  typography: {
    fontSize: '1em'
  },
  morePhotos: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    width: '10em',
    height: '3em',
    fontSize: '1em',
    color: 'rgba(255, 255, 255, 0.79)',
    backgroundColor: '#ffffff4a',
  }
});

class PlaceCard extends React.Component {
  state = { expanded: [],
            loggedIn:false,
            favorites: [],
            inTrip: [],
            priceKeys: {1: 'Cheap', 2: 'Average', 3: 'Pricey', 4: 'Expensive'},
            photoHover: false
          };

  handleExpandClick = (id) => {
    let tempExpanded = this.state.expanded;

    if(tempExpanded.includes(id)){
      var index = tempExpanded.indexOf(id);
      tempExpanded.splice(index, 1);
    }
    else{
      tempExpanded.push(id);
    }

    this.setState({expanded: tempExpanded});
  };

  removeFavorite = (id) => {
    let tempFavorite = this.state.favorites;
    var index = tempFavorite.indexOf(id);
    tempFavorite.splice(index, 1);
    this.setState({favorites: tempFavorite});
    if(this.state.loggedIn){
      this.props.removeFavorite(id)
    }
  }

  addFavorite = (id) => {
    let tempFavorite = this.state.favorites;
    tempFavorite.push(id);
    this.setState({favorites: tempFavorite});
    if(this.state.loggedIn){
      this.props.addFavorite(id)
    }
  }

  removeFromTrip = (id) => {
    let tempInTrip = this.state.inTrip;
    var index = tempInTrip.indexOf(id);
    tempInTrip.splice(index, 1);
    this.setState({inTrip: tempInTrip});
    this.props.removeFromTrip(id)
  }

  addToTrip = (id, name, lat, lng) => {
    let tempInTrip = this.state.inTrip;
    tempInTrip.push(id);
    this.setState({inTrip: tempInTrip});
    this.props.addToTrip(id, name, lat, lng)
  }

  componentWillMount = () => {
    if(sessionStorage.getItem('username')){
      this.setState({loggedIn: true, favorites: this.props.favorites, inTrip: this.props.inTrip})
    }
  }

  componentDidMount = () => {

  }

  //generate list of dollar sign components based on passed price level
  returnPriceLevel = (items) => {
    let price = [];
    for(var i=0; i < items; i++){
      price.push(<AttachMoney style={{color: 'rgba(0, 0, 0, 0.87)', height: '', width: '20px'}}/>);
    }
    for(var i=price.length; i < 5; i++){
      price.push(<AttachMoney style={{color: 'rgba(0, 0, 0, 0.3)', height: '', width: '20px'}}/>);
    }
    return price;
  }

  //generate list of star components based on passed rating
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

  //check favorite list for passed id and return either a filler in or empty heart component
  getIcon = (id) => {
    var button = ''
    //console.log(this.props);
    if(this.props.favorites){
      if(this.props.favorites.includes(id) && sessionStorage.getItem('username')){
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
    }
    return button;
  }

  getPhotos = (photos) => {
    const photoList = photos.map((value) => (
      <img className="image" style={{width:'100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1}} src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + "10000"+ "&maxheight=" + "10000" + "&photoreference=" + value['photo_reference'] + "&key=AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A"}/>
    ))

    this.props.getPhotos(photoList);
  }

  getTags = (types) => {
    const { classes } = this.props;

    const tags = types.map((value) => (
      <Chip label={value} className={classes.chip} />
    ))

    return tags;
  }

  getHours = (hoursList) => {
    const hours = hoursList.map((value) => (
      <span style={{display: 'block'}}>{value}</span>
    ))

    return hours;
  }

  onHover = () => {
    this.setState({photoHover: true});
  }

  onLeave = () => {
    this.setState({photoHover: false});
  }


  render() {
    const { classes } = this.props;

    return (
      <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
         <Card id="card" className={this.props.inTrip.includes(this.props.value['place_id']) ? classes.card2 : classes.card1}>
           <CardHeader classes={{subheader: classes.subheader}}
             avatar={
               <Avatar aria-label="Recipe" src={this.props.value['icon']} className={this.props.avatar}/>
             }
             title={this.props.value['name']}
             subheader={this.props.value['formatted_address']}
             action={
                     <Tooltip id="tooltip-bottom" title={this.props.inTrip.includes(this.props.value['place_id']) ? "Remove From Trip" : "Add to Trip"} placement="bottom">
                       <IconButton aria-label={this.props.inTrip.includes(this.props.value['place_id']) ? "Remove from Trip" : "Add to Trip"} onClick={() => {this.state.inTrip.includes(this.props.value['place_id']) ? this.removeFromTrip(this.props.value['place_id']) : this.addToTrip(this.props.value['place_id'], this.props.value['name'], this.props.value['geometry']['location']['lat'], this.props.value['geometry']['location']['lng'], this)}}>
                         {this.props.inTrip.includes(this.props.value['place_id']) ? <Check  /> : <Add  />}
                       </IconButton>
                     </Tooltip>
              }
           />
         <Divider inset/>
         <div style={{display:'flex'}}>
           <div style={{width: '50%', justifyContent: 'center', display: 'inline-flex'}}>
             <IconButton style={{flex: 'auto'}}>
               {this.returnPriceLevel(this.props.value['price_level'])}
             </IconButton>
           </div>
           <div style={{width: '40%',display: 'inline-flex'}}>
             {/*<Typography style={{marginTop: '14px', marginRight: '5px', }}>{value['rating']}</Typography>*/}
             <IconButton style={{flex: 'auto'}}>
               {this.returnRatingLevel(this.props.value['rating'])}
             </IconButton>
           </div>
        </div>
          <div style={{overflow:'hidden', position: 'relative'}} onMouseOver={this.onHover} onMouseLeave={this.onLeave} >
            <Chip label="More Photos" className={classes.morePhotos} style={{display: this.state.photoHover ? 'flex' : 'none'}} onClick={() =>{this.getPhotos(this.props.value['photos'])}}/>
            <img className="image" style={{width:'100%', height:'226px', objectFit: 'cover', cursor: 'pointer'}} src={this.props.value['photos'] ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + "1000"+ "&maxheight=" + "1000" + "&photoreference=" + this.props.value['photos'][0]['photo_reference'] + "&key=AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A" : noPhoto}/>
          </div>
           <CardActions className={this.props.actions} disableActionSpacing>
             <div style={{width: '33%'}}>
               <Tooltip id="tooltip-bottom" title={this.state.favorites.includes(this.props.value['place_id']) ? "Remove From Favorites" : "Add To Favorites"} placement="bottom">
                 <IconButton onClick={() => {this.state.favorites.includes(this.props.value['place_id']) ? this.removeFavorite(this.props.value['place_id']) : this.addFavorite(this.props.value['place_id'])}}>
                   {this.state.favorites.includes(this.props.value['place_id']) ? <Favorite /> : <FavoriteBorder /> }
                 </IconButton>
               </Tooltip>
             </div>
             <div style={{width: '34%', display: 'block', textAlign: 'center', cursor: 'pointer'}} onClick={() =>{this.handleExpandClick(this.props.value['place_id'])}}>
                 <Typography style={{display: 'inline-flex'}}>
                   Details
                 </Typography>
                 <IconButton style={{width: 'auto'}}
                    aria-label="Show more"
                    aria-expanded={this.state.expanded.includes(this.props.value['place_id'])}
                  >
                    {this.state.expanded.includes(this.props.value['place_id']) ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
             </div>
             <div style={{width: '33%', textAlign: 'right'}}>
               <Button href={"https://www.google.com/maps/search/?api=1&query=Google&query_place_id=" + this.props.value['place_id']} target="_blank" style={{minWidth: '0px', color: 'rgba(0, 0, 0, 0.87)', border: '1px solid', borderRadius: '4px', marginRight: '1em'}}>
                GO
               </Button>
             </div>
           </CardActions>
           <Collapse in={this.state.expanded.includes(this.props.value['place_id'])} timeout="auto" unmountOnExit>
            <CardContent>
              {this.props.value['rating'] ? <div>
              <Typography className={classes.typography}>
                Rating: {this.props.value['rating']}
              </Typography>
              <Divider className={classes.divider}/> </div>: false}

              {this.props.value['price_level'] ? <div>
              <Typography className={classes.typography}>
                Price: {this.state.priceKeys[this.props.value['price_level']]}
              </Typography>
              <Divider className={classes.divider}/>  </div> : false}

              {this.props.value['formatted_phone_number'] ? <div>
              <Typography className={classes.typography}>
                Phone Number: {this.props.value['formatted_phone_number']}
              </Typography>
              <Divider className={classes.divider}/> </div> : false}

              {this.props.value['opening_hours'] ? <div>
              <Typography className={classes.typography} style={{textAlign: 'center'}}>
                Hours <Chip label={this.props.value['opening_hours']['open_now'] ? 'Open' : 'Closed'} style={{backgroundColor: this.props.value['opening_hours']['open_now'] ? '#00ff159e' : '#f44336de'}} className={classes.chip} />
              </Typography>
              <Typography paragraph className={classes.typography}>
                {this.getHours(this.props.value['opening_hours']['weekday_text'])}
              </Typography>
              <Divider className={classes.divider}/> </div>: false}

              {this.props.value['types'] ?
              <div className={classes.root}>
              <Typography style={{display: 'inline-block'}} className={classes.typography}>
                Tags:
              </Typography>
                {this.getTags(this.props.value['types'])}
              <Divider className={classes.divider}/> </div>: false}

              {this.props.value['website'] ?
              <div style={{textAlign: 'center'}}>
                <Button href={this.props.value['website']} target="_blank" style={{minWidth: '0px', color: 'rgba(0, 0, 0, 0.87)', border: '1px solid', borderRadius: '4px'}}>
                 Website
                </Button>
              </div> : false}
            </CardContent>
          </Collapse>
         </Card>
       </Grid>
    );
  }
}

PlaceCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const cardsWrapped = withStyles(styles)(PlaceCard);

export default cardsWrapped;
