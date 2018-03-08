<<<<<<< HEAD
<<<<<<< HEAD
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
  },
});

class Cards extends React.Component {
  state = { expanded: false, items: []};

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  componentDidMount = () => {
    $.get( "https://enyc-m.herokuapp.com/topbars/10")
     .done((response) => {

       const result = response.map((value) =>
       (<Grid item md={4}>
         <Card className={this.props.card}>
           <CardHeader
             avatar={
               <Avatar aria-label="Recipe" src={value['icon']} className={this.props.avatar}/>
             }
             action={
               <IconButton>
                 <MoreVertIcon />
               </IconButton>
             }
             title={value['name']}
             subheader={value['formatted_address']}
           />
         <img className="image" src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + "315"+ "&maxheight=" + "300" + "&photoreference=" + value['photos'][0]['photo_reference'] + "&key=AIzaSyB7Hu52lUJ-yM-BHHbHqRYdUezLMGVpn0I"}/>

           <CardContent>
             <Typography component="p">

             </Typography>
           </CardContent>
           <CardActions className={this.props.actions} disableActionSpacing>
             <IconButton aria-label="Add to favorites">
               <FavoriteIcon />
             </IconButton>
             <IconButton aria-label="Share">
               <ShareIcon />
             </IconButton>
             <IconButton
               className={classnames(this.props.expand, {
                 [this.props.expandOpen]: this.state.expanded,
               })}
               onClick={this.handleExpandClick}
               aria-expanded={this.state.expanded}
               aria-label="Show more"
             >
               <ExpandMoreIcon />
             </IconButton>
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

    const placeCard = (<Grid item md={4}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          className={classes.media}
          image="../Images/moma.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with
            your guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
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
    </Grid>);

    return (
      <div style={{margin: 25, height: '100vh',overflowY: 'auto', overflowX: 'hidden'}}>
        <Grid container spacing={40} justify={'center'} style={{padding: 10}}>
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
=======
=======
>>>>>>> 3f14d1de5d8a582c053f88b622271b73013d8f33
import React from "react";

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row" style={{marginTop: "8%"}}>
        <div className="row">
          <label className="col s1 offset-s1">Filter by:</label>
          <select className="browser-default col s1">
            <option value="" disabled selected></option>
            <option value="Popularity">Popularity</option>
            <option value="Rating">Rating</option>
            <option value="Price">Price</option>
          </select>
          <select className="browser-default col s1">
            <option value="" disabled selected></option>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </select>
        </div>
        <div className="col s8 offset-s1">
          <h2 className="center">Trending</h2>
          <div className="row">
            <div className="col s4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="./moma.jpg" style={{maxHeight: 226, objectFit: 'cover'}} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">Museum of Modern Art<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">Website</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4"><i className="material-icons left">close</i></span>
                  <img src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyDC23oDwr83Xdm4SkNoVfRw_LOdBGeMrHI" />
                </div>
              </div>
            </div>
            <div className="col s4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="./office.jpg" style={{maxHeight: 226, objectFit: 'cover'}} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
              </div>
            </div>
            <div className="col s4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="./office.jpg" style={{maxHeight: 226, objectFit: 'cover'}} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
              </div>
            </div>
            <h2 className="center">Nearby</h2>
            <div className="col s4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="./office.jpg" style={{maxHeight: 226, objectFit: 'cover'}} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <img src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyDC23oDwr83Xdm4SkNoVfRw_LOdBGeMrHI" />
                </div>
              </div>
            </div>
            <div className="col s4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="./office.jpg" style={{maxHeight: 226, objectFit: 'cover'}} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
              </div>
            </div>
            <div className="col s4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="./office.jpg" style={{maxHeight: 226, objectFit: 'cover'}} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
              </div>
            </div>
            <h2 className="center">Top Rated</h2>
            <div className="col s4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="./office.jpg" style={{maxHeight: 226, objectFit: 'cover'}} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <img src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyDC23oDwr83Xdm4SkNoVfRw_LOdBGeMrHI" />
                </div>
              </div>
            </div>
            <div className="col s4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="./office.jpg" style={{maxHeight: 226, objectFit: 'cover'}} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
              </div>
            </div>
            <div className="col s4">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src="./office.jpg" style={{maxHeight: 226, objectFit: 'cover'}} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                  <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
              </div>
            </div>
          </div>
        </div></div>
    );
  }
}
<<<<<<< HEAD
>>>>>>> master
=======
>>>>>>> 3f14d1de5d8a582c053f88b622271b73013d8f33
