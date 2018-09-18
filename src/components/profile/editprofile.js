import React, { Component } from 'react';
import { Button, Grid, Menu, MenuItem, TextField, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { Scrollbars } from 'react-custom-scrollbars';
import MainNav from '../_/navigation';
import Config from '../../container/config';
import './profile.scss';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        console.log("Register form", props);
        this.state = {
            firstname: "Angelina",
            firstname_error: false,
            lastname: 'Gomes',
            lastname_error: false,
            phone: '(123) - 123 - 4123',
            phone_error: false,
            email_error: false,
            email: 'Angeline@gmail.com',
            street: 'Lombard Street',
            street_error: false,
            // city: '', city_error: false,
            state: 'US state', state_error: false,
            // country: '', country_error: false,
            // pin: '', pin_error: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = name => event => {

        this.setState({
            [name]: event.target.value,
        });
        if (name != '') {
            let errName = name + '_error'
            console.log("Handle change", event, name, errName);
            this.setState({
                [errName]: false,
            });
        }
    };
    handleSubmit = (event) => {
        event.preventDefault();
        let formValid = true;
        if (!this.state.firstname) {
            this.setState({ firstname_error: true });
            formValid = false;
        }
        if (!this.state.lastname) {
            this.setState({ lastname_error: true });
            formValid = false;
        }
        if (!this.state.phone) {
            this.setState({ phone_error: true });
            formValid = false;
        }
        let reg = /^\d+$/;
        let no = reg.test(this.state.phone_error);
        if (no) {
            this.setState({ phone_error: "Phone number should consists of only numbers" });
            formValid = false;
        }

        if (!this.state.email) {
            this.setState({ email_error: "Email is required" });
            formValid = false;
        }
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result = re.test(this.state.email);
        console.log('result', result)
        if (!result) {
            this.setState({ email_error: true });
            formValid = false;
        }
        if (!this.state.street) {
            this.setState({ street_error: true });
            formValid = false;
        }
        // if (!this.state.city) {
        //     this.setState({ city_error: true });
        //     formValid = false;
        // }
        if (!this.state.state) {
            this.setState({ state_error: true });
            formValid = false;
        }
        // if (!this.state.country) {
        //     this.setState({ country_error: true });
        //     formValid = false;
        // }
        // if (!this.state.pin) {
        //     this.setState({ pin_error: true });
        //     formValid = false;
        // }
        // let reg1 = /^\d+$/;
        // let pinno = reg1.test(this.state.pin_error);
        // if (pinno) {
        //     this.setState({ pin_error: "Pin should consists of only numbers" });
        //     formValid = false;
        // }
        if (formValid) {
            this.saveForm();
        }
    }
    saveForm = (event) => {
        console.log('Save form');
        this.props.history.push('/profile');
    }
    render() {
        return (
            <Grid container>
                <Grid container>
                    <Grid item sm={12} md={12} lg={12} xs={12} xl={12}>
                        <Typography className="pageTitle titleSection" variant="title" gutterBottom>
                            Edit Profile
                        </Typography>
                    </Grid>
                    {/* <Grid item sm={1} md={1} lg={1} xs={1} xl={1}>
                        <Button variant="outlined" href="/profile" >back</Button>
                    </Grid> */}
                    <Grid container className="ProfileForm" >
                        {/* Sign Up Section */}
                        <Grid item sm={6} md={6} lg={6} xs={12} xl={6}>
                            <TextField
                                id="firstname"
                                label="First Name"
                                // floatingLabelText="First Name"
                                className="fullWidth"
                                value={this.state.firstname}
                                onChange={this.handleChange('firstname')}
                                margin="normal"
                                error={this.state.firstname_error}
                            />
                            {/* {this.state.firstname_error && <div className="errorText" >First Name is required</div>} */}
                        </Grid>
                        <Grid item sm={6} md={6} lg={6} xs={12} xl={6}>
                            <TextField
                                id="lastname"
                                label="Last Name"
                                // floatingLabelText="Last Name"
                                className="fullWidth"
                                value={this.state.lastname}
                                onChange={this.handleChange('lastname')}
                                margin="normal"
                                error={this.state.lastname_error}
                            />
                            {/* {this.state.lastname_error && <div className="errorText" >Last Name is required</div>} */}
                        </Grid>
                        <Grid item sm={6} md={6} lg={6} xs={12} xl={6}>
                            <TextField
                                id="phone"
                                label="Phone"
                                // floatingLabelText="Phone"
                                className="fullWidth"
                                value={this.state.phone}
                                onChange={this.handleChange('phone')}
                                margin="normal"
                                maxLength="10"
                                error={this.state.lastname_error}
                            />
                            {/* {this.state.lastname_error && <div className="errorText" >Phone number is required</div>} */}
                        </Grid>
                        <Grid item sm={6} md={6} lg={6} xs={12} xl={6}>
                            <TextField
                                id="email"
                                label="Email"
                                // floatingLabelText="Email"
                                className="fullWidth"
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                margin="normal"
                                error={this.state.email_error}
                            />
                            {/* {this.state.email_error && <div className="errorText" >Valid email is required</div>} */}
                        </Grid>
                        {/* <Grid container> */}
                        <Grid item sm={12} md={12} lg={12} xs={12} xl={12}>
                            <div style={{ paddingTop: '20px' }} >Address</div>
                        </Grid>
                        <Grid item sm={6} md={6} lg={6} xs={12} xl={6}>
                            <TextField
                                id="street"
                                label="Street"
                                className="fullWidth"
                                value={this.state.street}
                                onChange={this.handleChange('street')}
                                margin="normal"
                                error={this.state.street_error}
                            />
                            {/* {this.state.street_error && <div className="errorText" >Street Name is required</div>} */}
                        </Grid>
                        <Grid item sm={6} md={6} lg={6} xs={12} xl={6}>
                            <TextField
                                id="state"
                                label="State"
                                // floatingLabelText="State"
                                className="fullWidth"
                                value={this.state.state}
                                onChange={this.handleChange('state')}
                                margin="normal"
                                error={this.state.state_error}
                            />
                            {/* {this.state.state_error && <div className="errorText" >State Name is required</div>} */}
                        </Grid>

                    </Grid>
                    <Grid container className="buttonsHolder" justify="center" >
                        {/* <Grid item xs={12} sm={6} md={6} className="">  */}
                        <Button variant="contained" color="primary" className="loginButton"
                            onClick={this.handleSubmit} style={{
                                marginRight: '20px', backgroundColor: '#4caf50',
                                color: '#000'
                            }} >
                            Update
                        </Button>
                        <Button href="./profile" variant="outlined" className="loginButton" >
                            Cancel
                        </Button>
                    </Grid>
                    
                </Grid>
            </Grid>
        );
    };
}