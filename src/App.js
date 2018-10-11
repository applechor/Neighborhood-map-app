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
    constructor(props) {
        super(props);
        this.state = {
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
        markerObjects:[],
        selectedLocationDetails: [], // details of selected location which is clicked 
        activeMarkerDetails: [],
        
            filterMarkerObj:{},
           
            selectedLocationId: []
        }
        this.updateLocation=this.updateLocation.bind(this)
        this.getNewName= this.getNewName.bind(this)
        this.handleMarkerClick= this.handleMarkerClick.bind(this)
        this.handleItemClick= this.handleItemClick.bind(this)
        this.handleMapClick= this.handleMapClick.bind(this)
        this.onMarkerMounted= this.onMarkerMounted.bind(this)
        
        //  this.onMarkerMounted = element => {
        //     this.setState(prevState => ({
        //         markerObjects: [...prevState.markerObjects, element.marker]
        //     }))
        // };

    }

    onMarkerMounted = element => {
        //console.log("element:",element)
       // console.log("element.marker:",element.marker)
      this.setState(prevState => ({
        markerObjects: [...prevState.markerObjects, element]
      }
      ))
     // console.log(this.state.markerObjects)
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
            let markers=[]

            listVenuesIds.map(listVenuesId => 
                DataAPI.getDetail(listVenuesId)
                .then(venuesDetails => {
//console.log("venuesDetails",venuesDetails)
                    if (venuesDetails.meta.code !== 200 || venuesDetails === undefined) {
                    console.log("Error DataAPI.getDetail: error_code "+venuesDetails.meta.code +" error_detail "+ venuesDetails.meta.errorDetail)
                    }
                    listVenuesDetails.push(venuesDetails.response.venue)
                    //console.log("listVenuesDetails",listVenuesDetails)

                    let marker = {
                        id: venuesDetails.response.venue.id,
                        name: venuesDetails.response.venue.name,
                        lat: venuesDetails.response.venue.location.lat,
                        lng: venuesDetails.response.venue.location.lng
                        //showingInfoWindow: false,
                        //isVisible: true
                        
                    }
                    markers.push(marker)
                  // console.log("Tong",markers)
                    this.setState({
                        locations: listVenuesDetails,
                        markers: markers
                    
                    })
                  
                })
              
            )
          // console.log('locations:',this.state.locations)
        })
        .catch(err => console.log("Error when fetch DataAPI.getAll: ", err))


    } // END componentDidMount


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
        //console.log("=======propsItemClick:=========",locationId)

        //this.setState({selectedLocationId: location})
       // console.log("ItemClick:selectedLocationId:",this.state.selectedLocationId)

        const marker = this.state.markers.find(marker => marker.id === locationId)
        //console.log("Mymarker:",marker)
        //console.log("---this.state.markerObjects:",this.state.markerObjects)

        const filterMarkerObject = this.state.markerObjects.filter(markerObject => markerObject.props.id === marker.id)
        console.log("Object:fileterMarkerObject:",filterMarkerObject)

        this.handleMarkerClick(filterMarkerObject[0].props,filterMarkerObject[0].marker) 
              

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
// componentDidUpdate(prevProps, prevState) {
//     console.log("prevProps:",prevProps)
//     console.log("prevState:",prevState)
//      console.log("this.state.filterMarkerObj:",this.state.filterMarkerObj)
//     console.log("prevState.filterMarkerObj:",prevState.filterMarkerObj)
//     if (this.state.filterMarkerObj !== prevState.filterMarkerObj) {
//         this.setState({
//             activeMarker: this.state.filterMarkerObj,
//             showingInfoWindow: true

//         })
//          console.log('===NewUpdateActiveMarker:',this.state.activeMarker)
//     console.log('===NewUpdateshowingInfoWindow:',this.state.showingInfoWindow)
//     console.log('===NewUpdateselectedLocationDetails:',this.state.selectedLocationDetails)
//         this.handleMarkerClick(this.state.filterMarkerObj.location,this.state.filterMarkerObj)
//     }
   
//   // if (this.state.value > prevState.value) {
//   //   this.foo();  
//   // }
// }

    //handle when a marker is clicked
    handleMarkerClick = (props, marker, e) => {
         //  console.log("======propsMarkerClick:=======",props)
         // console.log("markerMarkerClick: ",marker)
         
         // let checkMarkerId
         // if(marker.id === undefined) {
         //    checkMarkerId = marker[0].id
         // }else{
         //    checkMarkerId = marker.id
         // }

         let details = this.state.locations.filter(location => location.id === marker.id) 
        
        this.setState({
            selectedLocation: props,
            activeMarker: marker,
            //center: props.position,
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
    
    infoWindowHasClosed = (props, marker, e) => {
        this.setState({
            selectedLocation: {},
            showingInfoWindow: false, 
            activeMarker: {},
            selectedLocationDetails: []
        })
    }

    render() {
        //console.log(this.state.markerObjects)
         
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