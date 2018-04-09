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

const styles = theme => ({
  card1: {
    maxWidth: 400,
    borderRadius: '4px',
    border: '1px solid #24292e'
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
  state = { expanded: false,
            items: [],
            favorites: [],
            filter: {types: '', price_level: '', num: '100'},
            username: sessionStorage.getItem('username')
          };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };


  handleScroll = () => {
    const thisPos = document.getElementById('recommendedEventsDiv').scrollTop;
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

  //check favorite list for passed id and return either a filler in or empty heart component
  getIcon = (id) => {
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

  returnPriceLevel = (items) => {
    let price = [];
    for(var i=0; i < items; i++){
      price.push(<AttachMoney style={{color: 'rgba(0, 0, 0, 0.87)', width: '20px'}}/>);
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

  inTrip = (id) => {
    if(this.state.inTrip.includes(id)){
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
      url:"https://experiencenyc.herokuapp.com/addfavoriteplaces",
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
      url:"https://experiencenyc.herokuapp.com/removefavoriteplaces",
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

  addTrip(id){

  }

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


  //listen for new props
  componentWillReceiveProps(nextProps) {
    if((this.props.loggedIn != nextProps.loggedIn) && nextProps.loggedIn){
      this.getRecommended();
    }
  }

  //search for places
  getRecommended = () => {

    //set list of favorites for current user
    //this.setFavorites();

    var data = {username: sessionStorage.getItem('username'), address: '33rd Street station New York, NY 10001'};

    $.ajax({
      url:"https://experiencenyc.herokuapp.com/recommendedplaces",
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
         <div style={{overflow:'hidden'}}>
            <img className="image" style={{width:'100%', height:'226px', objectFit: 'cover'}} src={value['photos'] ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + "1000"+ "&maxheight=" + "1000" + "&photoreference=" + value['photos'][0]['photo_reference'] + "&key=AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A" : noPhoto}/>
          </div>
          <CardActions className={this.props.actions} disableActionSpacing>
            <div style={{width: '33%'}}>
                {this.getIcon(value['place_id'])}
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
       this.setState({items: result});
     }
    })
  }

  //Load places when component mounts
  componentDidMount = () => {
    if(this.props.loggedIn){
      this.getRecommended();
    }
  }

  render() {
    const { classes } = this.props;



    return (
      <div id='recommendedEventsDiv' style={{margin: '1em', height:  window.innerWidth <= 760 ? '75vh' : '100vh',overflowY: 'auto', overflowX: 'hidden'}} onScroll={this.handleScroll}>
        <Grid container spacing={40} justify={'center'} style={{padding: 25, paddingBottom: window.innerWidth <= 760 ? '1em' : '12em'}}>
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
