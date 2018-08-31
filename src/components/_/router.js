import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";
import MainNav from './navigation';
import Config from '../../container/config';

import Dummy from './dummyText';
import Dashboard from '../dashboard/dashboard';
import Account from '../account/account';
import Communities from '../communities/communities';
import Employees from "../employees/employees";
import Login from "../login/login";
import Forgotpassword from "../forgotpassword/forgotpassword";
import Profile from '../profile/profile';
import Register from '../register/register';
import Visit from '../visits/visit';


export default class Approute extends Component {
    render() {
        return (
            <Router>
                <Grid container className="bodyContainer">        
                    <Grid className="navContainer" item lg={2} md={2} sm={3} xs={12}>
                        <MainNav />
                    </Grid>
                    <Grid className="bodyContent" item lg={10} md={10} sm={9} xs={12}>
                        <Scrollbars
                        renderTrackVertical={props => <div {...props} className="track-vertical"/>}>
                        <div className="bodySection">
                            <Route path="/dashboard" component={Dashboard} />
                            <Route path="/account" component={Account} />
                            <Route path="/communites" component={Communities} />
                            <Route path="/employees" component={Employees} />
                            <Route path="/login" component={Login} />
                            <Route path="/forgotpassword" component={Forgotpassword} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/register" component={Register} />
                            <Route path="/visit" component={Visit} />
                        </div>
                        </Scrollbars>
                    </Grid>
                </Grid>
            </Router>
        );
    };
}