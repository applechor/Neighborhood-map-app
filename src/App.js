// eslint-disable-next-line
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import MapContainer from './components/MapContainer'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import * as DataAPI from './utils/DataAPI'
//import * as ErrorBoundary from './components/ErrorBoundary'
//import ListItems from './components/ListItems'
        
 class App extends Component {
    state = {
        locations: [], // list of all location in details
        defaultLocations: [], // copy of list of all location in details
        defaultZoom: 14, // default of zoom
        defaultCenter: {lat: 18.787747, lng: 98.993128}
    }
 
    // invoked after the component is inserted in the DOM
    componentDidMount() {
        // Fetch list of venues
        DataAPI.getAll()   
        .then(res => {
            if (res.meta.code === 200) {
console.log("res",res)
                return (res.response.groups[0].items);
            }
        }) 
        // 
        .then(listVenues => {
            let listVenuesIds = []
            listVenues.map(listVenue => listVenuesIds.push(listVenue.venue.id))
console.log("listVenues",listVenues)
            // this.setState({
            //     locations: listVenues,
            //     listLocationIds: listVenuesIds
            // })
            return listVenuesIds;
        })
        .then(listVenuesIds => {
console.log("listVenuesIds",listVenuesIds)
            let listVenuesDetails = []
            listVenuesIds.map(listVenuesId => 
                DataAPI.getDetail(listVenuesId)
                .then(venuesDetails => {
console.log("venuesDetails",venuesDetails)
                    if (venuesDetails.meta.code !== 200 || venuesDetails === undefined) {
                    console.log("Error DataAPI.getDetail: error_code "+venuesDetails.meta.code +" error_detail "+ venuesDetails.meta.errorDetail)
                    }
                    listVenuesDetails.push(venuesDetails.response.venue)
console.log("listVenuesDetails",listVenuesDetails)
                    this.setState({
                        locations: listVenuesDetails,
                        defaultLocations: listVenuesDetails
                    })
                })
            )

        })
        .catch(err => console.log("Error when fetch DataAPI.getAll: ", err))
    }


    render() {
        return (

            <div className="App" role="main">
                <header className="header"> 
                <NavBar />
                </header>
                
                <div className="main-container">
                    
                    <SideBar 

                    />
                    <div id="map">
                    {/*<ErrorBoundary>*/}
                    <MapContainer 
                        role="application"
                        aria-label="Google Map"
                        locations={this.state.locations}
                        listLocationIds={this.state.listLocationIds}
                    />
                {/*</ErrorBoundary>*/}
                    </div>
                </div>
          </div>
        );
    }
} 

export default App;
