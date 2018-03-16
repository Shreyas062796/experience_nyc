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
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Grid from 'material-ui-next/Grid';
import Button from 'material-ui-next/Button';
import Star from 'material-ui-icons/Star';
import Send from 'material-ui-icons/Send';
import AttachMoney from 'material-ui-icons/AttachMoney';

const styles = theme => ({
  card: {
    maxWidth: 400,
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

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  componentDidMount = () => {
    $.get( "https://enyc-m.herokuapp.com/topbars/6")
     .done((response) => {

       let price = '';

       for(var i=0; i < parseInt(response['price_level']); i++){
         console.log('test');
         price += <AttachMoney style={{color: 'rgb(0, 188, 212)', width: '40px'}}/>
       }
       console.log(price);


       const result = response.map((value) =>
       (<Grid item md={4}>
         <Card className={this.props.card}>
           <CardHeader
             avatar={
               <Avatar aria-label="Recipe" src={value['icon']} className={this.props.avatar}/>
             }
             title={value['name']}
             subheader={value['formatted_address']}
           />
         <div style={{overflow:'hidden'}}>
            <img className="image" style={{maxHeight: '226px', objectFit: 'cover'}} src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + "1000"+ "&maxheight=" + "1000" + "&photoreference=" + value['photos'][0]['photo_reference'] + "&key=AIzaSyB7Hu52lUJ-yM-BHHbHqRYdUezLMGVpn0I"}/>
          </div>
           <CardActions className={this.props.actions} disableActionSpacing>
             <div style={{width: '25%'}}>
               <IconButton aria-label="Add to favorites">
                 <FavoriteIcon />
               </IconButton>
             </div>
             <div style={{width: '25%', textAlign: 'center', display: 'flex'}}>
               <IconButton>
                 {price}
               </IconButton>
             </div>
             <div style={{width: '25%', textAlign: 'center', display: 'flex'}}>
               <Typography style={{marginTop: '14px', marginRight: '5px', }}>{value['rating']}</Typography>
               <IconButton style={{flex: 'auto'}}>
                 <Star style={{color: 'rgb(0, 188, 212)', height: '', width: '75px'}}/><Star style={{color: 'rgb(0, 188, 212)', width: '75px'}}/><Star style={{color: 'rgb(0, 188, 212)', width: '75px'}}/><Star style={{color: 'rgb(0, 188, 212)', width: '75px'}}/><Star style={{color: 'rgb(0, 188, 212)', width: '75px'}}/>
               </IconButton>
             </div>
             <div style={{width: '25%', textAlign: 'right'}}>
               <Button href={"http://maps.google.com/?q=" + value['formatted_address']} target="_blank" color="primary" style={{minWidth: '0px', color: 'white', backgroundColor: 'rgb(0, 188, 212)'}}>
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
      <div style={{margin: 10, height: '75vh',overflowY: 'auto', overflowX: 'hidden'}}>
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
