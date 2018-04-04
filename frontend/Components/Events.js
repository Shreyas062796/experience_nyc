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
import eventbriteLogo from "./Images/eventbriteLogo.png";

const styles = theme => ({
  card: {
    maxWidth: 400,
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
            filter: {types: '', price_level: '', num: '100'},
            username: sessionStorage.getItem('username'),
            lastScrollPos: 0,
            changedPos: undefined,
            down: true
          };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
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
      button = (<Tooltip id="tooltip-bottom" title="Add to Trip" placement="bottom">
                  <IconButton aria-label="Add to Trip" onClick={() => { this.addTrip(id) }}>
                    <Add  />
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
       (<Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
         <Card className={this.props.card}>
           <CardHeader classes={{root: classes.subheader, title: classes.title}}
             avatar={
               <Avatar aria-label="Recipe" src={value['logo']['original']['url']} className={this.props.avatar}/>
             }
             title={value['name']['text']}
             subheader="Address"
           />
         <div style={{overflow:'hidden'}}>
            <img className="image" style={{width:'100%', height:'226px', objectFit: 'cover'}} src={value['logo']['url']}/>
          </div>
           <CardActions className={this.props.actions} disableActionSpacing>
             <div style={{width: '25%'}}>
                 {this.isFavorite(value['id'])}
             </div>
             <div style={{width: '50%', textAlign: 'center'}}>
                {/*this.isFree(value['is_free'])*/}
                <Button href={value['url']}  target="_blank" style={{minWidth: '0px', width:'10em', padding: '0px'}}>
                   <img src={eventbriteLogo} style={{width: '100%', height: '100%'}}/>
                </Button>
             </div>
             <div style={{width: '25%', textAlign: 'right'}}>
               <Button href={"http://maps.google.com/?q=" + value['name']['text']} target="_blank" color="primary" style={{minWidth: '0px', color: 'white', backgroundColor: 'rgb(0, 188, 212)'}}>
                GO
               </Button>
             </div>
           </CardActions>
         </Card>
       </Grid>)
       );

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
        <Grid container spacing={40} justify={'center'} style={{padding: 25, paddingBottom: window.innerWidth <= 760 ? '1em' : '12em'}}>
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
