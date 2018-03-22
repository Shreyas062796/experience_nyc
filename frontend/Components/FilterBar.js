import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import Select from 'material-ui-next/Select';
import MenuItem from 'material-ui/MenuItem';
import Grid from 'material-ui-next/Grid';
import { FormControl } from 'material-ui-next/Form';
import Button from 'material-ui-next/Button';
import Input, { InputLabel } from 'material-ui-next/Input';

const names = [
  'amusement_park',
  'bakery',
  'cafe',
  'clothing_store',
  'convenience_store',
  'department_store',
  'florist',
  'hair_care',
  'library',
  'movie_theater',
  'museum',
  'night_club',
  'bar',
  'restaurant',
  'stadium',
  'store',
  'zoo'
];

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    width: '100%',
    paddingLeft: 15,
    paddingBottom: 20,
    marginTop: '3em',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class FilterBar extends React.Component {
  state = {
    catagories: [],
    price: ''
  };

  handleChangeCatagories = (event, index, catagories) => this.setState({catagories});
  handlePriceChange = (event, index, price) => this.setState({price});

  handleSubmit = () => {
    var search = $('#search').val();
    var catagory = this.state.catagories;
    var distance = $('#distance').val();
    var price = this.state.price;

    var data = {search: search, address: 'nyc', amount: '10', types: catagory[0], distance: distance, price: price};
    $.ajax({
      url:"https://experiencenyc.herokuapp.com/topplace",
      type:"GET",
      data: data,
      contentType:"application/json; charset=utf-8",
      dataType:"json",
      success: function(response){
        console.log(response)
      }
    })
  }

  menuItems(catagories) {
    return names.map((name) => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={catagories && catagories.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ));
  }

  render() {
    const { catagories } = this.state;
    const { classes } = this.props;

    return (

      <Paper className={classes.root} zDepth={1} rounded={false}>
        <Grid  className={classes.grid} item container spacing={24}>
            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
              <TextField
                id='search'
                fullWidth={true}
                hintText="Search"
                floatingLabelText="Search"
              />
            </Grid>

            <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
              <SelectField
                style={{height: '72px'}}
                id='catagory'
                fullWidth={true}
                multiple={true}
                hintText="Catagory"
                value={this.state.catagories}
                onChange={this.handleChangeCatagories}
              >
                {this.menuItems(catagories)}
              </SelectField>
            </Grid>

            <Grid item xl={2} lg={2} md={3} sm={6} xs={6}>
              <TextField
                id='distance'
                fullWidth={true}
                hintText="Distance"
                floatingLabelText="Distance (miles)"
              />
            </Grid>

            <Grid item xl={1} lg={1} md={2} sm={6} xs={6}>
              <SelectField
                id='price'
                fullWidth={true}
                floatingLabelText="Price"
                value={this.state.price}
                onChange={this.handlePriceChange}
              >
                <MenuItem value={1} primaryText="$" />
                <MenuItem value={2} primaryText="$$" />
                <MenuItem value={3} primaryText="$$$" />
              </SelectField>
            </Grid>

            {/*<Grid item xl={2} lg={2} md={2} sm={3} xs={4}>
              <TextField
                style={{height: '97%'}}
                id='date'
                fullWidth={true}
                id="date"
                label="Date"
                type="date"
                defaultValue="Today"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>*/}

            <Grid item xl={2} lg={2} md={3} sm={10} xs={10}  style={{paddingBottom: 0, textAlign: 'center'}}>
              <Button onClick={this.handleSubmit} color="primary" style={{color: 'white', backgroundColor: 'rgb(0, 188, 212)'}}>
                  Submit
              </Button>
            </Grid>
        </Grid>
      </Paper>
    );
  }
}

FilterBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FilterBar);
