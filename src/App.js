// eslint-disable-next-line
import React, { Component } from 'react';
import './App.css';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as DataAPI from './utils/DataAPI'
import MapContainer from './components/MapContainer'
import Header from './components/Header'
import SearchBar from './components/SearchBar'

class App extends Component {
    state = {
        locations: [], // list of all location to filter locations then show on map and list
        originalLocations: [], // list of all location 
        zoom: 13,
        defaultZoom: 13, // default of map zoom
        center: {lat: 18.787747, lng: 98.993128},
        defaultCenter: {lat: 18.787747, lng: 98.993128},
        showingInfoWindow: false, // showing info window for a selected marker
        activeMarker: {}, // marker object (marker) for a clicked marker
        selectedLocation: {}, // marker object (props) for a clicked marker
        markerObjects:[], // list of marker objects
        selectedLocationDetails: [], // details of locations that matched a clicked marker
        query: "", // search query
        bounds: [], // position of each location which fetch from DataAPI
        toggleMenu: "open", // toggle menu to open or close side panel
        errMsg: "" // error message
    }
    
    // invoked after the component is inserted in the DOM
    componentDidMount() {
        // callback for error messsage if error in the Google API request
        window.gm_authFailure = () => {
            let html=  '<div ref=\'resultMap\' class=\'authFailure\'> There is an error when loading Google Maps.</div>'
            let gmContainer = document.getElementsByClassName('gm-err-content')[0]
            gmContainer.innerHTML = html
            // this.setState({
                //  googleMapError: true
            // })
        }
  
        // Fetch list of venues from foursquare API using DataAPI.getAll()
        DataAPI.getAll()   
        .then(res => {
            // check data before fetch data 
            if (res.meta.code === 200) {
                return (res.response.groups[0].items);
            }
        }) 
        // get venueID from all venues
        .then(listVenues => {
            let listVenuesIds = []

            listVenues.map(listVenue => listVenuesIds.push(listVenue.venue.id))
            return listVenuesIds;
        })
        // use venueID to get more venue details info and get position for bounds
        .then(listVenuesIds => {
            let listVenuesDetails = []
            let allBounds = []

            listVenuesIds.map(listVenuesId => 
                DataAPI.getDetail(listVenuesId)
                .then(venuesDetails => {
                    if (venuesDetails.meta.code !== 200 || venuesDetails === undefined) {
                        this.setState({
                            errMsg: "Error_code "+venuesDetails.meta.code +" error_detail "+ venuesDetails.meta.errorDetail
                        })
                    }

                    listVenuesDetails.push(venuesDetails.response.venue)
                    allBounds.push({
                        lat: venuesDetails.response.venue.location.lat,
                        lng: venuesDetails.response.venue.location.lng
                    })
                    this.setState({
                        locations: listVenuesDetails,
                        originalLocations: listVenuesDetails,
                        bounds: allBounds                   
                    }) 
                })
                .catch(err => {
                    this.setState({
                        errMsg: "Error when fetch DataAPI.getDetail: "+ err
                    })
                })
              
            )
        })
        .catch(err => {
            this.setState({
                errMsg: "Error when fetch DataAPI.getAll: "+ err
            })
        })
    } // END componentDidMount

    // Clear data within page (search text, list items and markers) to default when click 'Clear Search' button
    clearQuery = () => {
        this.setState({
            query: "",
            locations: this.state.originalLocations,
            showingInfoWindow: false,
            activeMarker: {},
            selectedLocation: {},
            selectedLocationDetails: []
        })
    }

    // Get all the marker objects from the component using ref in <Marker />
    // Each marker object is used in handleItemClick() for passing that marker object to handleMarkerClick() 
    // https://stackoverflow.com/questions/51579671/how-to-get-all-markers-in-google-maps-react
    onMarkerMounted = (element) => {
        this.setState(prevState => ({
            markerObjects: [...prevState.markerObjects, element]
        }))
    }

    // This function will filter the locations that match the search text which user is typing
    handleSearchChange = (query) => {
        this.setState({
            query: query
        })
        this.showingLocations(query)
    }

    // find the locations that match the query then sort them by name
    showingLocations = (query) => {
        // if(this.state.locations!==undefined && this.state.locations.length>0) {
        //     this.state.locations.sort(sortBy('name'))  
        let filterLocations =[]

        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            filterLocations = this.state.originalLocations.filter((location) => match.test(location.name))
        } else { // if dont' have someone type
            filterLocations = this.state.originalLocations
        }
            filterLocations.sort(sortBy('name'))
        
        this.setState({
            locations: filterLocations
        })
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

    // Get a locationId from a clicked item then find the marker object that match that locationId
    // then pass props and marker of marker object to handleMarkerClick()
    handleItemClick = (locationId) => {
        const marker = this.state.locations.find(location => location.id === locationId)

        const filterMarkerObject = this.state.markerObjects
            .filter(markerObject => markerObject !== null)
            .filter(markerObject => markerObject.props.id === marker.id)
        this.handleMarkerClick(filterMarkerObject[0].props,filterMarkerObject[0].marker)         
    }


    // When a marker or a item is clicked, that marker will active by show info window, bouncing marker 
    handleMarkerClick = (props, marker, e) => {
        let details = this.state.locations.filter(location => location.id === marker.id) 
    
        this.setState({
            selectedLocation: props,
            activeMarker: marker,
            center: props.position,
            zoom: 18,
            showingInfoWindow: true,
            selectedLocationDetails: details[0]    
        })
     }


    // When map is clicked, everything is cleared to default 
    // (close info window, marker does not active, list items have all location data)
    handleMapClick = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: {},
                selectedLocation: {},
                selectedLocationDetails: []
            })
        }
    }

    // When the close button on the info window is clicked, the info window will close or when a marker is clicked,
    // a info window is open while the previous info window of previous marker was close
    infoWindowHasClosed = (props, marker, e) => {
        this.setState({
            selectedLocation: {},
            showingInfoWindow: false, 
            activeMarker: {},
            selectedLocationDetails: []
        })
    }

    // When click the hamberger menu on the header, the side panel will close or open
    onClickMenu = () => {
        if (this.state.toggleMenu === "") {
            this.setState({toggleMenu: "open"})
        } else {
            this.setState({toggleMenu: ""})
        }
    }

    render() {
        // sorting locations by name
        if(this.state.locations!==undefined && this.state.locations.length>0) {
             this.state.locations.sort(sortBy('name'))
        }
        
        return (
            <div className="App" >
                <Header 
                    toggleMenu={this.state.toggleMenu}
                    onClickMenu={this.onClickMenu}
                />
       
                <main className="main-container" role="main">
                    <section className="search-bar-container">
                        <SearchBar 
                            locations={this.state.locations}
                            getNewName={this.getNewName}
                            handleItemClick={this.handleItemClick}
                            query={this.state.query}
                            handleSearchChange={this.handleSearchChange}
                            clearQuery={this.clearQuery}
                            toggleMenu={this.state.toggleMenu}
                            errMsg={this.state.errMsg}
                        />
                    </section>
                    <section className="map-container" role="application">
                        <MapContainer 
                            aria-label="Google Map"
                            locations={this.state.locations}
                            center={this.state.center}
                            zoom={this.state.zoom}
                            getNewName={this.getNewName}
                            bounds={this.state.bounds}
                            handleMarkerClick={this.handleMarkerClick}
                            handleMapClick={this.handleMapClick}
                            showingInfoWindow={this.state.showingInfoWindow}
                            activeMarker={this.state.activeMarker}
                            selectedLocationDetails={this.state.selectedLocationDetails}
                            onMarkerMounted={this.onMarkerMounted}
                            infoWindowHasClosed={this.infoWindowHasClosed}
                            errMsg={this.state.errMsg}
                        />
                    </section>
                </main>
                <footer role="contentinfo">
                    <p> get data from FourSqaure API
                    <a  href="https://developer.foursquare.com/" 
                        tabIndex="0"
                        aria-label="Link to four square API developer site"> visit</a>
                    </p>
                </footer>
            </div>
        );
    }
} 

export default App;


