// eslint-disable-next-line
// eslint-disable-line no-extend-native
import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
//import InfoWindow from './InfoWindow'
 
export class MapContainer extends Component {
    state = {
        markers: [],
        showingInfoWindow: false, 
        activeMarker: {},
        selectedPlace: {},
        markerDetails: [],
        imgSrc: {}
    }

    onMarkerClick = (props, marker, e) => {
    
        let details = this.props.locations.filter(location => location.id === marker.id) 

        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            markerDetails: details[0]
        })
        console.log("props:",props)
        console.log("marker.id: ",marker.id)
        console.log("e: ",e)
        console.log("markerDetails: ",details[0])
    }

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

    // checkImage = () => {
    //     let photo = this.state.markerDetails.bestPhoto
    //     let img = []
    //     if(photo !== undefined && photo !== null) {
    //         img =`${photo.prefix}150x150${photo.suffix}`
    //     } else {
    //         img = process.env.PUBLIC_URL+'/no-photo-available.jpg'
    //     }
    //     console.log(img)
    //     //this.setState({imgSrc: img})
    //     //return img;
        
    // }

    render() {
        let details = (this.state.markerDetails !== undefined && this.state.markerDetails !== null)?
                    this.state.markerDetails : undefined

        let photo = details.bestPhoto
        let img = []
        if(photo !== undefined && photo !== null) {
            img =`${photo.prefix}150x150${photo.suffix}`
        } else {
            img = process.env.PUBLIC_URL+'/no-photo-available.jpg'
        }
        console.log(img)

        return (
            
            <Map 
                google={this.props.google}
                initialCenter={{
                    lat: 18.787747,
                    lng: 98.993128
                }}
                zoom={14}
                onClick = {this.onMapClick}
            >
            
                {(this.props.locations) && (
                    this.props.locations.map((location, index) => (
                        <Marker
                            key={index}
                            position={{lat: location.location.lat, lng: location.location.lng}}
                            title={location.name}
                            name={location.name}
                            address={location.location.address}
                            id={location.id}
                            onClick={this.onMarkerClick}
                        />
                    ))
                )}
                
                    <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}
                      maxWidth={450}
                      onClose={(props, marker, e) => this.infoWindowHasClosed(props, marker, e)}>
                    
                        <div className="iw-container">
                    
                            <h4 className="iw-header">{this.state.selectedPlace.name}</h4>
                            
                            <p>{details.location !== undefined && details.location.address ? details.location.address : "what!!!!" }</p>
                            <p>{details.hours !== undefined && details.hours.timeframes[0].days ? "Days: "+details.hours.timeframes[0].days : "" }</p>
                            <p>{details.hours !== undefined && details.hours.status ? details.hours.status : "" }</p>
                            <p>{details.rating !== undefined && details.rating ? "Rating: "+details.rating : "" }</p>
                            <img className="iw-photo" src={img} alt={details.description ? details.description : details.name}/>
                        </div>
                        
                    </InfoWindow> 
                   
{/*style={{display: inline-block; overflow: auto; max-height:654px;max-width;654px}}*/}

{/*<InfoWindowContent 
                        selectedPlaceName = {this.state.selectedPlace.name}
                        selectedPlaceAddress = {this.state.selectedPlace.address}
                       
                        />*/}


                    {/* locationIds = {location.venue.id}//{this.props.listLocationIds}*/}
                {/*))}*/}
{/*style={{position: 'absolute', width: '165px' or 353px height 312px}}>
                        <div>
                        {/*style={{display: inline-block; overflow: auto; max-height:654px;max-width;654px}}
                            <h4>{this.state.selectedPlace.name}</h4>
                            <div>{this.state.selectedPlace.address}</div>
                        </div>*/}
            </Map>

        );
    }
}
 
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCOj4AW3XChO2jkcseRXXPy9Szauf2XFSY'
})(MapContainer)

