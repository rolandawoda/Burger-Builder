import React, {Component} from 'react';
import {connect} from 'react-redux';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class CheckOut extends Component {

  componentDidMount() {
    
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/Checkout/Contact-data');
  }
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  render() {
    let summary = <Redirect to="/"/>
    if (this.props.ings){
      const purchasedRedirect = this.props.purchased? <Redirect to="/"/> : null;
      summary = (
        <div>
        {purchasedRedirect}
        <CheckoutSummary 
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          />
        <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
      </div>
      );
    }
    return (
      <div>
         {summary}
      </div>
     
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(CheckOut);