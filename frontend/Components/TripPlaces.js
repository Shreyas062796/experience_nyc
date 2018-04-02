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

class TripPlaces extends React.Component {

  state = {

  };

  render() {
    const { classes, theme  } = this.props;

    const tripCards = (<Card className={classes.card} style={{margin: '5%', marginTop: '15%'}}>
                        <CardContent>
                          <Typography className={classes.title}>The Broke College Kid</Typography>
                          <Typography component="p">
                            For a student on a budget
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button color="primary" style={{width: '100%',color: 'white', backgroundColor: 'rgb(0, 188, 212)'}}>
                              View Trip
                          </Button>
                        </CardActions>
                      </Card>);

    return (
      <div>
        {tripCards}
      </div>
    );
  }
}

TripPlaces.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TripPlaces);
