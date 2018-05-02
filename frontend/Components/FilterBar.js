import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Filter from 'material-ui-icons/FilterList';
import Sort from 'material-ui-icons/Sort';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import Select from 'material-ui-next/Select';
import MenuItem from 'material-ui/MenuItem';
import Grid from 'material-ui-next/Grid';
import Button from 'material-ui-next/Button';
import Input, { InputLabel } from 'material-ui-next/Input';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui-next/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui-next/Typography';
import { FormGroup, FormControlLabel, FormControl } from 'material-ui-next/Form';
import Checkbox from 'material-ui-next/Checkbox';


const names = [
  'Bakery',
  'Cafe',
  'Clothing Store',
  'Convenience Store',
  'Department Store',
  'Florist',
  'Hair Care',
  'Library',
  'Movie Theater',
  'Museum',
  'Night Club',
  'Bar',
  'Restaurant',
  'Stadium',
  'Store',
  'Zoo'
];

const nameEquivalents = {
  'Bakery' : 'bakery',
  'Cafe' : 'cafe',
  'Clothing Store' : 'clothing_store',
  'Convenience Store' : 'convenience_store',
  'Department Store' : 'department_store',
  'Florist' : 'florist',
  'Hair Care' : 'hair_care',
  'Library' : 'library',
  'Movie Theater' : 'movie_theater',
  'Museum' : 'museum',
  'Night Club' : 'night_club',
  'Bar' : 'bar',
  'Restaurant' : 'restaurant',
  'Stadium' : 'stadium',
  'Store' : 'store',
  'Zoo' : 'zoo'
};

const dollars = [
  '$', '$$', '$$$'
]

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'none',
    width:'100%'
  },
  grid: {
    paddingLeft: 15,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    justifyContent: 'center'
  },
  typography: {
    fontSize: '1.5rem',
    marginRight: '1em'
  },
  input: {
    height: '72px !important',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class FilterBar extends React.Component {
  state = {
    categories: [],
    prices: [],
    expanded: null,
    filter: {search: '', types: [''], price_level: [''], num: '100'},
    distance: '',
    checked: false
  };

  handleChangeCategories = (event, index, categories) => this.setState({categories});
  handlePriceChange = (event, index, prices) => this.setState({prices});

  handleFilterChange = () => {
    this.props.setFilter(this.state.filter);
  }

  handleChange = panel => (event, expanded) => {
   this.setState({
     expanded: expanded ? panel : false,
   });
 };

  //on submit click grab values and change filter state
  handleSubmit = () => {
    var search = $('#search').val();
    var category = this.state.categories;
    var prices = this.state.prices;
    var distance = $('#distance').val();

    var data = {search: search, types: category, price_level: prices, num: '100'}
    this.setState({filter: data, expanded: null}, function () {
        this.handleFilterChange();
    });
  }

  menuItems(categories) {
    return names.map((name) => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={categories && categories.indexOf(nameEquivalents[name]) > -1}
        value={nameEquivalents[name]}
        primaryText={name}
      />
    ));
  }

  menuItemsPrices(prices) {
    return dollars.map((name) => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={prices && prices.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ));
  }

  handleDistanceChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { categories, prices, expanded } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ExpansionPanel style={{backgroundColor: this.state.expanded ? '#fafafa' : '#fafafae6', boxShadow: 'none',width:'100%', position: 'absolute', zIndex: 10}} expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
            <ExpansionPanelSummary expandIcon={<Filter />} style={{display: 'inline-flex', cursor: 'default', marginLeft: '16px', paddingRight: '0px'}}>
              <div style={{width: '100%',display: 'inline-flex'}}>
                <Typography className={classes.typography} style={{cursor: 'pointer'}}>Filter</Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid  className={classes.grid} item container spacing={16} style={{width: this.props.drawerOpen ? window.innerWidth - 400 : false}}>
                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                      <TextField
                        id='search'
                        fullWidth={true}
                        hintText="Search"
                        floatingLabelText="Search"
                      />
                    </Grid>

                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                      <SelectField
                        className={classes.input}
                        id='category'
                        fullWidth={true}
                        multiple={true}
                        hintText="Category"
                        value={this.state.categories}
                        onChange={this.handleChangeCategories}
                      >
                        {this.menuItems(categories)}
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
                    <Grid item xl={1} lg={3} md={2} sm={6} xs={6}>
                      <SelectField
                        className={classes.input}
                        id='price'
                        fullWidth={true}
                        multiple={true}
                        hintText="Price"
                        value={this.state.prices}
                        onChange={this.handlePriceChange}
                      >
                        {this.menuItemsPrices(prices)}
                      </SelectField>
                    </Grid>
                    <Grid item xl={1} lg={1} md={1} sm={3} xs={3} style={{paddingBottom: 0}}>
                      <FormControlLabel
                          control={
                              <Checkbox
                                              style={{color: 'rgb(193, 193, 193)', fontSize: '30px'}}
                              checked={this.state.checked}
                              onChange={this.handleCheck('checked')}
                              value="checked"
                              />
                                      }
                          label="Open"
                      />
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}  style={{paddingBottom: 0, textAlign: 'center'}}>
                      <Button onClick={this.handleSubmit} color="primary" style={{color: 'white', backgroundColor: '#3f51b5'}}>
                          Submit
                      </Button>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>


        </ExpansionPanel>

      </div>
    );
  }
}

FilterBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FilterBar);
