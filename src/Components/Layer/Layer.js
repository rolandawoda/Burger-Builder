import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import classes from './Layer.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layer extends Component {

  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false});
  }

  toggleSideDrawer = () => {
    const toggle = this.state.showSideDrawer ;
    this.setState({showSideDrawer: !toggle});
    console.log(this.state.showSideDrawer)
  }

  render(){
    return (
      <Aux>
        <Toolbar isAuth={this.props.isAuthenticated} toggleSideDrawer={this.toggleSideDrawer} />
        <SideDrawer isAuth={this.props.isAuthenticated} closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>  
    );
  }
  
}
const mapStateToprops = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
}
export default connect(mapStateToprops)(Layer);