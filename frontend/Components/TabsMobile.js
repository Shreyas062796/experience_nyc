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
    pageKeys: {0: 'Recommended', 1: 'Search'},
    disabled: false
  };

  handleChange = (event, value) => {
    if(this.props.loggedIn || (!this.props.loggedIn && (value != 0))){
      this.setState({value: value });
      this.props.tabChange(this.state.pageKeys[value])
    }
    else{
      this.popupLogin();
    }
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  popupLogin = () => {
    this.props.logginPopup();
  }

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

    if((nextProps.page != this.props.page) && this.props.loggedIn){
      this.setState({value: 1});
    }
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab disabled={this.props.page == 'Events' ? true : false} label="Recommended"/>
            <Tab label="Search"/>
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
