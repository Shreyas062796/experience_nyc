import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Card, { CardActions, CardContent } from 'material-ui-next/Card';
import classNames from 'classnames';
import Grid from 'material-ui-next/Grid';
import Typography from 'material-ui-next/Typography';
import Button from 'material-ui-next/Button';

const styles = theme => ({
});

class Trips extends React.Component {
  constructor(props) {
    super(props);

  }

  state = {

  };

  render() {
    const { classes, theme  } = this.props;

    return (
      <div>
      </div>
    );
  }
}

Trips.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Trips);
