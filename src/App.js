/*eslint-disable-next-line*/
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import MapContainer from './components/MapContainer'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import * as DataAPI from './utils/DataAPI'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
//import * as ErrorBoundary from './components/ErrorBoundary'
//import ListItems from './components/ListItems'
        
 class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        //filteredLocations: [], // list of all location in details which for filtering
        locations: [], // list of all location in details that was shown when no query in search input
        originalLocations: [],
        markers: [],
        zoom: 13,
        defaultZoom: 13, // default of zoom
        center: {lat: 18.787747, lng: 98.993128},
        defaultCenter: {lat: 18.787747, lng: 98.993128},
        
        showingInfoWindow: false, // show info window
        activeMarker: {}, // marker info for selected marker
        selectedLocation: {}, // location info for selected marker
        markerObjects:[],
        selectedLocationDetails: [], // details of selected location which is clicked 
        activeMarkerDetails: [],
        query: "",

            filterMarkerObj:{},
           
            selectedLocationId: []
        }
        this.updateLocation=this.updateLocation.bind(this)
        this.getNewName= this.getNewName.bind(this)
        this.handleMarkerClick= this.handleMarkerClick.bind(this)
        this.handleItemClick= this.handleItemClick.bind(this)
        this.handleMapClick= this.handleMapClick.bind(this)
        this.onMarkerMounted= this.onMarkerMounted.bind(this)

    }
    
//     componentWillMount() {
//        let getMarkerObjects = (markerObjects) => {

        
//         this.setState({
//             markerObjects: markerObjects
//         })
//         console.log("this.state.markerObjects:",this.state.markerObjects)
//         //const fileterMarkerObject = markerObjects.filter(markerObject => markerObject.id === this.state.activeMarker.id)

//         //console.log("fileterMarkerObject:",fileterMarkerObject)
//     //}
//     }
// }
    // invoked after the component is inserted in the DOM
    componentDidMount() {
        
        // Fetch list of venues from foursquare
        DataAPI.getAll()   
        .then(res => {
            if (res.meta.code === 200) {
                //console.log("res",res)
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
           // let markers=[]

            listVenuesIds.map(listVenuesId => 
                DataAPI.getDetail(listVenuesId)
                .then(venuesDetails => {
//console.log("venuesDetails",venuesDetails)
                    if (venuesDetails.meta.code !== 200 || venuesDetails === undefined) {
                    console.log("Error DataAPI.getDetail: error_code "+venuesDetails.meta.code +" error_detail "+ venuesDetails.meta.errorDetail)
                    }
                    listVenuesDetails.push(venuesDetails.response.venue)
                    //console.log("listVenuesDetails",listVenuesDetails)

                    // let marker = {
                    //     id: venuesDetails.response.venue.id,
                    //     name: venuesDetails.response.venue.name,
                    //     lat: venuesDetails.response.venue.location.lat,
                    //     lng: venuesDetails.response.venue.location.lng
                        //showingInfoWindow: false,
                        //isVisible: true
                        
                   // }
                   // markers.push(marker)
                  // console.log("Tong",markers)
                    this.setState({
                        locations: listVenuesDetails,
                        originalLocations: listVenuesDetails
                       // markers: markers
                    
                    })
                  
                })
              
            )
          // console.log('locations:',this.state.locations)
        })
        .catch(err => console.log("Error when fetch DataAPI.getAll: ", err))


    } // END componentDidMount

    clearQuery = () => {
        this.setState({
            query: "",
            locations: this.state.originalLocations,
            zoom: this.state.defaultZoom,
            center: this.state.defaultCenter,

            showingInfoWindow: false,
            activeMarker: {},//null,
            selectedLocation: {},//null,
            selectedLocationDetails: []
 
        })
    }

  // clearFilterInput = () => {
  //   // if the input is empty we don't want the map to rerender if we click the button
  //   if (this.state.query === '')
  //     return
  //     // if its not empty, set it back to our original state
  //   this.setState({
  //     query: '',
  //     filterResults: [...this.state.allRestaurants]
  //   })
  // }

    // This function is responsible for getting all the markers from the component using ref
    // The markers are then 'pushed' into the state.markers array using a setState with a prevState
    // Without the prevState it will only 'push' the last marker, so this syntax in necessary
    onMarkerMounted = element => {
        console.log("element:",element)
       //console.log("element.marker:",element.marker)
      this.setState(prevState => ({
        markerObjects: [...prevState.markerObjects, element]
      }
      ))
      //console.log('markerObjects:',this.state.markerObjects)
    }

    handleSearchChange = (query) => {
          this.setState({
            query: query
        })
        //let results = this.showingLocations(query)
        this.showingLocations(query)
        //this.state.updateLocation(results, query)

        // this.setState({
        //     locations: results
        // }, () => console.log("locations:",this.state.locations))
    }

    showingLocations = (query) => {
        console.log("query:", query)
        //console.log("location:", this.state.locations)
        // if(this.state.locations!==undefined && this.state.locations.length>0) {
        //     this.state.locations.sort(sortBy('name'))  
    //     //console.log("this.state.locationsSortBy:",this.state.locations)
    //     } 
        let filterLocations =[]
        
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            filterLocations = this.state.originalLocations.filter((location) => match.test(location.name))
        } else { // if dont' have someone type
            filterLocations = this.state.originalLocations
        }
            filterLocations.sort(sortBy('name'))
        console.log("filterLocations:",filterLocations)

         //return filterLocations;
        this.setState({locations: filterLocations},() => {console.log('locations:',this.state.locations)})
        console.log('locations:',this.state.locations)

     }

        

    


    // update Locations on the side bar while searching
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

    // closeAllInfo = () => {
    //     const markers = this.state.markers.map(marker => {
    //         //marker.isOpen = false,
    //         marker.showingInfoWindow = false
    //         return marker;
    //     })
    //     this.setState({markers: Object.assign(this.state.markers, markers)})
    //    // console.log(this.state.markers)
    // }

    handleItemClick = (locationId) => {

        const marker = this.state.locations.find(location => location.id === locationId)
        console.log("=Mymarker:",marker)
        console.log("=this.state.markerObjects:",this.state.markerObjects)

        
        const filterMarkerObject = this.state.markerObjects.filter(markerObject => markerObject !== null)
        .filter(markerObject => markerObject.props.id === marker.id)
        console.log("Object:fileterMarkerObject:",filterMarkerObject)
        this.handleMarkerClick(filterMarkerObject[0].props,filterMarkerObject[0].marker) 
        

        // const filterMarkerObject = this.state.markerObjects.map(markerObject => markerObject.props.id === marker.id)
        // console.log("Object:fileterMarkerObject:",filterMarkerObject)

        //this.handleMarkerClick(filterMarkerObject[0].props,filterMarkerObject[0].marker) 
              

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


    //handle when a marker is clicked
    handleMarkerClick = (props, marker, e) => {
        console.log("===MarkerClick:props:",props)
        console.log("===MarkerClick:marker:",marker)
        console.log("===MarkerClick:e:",e)

         let details = this.state.locations.filter(location => location.id === marker.id) 
        
        this.setState({
            selectedLocation: props,
            activeMarker: marker,
            center: props.position,
            zoom: 17,
            showingInfoWindow: true,
            selectedLocationDetails: details[0]    
 
        })

     }

    //handle the list-item when is clicked
    
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
                activeMarker: {},//null,
                selectedLocation: {},//null,
                selectedLocationDetails: []
            })
        }
    }

    // This function runs when the close button is clicked on the InfoWindow or when a marker
    // Is clicked and another InfoWindow is open from another marker
    infoWindowHasClosed = (props, marker, e) => {
        this.setState({
            selectedLocation: {},
            showingInfoWindow: false, 
            activeMarker: {},
            selectedLocationDetails: []
        })
    }

    render() {
        
         if(this.state.locations!==undefined && this.state.locations.length>0) {
             this.state.locations.sort(sortBy('name'))
         }
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
                        query = {this.state.query}
                        handleSearchChange = {this.handleSearchChange}
                        clearQuery = {this.clearQuery}
                    />
                    <div id="map">
                   
                    <MapContainer 
                        role ="application"
                        aria-label = "Google Map"
                        locations = {this.state.locations}
                        center = {this.state.center}
                        zoom = {this.state.zoom}
                        getNewName = {this.getNewName}
                        bounds={this.state.bounds}
                        //markers={this.state.markers}
                        handleMarkerClick={this.handleMarkerClick}
                        handleMapClick={this.handleMapClick}
                        showingInfoWindow={this.state.showingInfoWindow}
                        activeMarker={this.state.activeMarker}
                        selectedLocationDetails={this.state.selectedLocationDetails}
                        selectedLocationId={this.state.selectedLocationId}
                        activeMarkerDetails={this.state.activeMarkerDetails}
                        getMarkerObjects={this.getMarkerObjects}
                        onMarkerMounted={this.onMarkerMounted}
                        infoWindowHasClosed={this.infoWindowHasClosed}
                        markerObjects={this.state.markerObjects}
                    />
               
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