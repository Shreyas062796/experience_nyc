import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import AppBar from 'material-ui-next/AppBar';
import Tabs, { Tab } from 'material-ui-next/Tabs';
import Typography from 'material-ui-next/Typography';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class FullWidthTabs extends React.Component {
  state = {
    value: 1,
    pageKeys: {0: 'Recommended', 1 : 'Places', 2 : 'Events', 3 : 'Favorites'},
    disabled: false
  };

  handleChange = (event, value) => {
    if(this.props.loggedIn || (!this.props.loggedIn && (value != 0 && value != 3))){
      this.setState({value: value });
      this.props.pageChange(this.state.pageKeys[value]);
    }
    else{
      this.popupLogin();
    }
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentWillReceiveProps = (nextProps) =>{
    if(nextProps.loggedIn){
      this.setState({disabled: false});
      if(!this.props.loggedIn){
        this.setState({value: 0});
      }
    }
    else{
      this.setState({disabled: true});
      if(this.props.loggedIn){
        this.setState({value: 1});
      }
    }
  }

  popupLogin = () => {
    this.props.logginPopup();
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{boxShadow: 'none', backgroundColor: '#ffffff00'}}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Recommended" />
            <Tab label="Places"/>
            <Tab label="Events" />
            <Tab label="Favorites"/>
          </Tabs>
        </AppBar>

      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
