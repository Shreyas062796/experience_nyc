import React from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Grid, Row, Col } from 'react-flexbox-grid';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import Star from 'material-ui/svg-icons/toggle/star';
import Money from 'material-ui/svg-icons/editor/attach-money';


export default class SideNav extends React.Component {
  constructor() {
    super();
    this.state = {open: true};
  }

  render() {
    const contentStyle = {  transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' };

    let starStyle = {
      width: 15,
      height: 15
    };

    let moneyStyle = {
      width: 15,
      height: 15
    };

    let tripTitleStyle = {
      fontSize: 15,
      display: 'block'
    }

    let tripSubtitleStyle = {
      fontSize: 14,
      color: 'gray'
    }

    const star = <Star style={starStyle}/>;
    const money = <Money style={moneyStyle}/>;

    if (this.state.open) {
        contentStyle.marginLeft = 256;
    }

    return (
      <Grid fluid>
        <Drawer width={300} openSecondary={true} open={this.state.open} >
          <AppBar
            title="Trips"
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          />
        <Row style={{padding: 10}}>
          <Col>
            <Card style={{margin: 5}}>
              <Row style={{padding: 16}}>
                <Col md={8}>
                  <span style={tripTitleStyle}>The Broke College Kid</span>
                  <span style={tripSubtitleStyle}>For a student on a budget</span>
                </Col>
                <Col md={4} style={{padding: '0px'}}>
                  <span style={{display:'block'}}>{star}{star}{star}{star}{star}</span>
                  <span>{money}</span>
                </Col>

              </Row>
              <RaisedButton label="View Trip" primary={true} style={{width: '100%'}}/>
            </Card>
            <Card style={{margin: 5}}>
              <Row style={{padding: 16}}>
                <Col md={8}>
                  <span style={tripTitleStyle}>Trip for a Drunk</span>
                  <span style={tripSubtitleStyle}>You'll like this trip if you like alcohol</span>
                </Col>
                <Col md={4} style={{padding: '0px'}}>
                  <span style={{display:'block'}}>{star}{star}{star}{star}</span>
                  <span>{money}{money}{money}</span>
                </Col>
              </Row>
              <RaisedButton label="View Trip" primary={true} style={{width: '100%'}}/>
            </Card>
          </Col>
        </Row>
        </Drawer>
      </Grid>
    );
  }
}
