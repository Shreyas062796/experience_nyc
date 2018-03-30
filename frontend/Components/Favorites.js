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
import Tooltip from 'material-ui-next/Tooltip';

const styles = theme => ({
  card: {
    maxWidth: 400,
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
  state = { expanded: false, items: []};

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.page == "Favorites"){
      this.getFavorites();
    }
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  returnPriceLevel = (items) => {
    let price = [];
    for(var i=0; i < items; i++){
      price.push(<AttachMoney style={{color: 'rgb(0, 188, 212)', width: '40px'}}/>);
    }
    return price;
  }

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

  componentDidMount = () => {
    if(sessionStorage.getItem('username')){
      this.getFavorites();
    }
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
          this.getFavorites();
        }
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
         <Card className={this.props.card}>
           <CardHeader classes={{subheader: classes.subheader}}
             avatar={
               <Avatar aria-label="Recipe" src={value['icon']} className={this.props.avatar}/>
             }
             title={value['name']}
             subheader={value['formatted_address']}
           />
         <div style={{overflow:'hidden'}}>
            <img className="image" style={{width:'100%', height:'226px', objectFit: 'cover'}} src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + "1000"+ "&maxheight=" + "1000" + "&photoreference=" + value['photos'][0]['photo_reference'] + "&key=AIzaSyA3wV-hPoa6m5Gxjcc_sZ2fyatNS21Pv0A"}/>
          </div>
           <CardActions className={this.props.actions} disableActionSpacing>
             <div style={{width: '20%'}}>
                <Tooltip id="tooltip-bottom" title="Remove Favorite" placement="bottom">
                  <IconButton aria-label="Remove from favorites" onClick={() => { this.removeFavorite(value['id']) }}>
                    <Favorite />
                  </IconButton>
                </Tooltip>
             </div>
             <div style={{width: '25%', textAlign: 'center', display: 'flex'}}>
               <IconButton>
                 {this.returnPriceLevel(value['price_level'])}
               </IconButton>
             </div>
             <div style={{width: '35%', textAlign: 'center', display: 'flex'}}>
               <Typography style={{marginTop: '14px', marginRight: '5px', }}>{value['rating'].toFixed(1)}</Typography>
               <IconButton style={{flex: 'auto'}}>
                 {this.returnRatingLevel(value['rating'])}
               </IconButton>
             </div>
             <div style={{width: '25%', textAlign: 'right'}}>
               <Button href={"http://maps.google.com/?q=" + value['name']} target="_blank" color="primary" style={{minWidth: '0px', color: 'white', backgroundColor: 'rgb(0, 188, 212)'}}>
                GO
               </Button>
             </div>
           </CardActions>
           <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
             <CardContent>
               <Typography paragraph variant="body2">
                 Method:
               </Typography>
               <Typography paragraph>
                 Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                 minutes.
               </Typography>
             </CardContent>
           </Collapse>
         </Card>
       </Grid>)
       );

       this.setState({items: result});
       //console.log(result);
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
