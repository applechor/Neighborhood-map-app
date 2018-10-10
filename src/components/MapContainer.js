/*eslint-disable-next-line*/
/*global google*/

// eslint-disable-line no-extend-native
import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
//import InfoWindow from './InfoWindow'
 
export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

            markerDetails: [], //marker info in detail for selected marker
            markerObjects:[]
        }
        //this.getMarkerObject=this.getMarkerObject.bind(this)

        // this.onMarkerMounted = element => {
        //   this.setState(prevState => ({
        //     markerObjects: [...prevState.markerObjects, element.marker]
        //   }))
        // };
  }
    

    // infoWindowHasClosed = (props, marker, e) => {
    //     this.setState({
    //         showingInfoWindow: false, 
    //         activeMarker: {},
    //         selectedPlace: {}
    //     })
    // }


    // componentDidUpdate() {
    //     if (this.props.selectedItem) {
    //         let selectedMarker = this.markers.find(m => 
    //             return m.id === this.props.selectedItem)
    //     }
        
    // }

     
// componentDidUpdate() {
//     console.log(this.state.markers)
//     const bounds = new window.google.maps.LatLngBounds()
//     this.props.markers.map((result) => {
//         bounds.extend(new window.google.maps.LatLng(
//             this.props.markers.lat,
//             this.props.markers.lng
//         ));
//     });
          
//     this.refs.resultMap.map.fitBounds(bounds)
// }
// adjustMap(mapProps, map) {
//     console.log("mapProps:", mapProps)
//     console.log("map:", map)

//   const {google, markers} = mapProps;
//   const bounds = new google.maps.LatLngBounds();
// //console.log(this.props.markers)
//   this.props.markers.forEach(marker => {

//     const {lat, lng} = marker;
//     console.log(marker.lat)

//     bounds.extend(new google.maps.LatLng(lat, lng));
//   });

//   map.fitBounds(bounds);
  // map.panToBounds(bounds);
//}

// getMarkerObject= () => { 
//     this.props.getMarkerObjects(this.state.markerObjects)
//     console.log("aaaaaaaaaaaaaaaa")
// }


    render() {
        //console.log("markerObjects:",this.state.markerObjects)
        // let details=(this.props.activeMarkerDetails !== undefined && 
        //     this.props.activeMarkerDetails !== null)?
        //     this.props.activeMarkerDetails : undefined
        let details=(this.props.selectedLocationDetails !== undefined && this.props.selectedLocationDetails !== null)?
        this.props.selectedLocationDetails : undefined
        //console.log('details:',details)
        
        //let photo=details.bestPhoto
        let img
    if (details !== undefined && details !== null) {
        
        if(details.bestPhoto!==undefined && details.bestPhoto!==null) {
            img=`${details.bestPhoto.prefix}150x150${details.bestPhoto.suffix}`
        } else {
            img=process.env.PUBLIC_URL+'/no-photo-available.jpg'
        }
    }

        

// var bounds = new this.props.google.maps.LatLngBounds();
// console.log(this.props.markers)
//     for (var i = 0; i < this.props.markers.length; i++) {
//         const {lat, lng} = this.props.markers
//         console.log(this.props.markers.lat)
//         bounds.extend(new google.maps.LatLng(lat, lng));
//     }

//var highlightedIcon = this.makeMarkerIcon('FFFF24')
console.log("MAP:this.props.activeMarker;",this.props.activeMarker)
console.log("MAP:this.props.activeMarker;",this.props.activeMarker.position)
console.log("MAP:this.props.showingInfoWindow;",this.props.showingInfoWindow)
console.log("MAP:this.props.selectedLocationId;",this.props.selectedLocationId)

let checkfilter = this.props.selectedLocationId? this.props.selectedLocationId: this.props.activeMarker.id
console.log('checkfilter:',checkfilter)
console.log('selectedLocationId:',this.props.selectedLocationId)
//console.log('activeMarker.id:',this.props.activeMarker.id)

console.log("markers_aaaa:",this.props.markers)
        return (
            
            <Map 
                google={this.props.google}
               // ref={"resultMap"}
                initialCenter={{
                    lat: 18.787747,
                    lng: 98.993128
                }}
                center={this.props.center}
                zoom={this.props.zoom}
                onClick={this.props.handleMapClick}
                //onReady={this.adjustMap}
               //bounds={bounds}  
                style={{
                                    position: 'static',
                                    width: '100%',
                                    height: '100%',
                                    marginBottom: '20px',
                                    border: '1px solid grey',
                                    boxSizing: 'border-box'
                                 }}
            >
            
               {/* {this.props.markers && (
                    this.props.markers.map((marker, index) => (*/}
                {this.props.markers && (
                    this.props.markers.map((marker, index) => (
                        <Marker
                        ref={this.props.onMarkerMounted}
                            key={index}
                            position={{lat: marker.lat, lng: marker.lng}}
                            title={marker.name}
                            name={this.props.getNewName(marker.name)}
                            id={marker.id}
                            onClick={(props, marker, e) => this.props.handleMarkerClick(props, marker, e)}
                            //getMarkerObject={this.getMarkerObject}
                            //getMarkerObjects={this.props.getMarkerObjects(this.state.markerObjects)}
                                //onClick={(props, marker, e) => this.props.handleMarkerClick(props, marker, e)}
                            
                            animation={this.props.activeMarker ? (marker.id===this.props.activeMarker.id 
                                ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP) : google.maps.Animation.DROP}
                                //    animation={arr.length===1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
                                //    position={{lat: marker.lat, lng: marker.lng}}
                                //    title={marker.name}
                                //    name={this.props.getNewName(marker.name)}
                                //    id={marker.id}
                                //    onClick={this.onMarkerClick}
                            

                            // address={this.props.locations.location.address}
                                
                            //animation= {this.props.google.maps.Animation.DROP}
                            //bounds={mapBounds}
                            //icon={highlightedIcon}
                             
                        />
                    ))
                )}    
                    { //this.props.showingInfoWindow && 
                        // this.props.activeMarker && 

                        // // (this.props.selectedLocationId || this.props.activeMarker )&&
                        // // this.props.markers.filter(marker => marker.id === checkfilter)
                        //  this.props.markers.filter(marker => marker.id === this.props.activeMarker.id)
                        //  .map((marker,index) =>(
                    
                    //this.props.markers.filter(marker => marker.showingInfoWindow = true)
                    //.map((marker, index) => (

                <InfoWindow
                   //key={index}
                    marker={this.props.activeMarker}
                    visible={this.props.showingInfoWindow}
                    //position={{lat: this.props.activeMarker.position, lng: marker.lng}}
                    //position={{lat: (marker.lat), lng: marker.lng}}
                    maxWidth={250}
                    pixelOffset={this.props.selectedLocationId?{width: 0, height: -30}:{width: 0, height: 0}}
                    //zindex= {10}
                    onClose={(props, marker, e) => this.props.infoWindowHasClosed(props, marker, e)}
                    >
                
                    <div className="iw-container">
                        <h4 className="iw-header">{this.props.getNewName(details.name)}</h4>
                        
                        <p>{details.location!==undefined && details.location.address ? details.location.address : "" }</p>
                        <p>{details.hours!==undefined && details.hours.timeframes[0].days ? "Days: "+details.hours.timeframes[0].days : "" }</p>
                        <p>{details.hours!==undefined && details.hours.status ? details.hours.status : "" }</p>
                        <p>{details.rating!==undefined && details.rating ? "Rating: "+details.rating : "" }</p>
                        <img 
                            className="iw-photo" 
                            src={img} 
                            alt={details.description ? details.description : details.name}
                            tabIndex={0}
                        />
                    </div>
                            
                </InfoWindow> 
        //))
}
            </Map>

        );
    }
}
 
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCOj4AW3XChO2jkcseRXXPy9Szauf2XFSY'
})(MapContainer)




/*********************************************************
** BACK UP

export class MapContainer extends Component {
    state = {
        markers: [],
        showingInfoWindow: false, // show info window
        activeMarker: {}, // marker info for selected marker
        selectedPlace: {}, // location info for selected marker 
        markerDetails: [] //marker info in detail for selected marker
       
    }



    //handle when a marker is clicked
    onMarkerClick = (props, marker, e) => {
        // filter locations which match the marker id
        let details = this.props.locations.filter(location => location.id === marker.id) 

        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            markerDetails: details[0]
        })
          console.log("props:",props)
          console.log("marker: ",marker)
          //console.log("e: ",arr)
         // console.log("markerDetails: ",details[0])
    }

    //handle when map is clicked
    onMapClick = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    infoWindowHasClosed = (props, marker, e) => {
        this.setState({
            showingInfoWindow: false, 
            activeMarker: {},
            selectedPlace: {}
        })
    }

      makeMarkerIcon=(markerColor)=> {
         var markerImage = 
        {url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
           '|40|_|%E2%80%A2',
          size: new this.props.google.maps.Size(30, 39),
          origin: new this.props.google.maps.Point(0, 0),
          anchor: new this.props.google.maps.Point(10, 34),
          scaledSize: new this.props.google.maps.Size(30, 39)}
  
            return markerImage;
      }
// componentDidUpdate() {
//     console.log(this.state.markers)
//     const bounds = new window.google.maps.LatLngBounds()
//     this.props.markers.map((result) => {
//         bounds.extend(new window.google.maps.LatLng(
//             this.props.markers.lat,
//             this.props.markers.lng
//         ));
//     });
          
//     this.refs.resultMap.map.fitBounds(bounds)
// }
// adjustMap(mapProps, map) {
//     console.log("mapProps:", mapProps)
//     console.log("map:", map)

//   const {google, markers} = mapProps;
//   const bounds = new google.maps.LatLngBounds();
// //console.log(this.props.markers)
//   this.props.markers.forEach(marker => {

//     const {lat, lng} = marker;
//     console.log(marker.lat)

//     bounds.extend(new google.maps.LatLng(lat, lng));
//   });

//   map.fitBounds(bounds);
  // map.panToBounds(bounds);
//}

    render() {
        let details=(this.state.markerDetails !== undefined && this.state.markerDetails !== null)?
                    this.state.markerDetails : undefined
//console.log('markers:',this.props.markers)

        let photo=details.bestPhoto
        let img=[]
        if(photo!==undefined && photo!==null) {
            img=`${photo.prefix}150x150${photo.suffix}`
        } else {
            img=process.env.PUBLIC_URL+'/no-photo-available.jpg'
        }

// var bounds = new this.props.google.maps.LatLngBounds();
// console.log(this.props.markers)
//     for (var i = 0; i < this.props.markers.length; i++) {
//         const {lat, lng} = this.props.markers
//         console.log(this.props.markers.lat)
//         bounds.extend(new google.maps.LatLng(lat, lng));
//     }

var highlightedIcon = this.makeMarkerIcon('FFFF24')

//console.log("markers_aaaa:",this.props.markers)
        return (
            
            <Map 
                google={this.props.google}
               // ref={"resultMap"}
                initialCenter={{
                    lat: 18.787747,
                    lng: 98.993128
                }}
                center={this.props.center}
                zoom={this.props.zoom}
                onClick={this.onMapClick}
                //onReady={this.adjustMap}
               //bounds={bounds}  
                style={{
                                    position: 'static',
                                    width: '100%',
                                    height: '100%',
                                    marginBottom: '20px',
                                    border: '1px solid grey',
                                    boxSizing: 'border-box'
                                 }}
            >
            
               {/* {this.props.markers && (
                    this.props.markers.map((marker, index) => (*
                {this.props.locations && (
                    this.props.locations.map((location, index, arr) => (
                        <Marker
                            key={index}
                            position={{lat: location.location.lat, lng: location.location.lng}}
                            title={location.name}
                            name={this.props.getNewName(location.name)}
                            id={location.id}
                            onClick={this.onMarkerClick}
                            address={location.location.address}
                            animation={this.state.activeMarker ? (location.id===this.state.activeMarker.id 
                                ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP) : google.maps.Animation.DROP}
                                //    animation={arr.length===1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
                                //    position={{lat: marker.lat, lng: marker.lng}}
                                //    title={marker.name}
                                //    name={this.props.getNewName(marker.name)}
                                //    id={marker.id}
                                //    onClick={this.onMarkerClick}
                            

                            // address={this.props.locations.location.address}
                                
                            //animation= {this.props.google.maps.Animation.DROP}
                            //bounds={mapBounds}
                            //icon={highlightedIcon}
                             
                        >
<InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}
                      maxWidth={150}
                      onClose={(props, marker, e) => this.infoWindowHasClosed(props, marker, e)}>
                    
                        <div className="iw-container">
                    
                            <h4 className="iw-header">{this.state.selectedPlace.name}</h4>
                            
                            <p>{details.location!==undefined && details.location.address ? details.location.address : "" }</p>
                            <p>{details.hours!==undefined && details.hours.timeframes[0].days ? "Days: "+details.hours.timeframes[0].days : "" }</p>
                            <p>{details.hours!==undefined && details.hours.status ? details.hours.status : "" }</p>
                            <p>{details.rating!==undefined && details.rating ? "Rating: "+details.rating : "" }</p>
                            <img 
                                className="iw-photo" 
                                src={img} 
                                alt={details.description ? details.description : details.name}
                                tabIndex={0}
                            />
                        </div>
                        
                    </InfoWindow> 
</Marker>
                    ))
                )}
                
                    
                   
{/*style={{display: inline-block; overflow: auto; max-height:654px;max-width;654px}}*

{/*<InfoWindowContent 
                        selectedPlaceName = {this.state.selectedPlace.name}
                        selectedPlaceAddress = {this.state.selectedPlace.address}
                       
                        />*/


                    /* locationIds = {location.venue.id}//{this.props.listLocationIds}*/
                /*))}*/
/*style={{position: 'absolute', width: '165px' or 353px height 312px}}>
                        <div>
                        {/*style={{display: inline-block; overflow: auto; max-height:654px;max-width;654px}}
                            <h4>{this.state.selectedPlace.name}</h4>
                            <div>{this.state.selectedPlace.address}</div>
                        </div>*
            </Map>

        );
    }
}

*/