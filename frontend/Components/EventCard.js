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
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from 'material-ui-next/Dialog';

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

class EventCard extends React.Component {
  state = { expanded: false,
            loggedIn:false,
            favorites: [],
            inTrip: [],
            photoHover: false,
            descriptionPopupOpen: false
          };

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
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

  cardWidth = () => {
    return $(card).width();
  }

  getDate = (dateTime) => {
    var unixTime = Date.parse(dateTime);
    return this.dateConverter(unixTime);
  }

  getTime = (dateTime) => {
    var unixTime = Date.parse(dateTime);
    return this.timeConverter(unixTime);
  }

  dateConverter(UNIX_timestamp){
    var date = new Date(UNIX_timestamp);
    var date2 = new Date(UNIX_timestamp*1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date2.getDate();
    var dateFormatted = day + ' ' + month + ' ' + year;
    return dateFormatted;
  }

  timeConverter(UNIX_timestamp){
    var date = new Date(UNIX_timestamp);
    var options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };
    var time = date.toLocaleString('en-US', options);
    return time;
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

  descriptionPopup = () => {
    this.setState({descriptionPopupOpen: true});
  }

  handleDescriptionClose = () => {
    this.setState({descriptionPopupOpen: false});
  }

  getPhotos = (photos) => {
    const photoList = photos.map((value) => (
      <img className="image" style={{width:'100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1}} src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + "10000"+ "&maxheight=" + "10000" + "&photoreference=" + this.props.value['photo_reference'] + "&key=AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A"}/>
    ))

    this.props.getPhotos(photoList);
  }

  render() {
    const { classes } = this.props;

    return (
        <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
        <Dialog
          open={this.state.descriptionPopupOpen}
          onClose={this.handleDescriptionClose}
        >
          <DialogTitle id="alert-dialog-title">{"Description"}</DialogTitle>
          <DialogContent style={{paddingBottom: '0px'}}>
            <DialogContentText id="alert-dialog-description">
                <div dangerouslySetInnerHTML={{__html: this.props.value['description']['html']}}/>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Card className={classes.card1}>
          <CardHeader classes={{root: classes.subheader, title: classes.title}}
            avatar={
              <Avatar aria-label="Recipe" src={this.props.value['logo'] ? this.props.value['logo']['original']['url'] : noPhoto} className={this.props.avatar}/>
            }
            title={this.props.value['name']['text']}
          />
        <div style={{overflow:'hidden'}}>
           <img className="image" style={{width:'100%', height:'226px', objectFit: 'cover'}} src={this.props.value['logo'] ? this.props.value['logo']['original']['url'] : noPhoto}/>
         </div>
          <CardActions className={this.props.actions} disableActionSpacing>
            <div style={{width: '33%'}}>
            </div>
            <div style={{width: '34%', display: 'block', textAlign: 'center', cursor: 'pointer'}} onClick={this.handleExpandClick}>
                <Typography style={{display: 'inline-flex'}}>
                  Details
                </Typography>
                <IconButton style={{width: 'auto'}}
                   aria-label="Show more"
                   aria-expanded={this.state.expanded}
                 >
                   {this.state.expanded ? <ExpandLess /> : <ExpandMore />}
                 </IconButton>
            </div>
            <div style={{width: '33%', textAlign: 'right'}}>
              <Button href={"http://maps.google.com/?q=" + this.props.value['venue_data']['address']['localized_address_display']} target="_blank" color="primary" style={{minWidth: '0px', color: 'rgba(0, 0, 0, 0.87)', border: '1px solid', borderRadius: '4px', marginRight: '1em'}}>
               GO
              </Button>
            </div>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
           <CardContent>
            {this.props.value['description']['html'] ? <div>
            <Typography className={classes.typography}>
            <span style={{fontWeight:"bold"}}>Description: </span>
                <Button onClick={this.descriptionPopup} style={{minWidth: '0px', color: 'rgba(0, 0, 0, 0.87)', border: '1px solid', borderRadius: '4px'}}>
                    See Description
                </Button>
            </Typography>
            <Divider className={classes.divider}/> </div>: false}

            {this.props.value['venue_data']['address']['localized_address_display'] ? <div>
            <Typography className={classes.typography}>
            <span style={{fontWeight:"bold"}}>Address: </span>{this.props.value['venue_data']['address']['localized_address_display']}
            </Typography>
            <Divider className={classes.divider}/> </div>: false}

            {this.props.value['is_free'] ? <div>
            <Typography className={classes.typography}>
            <span style={{fontWeight:"bold"}}>Price: </span>{this.props.value['is_free'] ? 'Free' : 'False'}
            </Typography>
            <Divider className={classes.divider}/>  </div> : false}

            {this.props.value['start']['local'] ? <div>
            <Typography className={classes.typography}>
            <span style={{fontWeight:"bold"}}>Date: </span>{this.getDate(this.props.value['start']['local'])}
            </Typography>
            <Divider className={classes.divider}/> </div>: false}

            {this.props.value['start']['local'] ? <div>
            <Typography className={classes.typography}>
            <span style={{fontWeight:"bold"}}>Start Time: </span>{this.getTime(this.props.value['start']['local'])}
            </Typography>
            <Divider className={classes.divider}/> </div>: false}

            {this.props.value['end']['local'] ? <div>
            <Typography className={classes.typography}>
            <span style={{fontWeight:"bold"}}>End Time: </span>{this.getTime(this.props.value['end']['local'])}
            </Typography>
            <Divider className={classes.divider}/> </div>: false}

            {this.props.value['url'] ?
            <div style={{textAlign: 'center'}}>
            <Button href={this.props.value['url']} target="_blank" style={{minWidth: '0px', color: 'rgba(0, 0, 0, 0.87)', border: '1px solid', borderRadius: '4px'}}>
            Event Page
            </Button>
            </div> : false}
           </CardContent>
         </Collapse>
        </Card>
      </Grid>
    );
  }
}

EventCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const cardsWrapped = withStyles(styles)(EventCard);

export default cardsWrapped;
