import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui-next/BottomNavigation';
import Search from 'material-ui-icons/Search';
import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    boxShadow: '0px -0.5px 2px 0px rgba(51,51,51,0.25)',
  },
  buttons: {
    paddingLeft: 0,
    paddingRight: 0
  }
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
    marginRight: 300,
    pageKeys: {0 : 'Places', 1 : 'Events', 2 : 'Favorites', 3 : 'Trips'},
    display: true,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.pageChange(this.state.pageKeys[value]);
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.display){
      this.setState({display: 'block'});
    }
    else{
      this.setState({display: 'none'});
    }
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
        style={{display: this.state.display}}
      >
        <BottomNavigationAction className={classes.buttons} label="Places" icon={<Search />} />
        <BottomNavigationAction className={classes.buttons} label="Events" icon={<Search />} />
        <BottomNavigationAction className={classes.buttons} label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction className={classes.buttons} label="Trips" icon={<LocationOnIcon />} />
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);
