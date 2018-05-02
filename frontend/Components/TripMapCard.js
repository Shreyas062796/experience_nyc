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
import UpArrow from 'material-ui-icons/ArrowUpward';
import DownArrow from 'material-ui-icons/ArrowDownward';
import Clear from 'material-ui-icons/Clear';
import Check from 'material-ui-icons/Check';
import Tooltip from 'material-ui-next/Tooltip';
import cyan from 'material-ui-next/colors/cyan';
import noPhoto from "./Images/nophoto.png";
import { PulseLoader } from 'react-spinners';
import Divider from 'material-ui-next/Divider';
import Draggable from 'react-draggable';

const styles = theme => ({
  card1: {
    borderRadius: '4px',
    border: '1px solid #24292e'
  },
  card2: {
    maxWidth: 400,
    borderRadius: '4px',
    border: '1px solid #24292e',
    boxShadow: '0px 0px 18px -1px rgba(0,208,255,1)'
  },
  details: {
    display: 'flex',
  },
  button: {
    minWidth: '0px',
    color: 'rgba(0, 0, 0, 0.87)',
    borderLeft: '1px solid',
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
  order: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    width: '10%', 
    backgroundColor: '#3f51b5'
  },
  arrows: {
    width: '50px',
    height: '50px'
  },
  arrowsMobile: {
    width: '25px',
    height: '25px'
  },
  heading: {
    fontSize: '1.5rem'
  },
  headingMobile: {
    fontSize: '1rem'
  },
  subheading: {
    fontSize: '1rem'
  },
  subheadingMobile: {
    fontSize: '0.75rem'
  },
  tripMapCardButtons: {
    borderLeft: '1px solid', 
    borderRadius: '0px', 
    minWidth: '0px', 
    width: '100%',
    padding: '0px'
  }
});

class TripMapCard extends React.Component {

  state = {
            loggedIn:false,
            Alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
          };

  componentWillMount = () => {
    if(sessionStorage.getItem('username')){
      this.setState({loggedIn: true}, function(){
      })
    }
  }

  handleSelect = (id) => {
    this.props.handleCardSelect(id);
  }

  cardWidth = () => {
    return $(card).width();
  }

  render() {
    const { classes } = this.props;

    return (
            <Card className={classes.card1} style={{margin: '1em', backgroundColor: (this.props.selectedCard == this.props.value['place_id']) ? '#a7e2ff' : 'white', cursor: 'pointer'}}>
            <div className={classes.details}>
                <div className={classes.order}>
                    <Typography style={{color: 'white', fontSize: '2.5rem'}}>
                        {/*this.state.Alphabet[this.props.order]*/}
                        {this.props.order + 1}
                    </Typography>
                </div>
                <CardContent style={{width: this.props.order > 0  && !this.props.last ? '60%' : '70%'}} onClick={() => {this.handleSelect(this.props.value['place_id'])}}>
                    <Typography className={window.innerWidth <= 768 ? classes.headingMobile :  classes.heading} variant="headline">{this.props.value['name']}</Typography>
                    <Typography className={window.innerWidth <= 768 ? classes.subheadingMobile :  classes.subheading} variant="subheading" color="textSecondary">
                    {this.props.value['formatted_address']}
                    </Typography>
                </CardContent>
                {(this.props.order > 0 && !this.props.last) ? <div style={{width: '10%', display: 'inline-flex', justifyContent: 'flex-end'}}>
                    <Button onClick={() => {this.props.moveDown(this.props.order)}} className={classes.tripMapCardButtons}>
                        <DownArrow className={window.innerWidth <= 768 ? classes.arrowsMobile :  classes.arrows}/>
                    </Button>
                </div> : false}
                <div style={{width: '10%', display: 'inline-flex', justifyContent: 'flex-end'}}>
                    <Button onClick={() => {this.props.order > 0 ? this.props.moveUp(this.props.order) : this.props.moveDown(this.props.order)}} className={classes.tripMapCardButtons}>
                        {this.props.order > 0 ? <UpArrow className={window.innerWidth <= 768 ? classes.arrowsMobile :  classes.arrows}/> : <DownArrow className={window.innerWidth <= 768 ? classes.arrowsMobile : classes.arrows}/>}
                    </Button>
                </div>
                <div style={{width: '10%', display: 'inline-flex'}}>
                    <Button target="_blank" onClick={() => {this.props.remove(this.props.order)}} className={classes.tripMapCardButtons}>
                        <Clear />
                    </Button>
                </div>
            </div>
            <CardMedia
                image= {this.props.value['photos'] ? "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + "1000"+ "&maxheight=" + "1000" + "&photoreference=" + this.props.value['photos'][0]['photo_reference'] + "&key=AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A" : noPhoto}
            />
            </Card>
    
    );
  }
}

TripMapCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const cardsWrapped = withStyles(styles)(TripMapCard);

export default cardsWrapped;
