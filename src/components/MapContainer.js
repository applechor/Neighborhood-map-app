// eslint-disable-line no-extend-native
import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {
    state = {
        markers: [],
        showingInfoWindow: false, 
        activeMarker: {},
        selectedPlace: {},
    }

    onMarkerClick = (props, marker, e) =>
        {this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        })
        console.log("props:",props)
        console.log("marker: ",marker)
        console.log("e: ",e)
    }

    onMapClick = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    render() {

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
            
                {(this.props.venues) && (
                    this.props.venues.map(venue => (
                        <Marker
                            key={venue.venue.id}
                            position={{lat: venue.venue.location.lat, lng: venue.venue.location.lng}}
                            title={venue.venue.name}
                            name={venue.venue.name}
                            address={venue.venue.location.address}
                            id={venue.venue.id}
                            onClick={this.onMarkerClick}
                        />
                    ))
                )}
            
                    <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}
                      maxWidth={150}>
                    {/*style={{position: 'absolute', width: '165px'}}>*/}
                        <div>
                            <h4>{this.state.selectedPlace.name}</h4>
                            <div>{this.state.selectedPlace.address}</div>
                        </div>
                    </InfoWindow>
                

            
           

            </Map>
            

            

            
        );
    }
}
 
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCOj4AW3XChO2jkcseRXXPy9Szauf2XFSY'
})(MapContainer)