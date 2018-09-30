// eslint-disable-line no-extend-native
import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {
    render() {
        return (
            <Map 
                google={this.props.google}
                initialCenter={{
                    lat: 10.015832,//8.715832
                    lng: 99.545097
                }}
                zoom={6.5}
            >
            </Map>
        );
    }
}
 
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCOj4AW3XChO2jkcseRXXPy9Szauf2XFSY'
})(MapContainer)