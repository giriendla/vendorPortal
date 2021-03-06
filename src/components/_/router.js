import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    matchPath,
    withRouter
} from "react-router-dom";
import MainNav from './navigation';
import Config from '../../container/config';

import Dashboard from '../dashboard/dashboard';
import Account from '../account/account';
import AccountForm from '../account/accountform';
import Communities from '../communities/communities';
import Employees from "../employees/employees";
import EmployeesEdit from '../employees/employee-edit';
import EmployeeCreate from '../employees/employee-create';
import Login from "../login/login";
import Forgotpassword from "../forgotpassword/forgotpassword";
import ResetPassword from "../forgotpassword/resetPassword";
import Profile from '../profile/profile';
import ChangePassword from "../profile/changePassword";
import EditProfile from '../profile/editprofile';
import Register from '../register/register';
import Visit from '../visits/visit';
import Company from "../companies/company";
import CompanyEdit from '../companies/company-edit';
import CompanyCreate from '../companies/company-create';


export default class Approute extends Component {
    isRoute = false;
    constructor(props) {
        super(props);
        console.log("At AppRoute", props);
    }

    render() {
        console.log("Location", window.location.pathname);

        Config.mainnav.map((n, i) => {
            if (n.link == window.location.pathname && n.isLogin == true) {
                this.isRoute = true;
                return false;
            }
        });
        console.log("Config.isRoute", this.isRoute);
        return (
            <Grid container className="bodyContainer">

                <Grid className="navContainer" item lg={2} md={2} sm={3} xs={12}>
                    <MainNav />
                </Grid>
                <Grid className="bodyContent" item lg={10} md={10} sm={9} xs={12}>
                    <Scrollbars
                        renderTrackVertical={props => <div {...props} className="track-vertical" />}>
                        <div className="bodySection">
                            <Route path="/dashboard" component={Dashboard} />
                            <Route path="/account" component={Account} />
                            <Route path="/account/edit/:id" component={AccountForm} />
                            <Route path="/communites" component={Communities} />
                            <Route path="/employees" component={Employees} />
                            <Route path="/employees/create" component={EmployeesCreate} />
                            <Route path="/employees/edit/:id" component={EmployeesEdit} />
                            <Route path="/company" component={Company} />
                            <Route path="/company/create" component={CompanyCreate} />
                            <Route path="/company/edit/:id" component={CompanyEdit} />
                            <Route path="/login" component={Login} />
                            <Route path="/forgotpassword" component={Forgotpassword} />
                            <Route path="/resetpassword" component={ResetPassword} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/profile/edit" component={EditProfile} />
                            <Route path="/profile/changepassword" component={ChangePassword} />
                            <Route path="/register" component={Register} />
                            <Route path="/register/:id" component={Register} />
                            <Route path="/visit" component={Visit} />
                        </div>
                    </Scrollbars>
                </Grid>


            </Grid>
        );
    };
}