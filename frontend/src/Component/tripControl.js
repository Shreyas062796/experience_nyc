import React, { Component } from 'react';
import Button from 'material-ui-next/Button';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui-next/styles';

const styles = theme => ({
  button: {
    minWidth: '0px',
    color: 'rgba(0, 0, 0, 0.87)',
    border: '1px solid',
		borderRadius: '4px',
		width: '50%',
		margin: '1em'
  }
});

class TripControl extends Component{		
	
	handleRemove(){		
		this.props.removeLocation(0)
	}
	handleUp(){		
		this.props.moveUp()
	}
	handleDown(){		
		this.props.moveDown()
	}
	
  render() {
		const { classes } = this.props;

    return (
	<div style={{width: '100%', display: 'inline-flex'}}>	
		<Button onClick = {this.handleUp.bind(this)} className={classes.button}>
			Move Up
		</Button>
		<Button onClick = {this.handleDown.bind(this)} className={classes.button}>
			Move Down
		</Button>
	</div>
    );
  }
  
}

TripControl.propTypes = {
  classes: PropTypes.object.isRequired,
};

const wrapped = withStyles(styles)(TripControl);

export default wrapped;