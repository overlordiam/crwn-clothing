import React from 'react';
import {createStructuredSelector} from "reselect";
import HomePage from "./components/pages/homepage/homepage.component";
import './App.css';
import {Switch , Route , Redirect} from "react-router-dom";
import CheckoutPage from "./components/pages/checkout/checkout.component";
import ShopPage from "./components/pages/shop/shop.component";
import Header from "./components/header/header.component";
import SigninandSignupPage from "./components/pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import {selectCurrentUser} from "./redux/user/user.selectors";
import { connect } from "react-redux";
import setCurrentUser from "./redux/user/user.actions";

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){

    const {setCurrentUser} = this.props;
  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if(userAuth) {
      const userRef = await createUserProfileDocument(userAuth);
      userRef.onSnapshot(snapShot => {
        setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
        })
      });
    } else {
      setCurrentUser(userAuth);
    }
  });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

render() {
    return (
      <div >
      <Header />
      <Switch>
        <Route exact path = "/" component = {HomePage} />
        <Route path = "/shop" component = {ShopPage} />
        <Route exact path = "/signin" render = {() =>
          this.props.currentUser ? (
            <Redirect to="/" />) : (
            <SigninandSignupPage />
            )} />
        <Route exact path = "/checkout" component = {CheckoutPage} />
      </Switch>
      </div>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
