import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
  // constructor(props){
  //   super(props);
  //   this.state ={...}
  // }
  state = {
    purchasing: false,
  }

  componentDidMount(){
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients){
    const sum  = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum,el) => {
      return sum + el;
    },0);
    return sum > 0;
  }

  purchaseHandler = () => {

    if(this.props.isAuthenticated){
      this.setState({purchasing: true});
    }else{
      this.props.history.push('/auth'); 
    }
    
  } 
  
  purchaseCancelHandler = () => this.setState({purchasing: false});

  purchaseContinueHandler = () => {    
    this.props.onInitPurchased();
    this.props.history.push('/checkout');
  } 

  render(){ 
    const disabledInfo = {...this.props.ings};
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if(this.props.ings){
      burger = (
        <Aux>          
          <Burger  ingredients={this.props.ings}/>
          <BuildControls 
            addIngredientHandler = {this.props.onIngredientAdded} 
            removeIngredientHandler={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            purchaseHandler={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = <OrderSummary 
          ingredients={this.props.ings} 
          cancel={this.purchaseCancelHandler} 
          continue={this.purchaseContinueHandler}
          price={this.props.price}
        />
    }
    return (
      <Aux>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
          </Modal>         
          {burger}
      </Aux>
    );
  }
}

const mapStateToprops = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToprops = dispatch => {
  return {
    onIngredientAdded: (ingName) => {dispatch(actions.addIngredient(ingName))},
    onIngredientRemoved: (ingName) => {dispatch(actions.removeIngredient(ingName))},
    onInitIngredients: () => {dispatch(actions.initIngredients())},
    onInitPurchased: () => {dispatch(actions.purchaseInit())},
    onSetAuthRedirectPath: (path) => {dispatch(actions.setAuthRedirectPath(path))}
  }
}

export default connect(mapStateToprops, mapDispatchToprops)(WithErrorHandler(BurgerBuilder, axios));