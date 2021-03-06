import React, { Component } from 'react';
import {
    Button,
    Grid,
    Menu,
    MenuList,
    MenuItem,
    TableHead,
    TableRow,
    TableCell,
    Tooltip,
    TableSortLabel,
    Typography,
    IconButton,
    Popper,
    Grow,
    Paper,
    ClickAwayListener
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import MainNav from '../_/navigation';
import Config from '../../container/config';
import {callUsers} from '../../actions';
import store from '../../store';
import {getAllUsers} from '../../actions';
import ListComponent from './list';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CommonService from '../../service/commonServices';
import { ToastContainer, toast } from 'react-toastify';
import ModalDialog from '../_/modal';
import Pagination from './pagination';

const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel'
];

const ITEM_HEIGHT = 48;

export default class Communities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            communicaties: [],
            communicatiesFilterArr: [],
            anchorEl: null,
            open: false,
            loader: false,
            fitlerOpen: false,
            filter: {
                search: "",
                showNoData: false
            },
        }
        this.handleClick = this
            .handleClick
            .bind(this);
        this.handleClose = this
            .handleClose
            .bind(this);
        this.getCommunitiesList = this
            .getCommunitiesList
            .bind(this);
        this.handleToggle = this
            .handleToggle
            .bind(this);
    }
    componentWillMount() { 
        this.getCommunitiesList();
    }
    componentDidMount() {
        console.log("All Props", this.props);
    }

    getCommunitiesList() {
        this.setState({loader: true});
        axios
            .get(axios.getCommunitiesList())
            .then((response) => {
                this.setState({loader: false});
                console.log("Communities Response", response);                
                this.setState({ 
                    communicaties: response.communities,
                    communicatiesFilterArr: response.communities
                });
                // console.log("At First Response", this.state.visitors);
                // store.dispatch(getAllUsers(response.data));
            })
            /* .then(allUsers =>
                  dispatch({
                    type: ALL_USERS,
                    users: allUsers
                  })
                ) */
            .catch(function (error) {
                this.setState({loader: false});
                console.log("At First Error", error);
            });
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleToggle = () => {
        this.setState(state => ({
            fitlerOpen: !state.fitlerOpen
        }));
    };

    toggleFilter = () => {
        let state = this.state;
        state.fitlerOpen = !state.fitlerOpen
        if (state.fitlerOpen == false) {
            state.filter.search = "";
        }
        this.setState(state);
    }

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {return;}
        this.setState({ open: false });
    };
    updateFilterField = (event, field) => {
        // console.log("Updating Field", field, event);
    
        let state = this.state;
        state.filter[field] = event.target.value;
        this.setState(state)
      }
      doSearch = event => {
        event.preventDefault();
        event.stopPropagation()
        let searchKey = this.state.filter.search;
        let obj = this.state.communicaties;
        let arr = {};
        let finalObj = [];
        if(searchKey !== ""){
          for(var i=0; i < obj.length; i++){
            var row = obj[i];
            for(var key in row){
                var item = row[key];
                // console.log("key", key, item);
                if(typeof item == "string"){
                    item = item.toLowerCase();
                    searchKey = searchKey.toLowerCase();
                    if(item.indexOf(searchKey) > -1){
                        arr[i] = i;
                        // console.log("\n\ni am string\n", i, key, item, "\nArr : ", arr);
                    }
                }
            }
          }
          for(var key in arr){
            finalObj.push(obj[key]);
          }
          this.setState({communicatiesFilterArr: finalObj});
        }else{
          this.setState({communicatiesFilterArr: this.state.communicaties});
        }
      }
    render() {
        const { anchorEl, communicaties, communicatiesFilterArr, loader } = this.state;
        const open = Boolean(anchorEl);
        console.log("At Communiteis Data Length", communicaties);
        return (
            <Grid container>
                <Grid container>
                    <Grid item sm={6}>
                    <Typography className="pageTitle titleSection" variant="title" gutterBottom>
                        Communities
                    </Typography>
                    </Grid>
                    <Grid item sm={6} align="right">
                    {/* <Button className="btn btn-primary btn-round"
                            onClick={this.createEmployee}>Create</Button> */}
                    <Button buttonRef={node => { this.anchorEl = node; }}
                                    aria-owns={open ? 'menu-list-grow' : null}
                                    aria-haspopup="true"
                                    onClick={(event) => {
                                                this.handleClose(event);
                                                this.handleToggle();
                                                this.toggleFilter();
                                            }}>
                        <FilterListIcon/>
                    </Button>            
                    </Grid>
                    <Grid item sm={12} className={(this.state.fitlerOpen) 
                                                                        ? "filterContainer active"
                                                                        : "filterContainer inactive"}>
                    <Grid item className="filterContent">
                        {/* <div className="filterHeading">
                        <b>Filter</b>
                        </div> */}
                        <div className="filterFields">
                        <form className="commentForm" onSubmit={this.doSearch}>
                            <div className="filterItem">
                            <label>Search</label>
                            <input
                            type="text"
                            placeholder="Search"
                            value={this.state.filter.search}
                            onChange={event => {
                                this.updateFilterField(event, 'search');
                            }}/>
                            </div>
                            <span className="submitFilterInline">
                            <button type="submit" className="btn btn-primary">Search</button>
                            </span>
                        </form>
                        </div>
                    </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12}>
                    <Pagination 
                        {...this.props}
                        view="communities"
                        data={communicatiesFilterArr}
                        header={["name", "email", "phone", "service", "status"]}/>                    
                </Grid>
                {CommonService.renderLoader(loader)}
            </Grid>
        );
    };
}