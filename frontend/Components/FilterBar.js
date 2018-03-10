import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
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
  'Bars',
  'Restaurants',
  'Museums',
  'Clubs'
];

export default class FilterBar extends React.Component {
  state = {
    catagories: [],
    price: ''
  };


  handleChangeCatagories = (event, index, catagories) => this.setState({catagories});
  handlePriceChange = (event, index, price) => this.setState({price});

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

    const style = {
      width: '100%',
      paddingLeft: 15,
      paddingBottom: 20,
      display: 'inline-block',
      marginTop: '5%',
      textAlign: 'center'
    };
    return (

      <Paper style={style} zDepth={1} rounded={false}>
        <TextField
          style={{marginRight: 10, marginLeft:20}}
          hintText="Search"
          floatingLabelText="Search"
        />
        <SelectField
          multiple={true}
          hintText="Catagory"
          value={this.state.catagories}
          onChange={this.handleChangeCatagories}
          style={{verticalAlign: 'bottom', width: 200, marginRight: 10}}
        >
          {this.menuItems(catagories)}
        </SelectField>
        <TextField
          style={{marginRight: 10, width: 150}}
          hintText="Distance"
          floatingLabelText="Distance (miles)"
        />
        <SelectField style={{verticalAlign: 'bottom', width: 100, marginRight: 10}}
          floatingLabelText="Price"
          value={this.state.price}
          onChange={this.handlePriceChange}
        >
          <MenuItem value={1} primaryText="$" />
          <MenuItem value={2} primaryText="$$" />
          <MenuItem value={3} primaryText="$$$" />
        </SelectField>

        <TextField
          style={{width: 150, marginRight: 10}}
          id="date"
          label="Date"
          type="date"
          defaultValue="Today"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button color="primary" style={{color: 'white', backgroundColor: 'rgb(0, 188, 212)'}}>
            Submit
        </Button>
      </Paper>
    );
  }
}
