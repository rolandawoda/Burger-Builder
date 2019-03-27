import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';

import Layer from './Components/Layer/Layer'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './Containers/CheckOut/CheckOut';
import Orders from './Containers/Orders/Orders';
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  
  componentDidMount() {
      this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} /> 
        <Route path="/" exact component={BurgerBuilder}/> 
        <Redirect to="/" />
      </Switch>       
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={CheckOut}/>              
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} /> 
          <Route path="/auth" component={Auth} /> 
          <Route path="/" exact component={BurgerBuilder}/> 
          <Redirect to="/" />
        </Switch>      
      );
    }
    return (
      <div>
        <Layer>  
          {routes}
        </Layer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
