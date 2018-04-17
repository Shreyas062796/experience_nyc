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

class TripCard extends React.Component {

  state = { expanded: false,
            loggedIn:false
          };

  componentWillMount = () => {
    if(sessionStorage.getItem('username')){
      this.setState({loggedIn: true}, function(){
      })
    }
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

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

  render() {
    const { classes } = this.props;

    return (
      <Card style={{margin: '1em'}}>
        <CardHeader classes={{subheader: classes.subheader}}
          avatar={
            <Avatar aria-label="Recipe" src={this.props.value['icon']} className={this.props.avatar}/>
          }
          title={this.props.value['name']}
          subheader={this.props.value['formatted_address']}
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
        <CardActions className={this.props.actions} disableActionSpacing>
          <div style={{width: '100%', textAlign: 'center'}}>
            <Button target="_blank" onClick={() => {this.props.removeFromTrip(this.props.value['place_id'])}} className={classes.button}>
             Remove
            </Button>
          </div>
        </CardActions>
      </Card>
    );
  }
}

TripCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const cardsWrapped = withStyles(styles)(TripCard);

export default cardsWrapped;
