import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import React from "react";
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Users from './pages/Users';
import Login from './pages/Login';
import { connect, useDispatch } from 'react-redux';
import { authCheck } from './redux/actions/userActions';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
// import EmailVerify from './components';
function App({ currentUser }) {

  const dispatch = useDispatch();
  if (currentUser) {
    console.log("user connected!")
    console.log(currentUser.user)
  }
  React.useEffect(() => {
    dispatch(authCheck());

  }, [dispatch])

  return (
    <BrowserRouter>
      <Navbar currentUser={currentUser && currentUser}></Navbar>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/user/edit/:userId" exact component={EditProfile}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/users" exact component={Users}></Route>
        <Route path="/user/:userId" exact component={Profile}></Route>
        {/* <Route path="/user/:id/verify/:token" exact component={EmailVerify} ></Route> */}
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = ({ user: { currentUser } }) => (
  {
    currentUser
  })

export default connect(mapStateToProps)(App);
