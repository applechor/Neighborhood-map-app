/*eslint-disable-next-line*/
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import MapContainer from './components/MapContainer'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import * as DataAPI from './utils/DataAPI'
//import * as ErrorBoundary from './components/ErrorBoundary'
//import ListItems from './components/ListItems'
        
 class App extends Component {
    state = {
        //filteredLocations: [], // list of all location in details which for filtering
        locations: [], // list of all location in details that was shown when no query in search input
        markers: [],
        zoom: 14,
        defaultZoom: 10, // default of zoom
        center: {lat: 18.787747, lng: 98.993128},
        defaultCenter: {lat: 18.787747, lng: 98.993128},
        
        showingInfoWindow: false, // show info window
        activeMarker: {}, // marker info for selected marker
        selectedLocation: {}, // location info for selected marker
        selectedLocationDetails: [], // details of selected location which is clicked 
        activeMarkerDetails: []
    }
 
    // invoked after the component is inserted in the DOM
    componentDidMount() {
        
        // Fetch list of venues from foursquare
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
//console.log("listVenues",listVenues)
            return listVenuesIds;
        })
        .then(listVenuesIds => {
//console.log("listVenuesIds",listVenuesIds)
            let listVenuesDetails = []
            let markers=[]

            listVenuesIds.map(listVenuesId => 
                DataAPI.getDetail(listVenuesId)
                .then(venuesDetails => {
//console.log("venuesDetails",venuesDetails)
                    if (venuesDetails.meta.code !== 200 || venuesDetails === undefined) {
                    console.log("Error DataAPI.getDetail: error_code "+venuesDetails.meta.code +" error_detail "+ venuesDetails.meta.errorDetail)
                    }
                    listVenuesDetails.push(venuesDetails.response.venue)
                    console.log("listVenuesDetails",listVenuesDetails)

                    let marker = {
                        id: venuesDetails.response.venue.id,
                        name: venuesDetails.response.venue.name,
                        lat: venuesDetails.response.venue.location.lat,
                        lng: venuesDetails.response.venue.location.lng,
                        isVisible: true,
                        showingInfoWindow: false
                    }
                    markers.push(marker)
                   //console.log("Tong"+markers)
                    this.setState({
                        locations: listVenuesDetails,
                        markers: markers
                    
                    })
                  
                })
              
            )
           console.log('locations:',this.state.locations)
        })
        .catch(err => console.log("Error when fetch DataAPI.getAll: ", err))
    } // END componentDidMount




    // update Locations when already searched
    updateLocation = (searchedResults, query) => {
        if(query) {
            this.setState ((state) => ({

                locations: searchedResults
            }))
        } else {
            this.setState({locations: this.state.Locations})
        }
    }
    
    // substring location name
    getNewName = (locationName) => {
        let newName;
        if (locationName === undefined) {
            newName = ""
        } else if (locationName.includes("(")) {
            newName = locationName.substr(0,locationName.indexOf("("))
        } else {
            newName = locationName
        }
        return newName;
    }

    //handle when a marker is clicked
    handleMarkerClick = (props, marker, e) => {
         console.log("propsMarkerClick:",props)
         console.log("markerMarkerClick: ",marker)
         console.log("eMarkerClick: ",e)

         let details = this.state.locations.filter(location => location.id === marker.id) 
         //const marker2 = this.state.markers.find(marker2 => marker2.id === marker.id)
         //console.log("Marker2",marker2)
         console.log("detailsMarkerClick;",details)
        this.setState({
            //selectedLocation: props,
            activeMarker: marker,
            //activeMarker: Object.assign(this.state.activeMarker, marker),
            showingInfoWindow: true,
            selectedLocationDetails: details[0]
            })
        console.log("activeMarkerMarkerClick: ",this.state.activeMarker)
        //console.log(marker.getMarkers())
    }

               //  handleMarkerClick = (props, marker, e) => {
               //      // filter locations which match the marker id
               //          console.log("propsMarkerClick:",props)
               //        console.log("markerMarkerClick: ",marker)
               //        console.log("eMarkerClick: ",e)
                      
               // let details = this.state.locations.find(location => location.id === marker.id) 
               //      //console.log("details;",details)
               //      this.setState({
               //          selectedLocation: props,
               //          activeMarker: marker,
               //          showingInfoWindow: true,
               //          selectedLocationDetails: details
               //      })
               //      console.log("selectedLocationDetails: ",details)  
               //  }
               //              //     let details = this.state.locations.find(location => location.id === marker.id) 
                //     //console.log("details;",details)
                //     this.setState({
                //         selectedLocation: props,
                //         activeMarker: marker,
                //         showingInfoWindow: true,
                //         selectedLocationDetails: details
                //     })
                //     console.log("selectedLocationDetails: ",details)  
                // }

    //handle the list-item when is clicked
    handleItemClick = (props, location, e) => {
        //console.log(props, location, e)
        console.log("propsItemClick:",props)
        console.log("locationItemClick:",location)
        console.log("eItemClick: ",e)

        const marker = this.state.markers.find(marker => marker.id === location.id)
        console.log("Mymarker:",marker)
        
        this.handleMarkerClick(location,marker,e) 
              

        // let newCenter
        // if(location !== undefined && location.location !== undefined) {
        //     newCenter = {lat: location.location.lat, lng: location.location.lng}
        //    //       console.log("newCenter:",newCenter)
        // }
        // //      this.setNewCenter(newCenter, location.id)
        // this.setState({
        //     center: newCenter,
        //     zoom: 16
        // })
        
    }

    // setNewCenter = (newCenter, location) => {
    //     //console.log(newCenter)
    //     this.setState({
    //         center: newCenter,
    //         zoom: 18
    // })// }

    //handle when map is clicked
    handleMapClick = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }
            
    render() {

         
        return (

            <div className = "App" role = "main">
                <header className = "header"> 
                <NavBar />
                </header>
                
                <div className = "main-container">
                    
                    <SearchBar 
                        locations = {this.state.locations}
                        updateLocation = {this.updateLocation}
                        getNewName = {this.getNewName}
                        handleItemClick = {this.handleItemClick}
                    />
                    <div id="map">
                    {/*<ErrorBoundary>*/}
                    <MapContainer 
                        role ="application"
                        aria-label = "Google Map"
                        locations = {this.state.locations}
                        center = {this.state.center}
                        zoom = {this.state.zoom}
                        getNewName = {this.getNewName}
                        bounds={this.state.bounds}
                        markers={this.state.markers}
                        handleMarkerClick={this.handleMarkerClick}
                        handleMapClick={this.handleMapClick}
                        showingInfoWindow={this.state.showingInfoWindow}
                        activeMarker={this.state.activeMarker}
                        selectedLocation={this.state.selectedLocation}
                        selectedLocationDetails={this.state.selectedLocationDetails}
                        activeMarkerDetails={this.state.activeMarkerDetails}
                    />
                {/*</ErrorBoundary>*/}
                    </div>
                </div>
          </div>
        );
    }
} 

export default App;


/**********************************************************************
** BACK UP
class App extends Component {
    state = {
        filteredLocations: [], // list of all location in details which for filtering
        defaultLocations: [], // list of all location in details that was shown when no query in search input
        zoom: 14,
        defaultZoom: 10, // default of zoom
        center: {lat: 18.787747, lng: 98.993128},
        defaultCenter: {lat: 18.787747, lng: 98.993128},
        bounds: [],
        markers: [],
        isItemClicked: false
    }
 
    // invoked after the component is inserted in the DOM
    componentDidMount() {
        // Fetch list of venues from foursquare
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
//console.log("listVenues",listVenues)
            return listVenuesIds;
        })
        .then(listVenuesIds => {
//console.log("listVenuesIds",listVenuesIds)
            let listVenuesDetails = []
            let markers=[]
            listVenuesIds.map(listVenuesId => 
                DataAPI.getDetail(listVenuesId)
                .then(venuesDetails => {
//console.log("venuesDetails",venuesDetails)
                    if (venuesDetails.meta.code !== 200 || venuesDetails === undefined) {
                    console.log("Error DataAPI.getDetail: error_code "+venuesDetails.meta.code +" error_detail "+ venuesDetails.meta.errorDetail)
                    }
                    listVenuesDetails.push(venuesDetails.response.venue)
                    console.log("listVenuesDetails",listVenuesDetails)

                    let marker = {
                        id: venuesDetails.response.venue.id,
                        name: venuesDetails.response.venue.name,
                        lat: venuesDetails.response.venue.location.lat,
                        lng: venuesDetails.response.venue.location.lng,
                        isVisible: true,
                        isOpen: false
                    }
                    markers.push(marker)
                   //console.log("Tong"+markers)
                    this.setState({
                        filteredLocations: listVenuesDetails,
                        defaultLocations: listVenuesDetails,
                        markers: markers
                    
                    })
                  
                })
              
            )
           console.log('locations:',this.state.locations)
        })
        .catch(err => console.log("Error when fetch DataAPI.getAll: ", err))
    } // END componentDidMount




    // update filteredLocations when already searched
    updateLocation = (searchedResults, query) => {
        if(query) {
            this.setState ((state) => ({

                filteredLocations: searchedResults
            }))
        } else {
            this.setState({filteredLocations: this.state.defaultLocations})
        }
    }
    
    // substring location name
    getNewName = (locationName) => {
        let newName;
        if (locationName === undefined) {
            newName = ""
        } else if (locationName.includes("(")) {
            newName = locationName.substr(0,locationName.indexOf("("))
        } else {
            newName = locationName
        }
        return newName;
    }

    //handle the list-item when is clicked
    handleItemClick = (location) => {
        console.log("location:",location)

            //      console.log(location.location.lat,location.location.lng)
        const marker = this.state.markers.find(marker => marker.id === location.id)

        let newCenter
        if(location !== undefined && location.location !== undefined) {
            newCenter = {lat: location.location.lat, lng: location.location.lng}
           //       console.log("newCenter:",newCenter)
        }

        //      this.setNewCenter(newCenter, location.id)
        this.setState({
            center: newCenter,
            zoom: 17,
            isItemClicked: true
        })
        
    }

    // setNewCenter = (newCenter, location) => {
    //     //console.log(newCenter)
    //     this.setState({
    //         center: newCenter,
    //         zoom: 18
    // })
        
    // }
            
    render() {

         
        return (

            <div className = "App" role = "main">
                <header className = "header"> 
                <NavBar />
                </header>
                
                <div className = "main-container">
                    
                    <SearchBar 
                        locations = {this.state.filteredLocations}
                        updateLocation = {this.updateLocation}
                        getNewName = {this.getNewName}
                        handleItemClick = {this.handleItemClick}
                    />
                    <div id="map">
                    {/*<ErrorBoundary>
                    <MapContainer 
                        role ="application"
                        aria-label = "Google Map"
                        locations = {this.state.filteredLocations}
                        center = {this.state.center}
                        zoom = {this.state.zoom}
                        getNewName = {this.getNewName}
                        bounds={this.state.bounds}
                        markers={this.state.markers}
                    />
                {/*</ErrorBoundary>
                    </div>
                </div>
          </div>
        );
    }
} 

export default App;


*/