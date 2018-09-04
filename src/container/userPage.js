import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button,Grid, Menu, MenuItem } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';

import MainNav from '../components/_/navigation';
import Dummy from '../components/_/dummyText';
import Header from '../components/_/header';
import { Footer } from "../components/_/elements";

import Dashboard from '../components/dashboard/dashboard';
import Visit from '../components/visits/visit';
import Employees from '../components/employees/employees';
import Account from '../components/account/account';
import Profile from '../components/profile/profile';
import Communites from '../components/communities/communities';


export default class userPage extends Component{
    constructor(props) {
        super(props);
    };
    loadComponent = () => {
        const path = this.props.location.pathname;
        if(path.indexOf('/dashboard') !== -1){
            return (<div><Dashboard  /></div>);
        }else if(path.indexOf('/visit') !== -1){
            return (<div><Visit /></div>);
        }else if(path.indexOf('/communites') !== -1){
            return (<div><Communites /></div>);
        }else if(path.indexOf('/employees') !== -1){
            return (<div><Employees /></div>);
        }else if(path.indexOf('/account') !== -1){
            return (<div><Account /></div>);
        }else if(path.indexOf('/profile') !== -1){
            return (<div><Profile /></div>);
        }else if(path.indexOf('/') !== -1){
            return (<div><Dashboard /></div>);
        }
    }
    render() {
        return (
            <div>
                <Header />
                <Grid container className="bodyContainer">            
                    <Grid className="navContainer" item lg={2} md={2} sm={3} xs={12}>
                        <MainNav />
                    </Grid>
                    <Grid className="bodyContent" item lg={10} md={10} sm={9} xs={12}>
                    <Scrollbars
                    renderTrackVertical={props => <div {...props} className="track-vertical"/>}>
                        <div className="bodySection">
                             {this.loadComponent()}
                        </div>
                    </Scrollbars>
                    </Grid>
                </Grid>
                <Footer />
            </div>
        );
    }
}