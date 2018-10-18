// eslint-disable-next-line
import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
class MapContainer extends Component {

    // fitbound or center the map to show all markers
    // https://github.com/fullstackreact/google-maps-react/issues/63 
    componentDidUpdate() {
        const allbounds = new window.google.maps.LatLngBounds()
        this.props.bounds.forEach((bound, i) => {
            allbounds.extend(new window.google.maps.LatLng(
                bound.lat,
                bound.lng
            ))
        })
        this.refs.resultMap.map.fitBounds(allbounds)
    }

    render() {
        const {locations, selectedLocationDetails, center, zoom, activeMarker, showingInfoWindow, handleMapClick, onMarkerMounted, handleMarkerClick, infoWindowHasClosed, getNewName} = this.props

        // create markers using locations data
        let markers = []
        if (locations !== undefined && locations !== null) {
            locations.forEach(location => {
                let marker = {
                    id: location.id,
                    name: location.name,
                    lat: location.location.lat,
                    lng: location.location.lng
                }
                markers.push(marker)
            })
        }
        
        
        // get location detials before use them within info window
        let details = (selectedLocationDetails !== undefined && selectedLocationDetails !== null)?
        selectedLocationDetails : undefined
        
        // get image data
        let img
        if (details !== undefined && details !== null) {
            if(details.bestPhoto!==undefined && details.bestPhoto!==null) {
                img=`${details.bestPhoto.prefix}130x130${details.bestPhoto.suffix}`
            } else {
                img=process.env.PUBLIC_URL+'/no-photo-available.jpg'
            }
        }

        return (          
            <Map 
                google={this.props.google}
                ref="resultMap"
                className={'map'}
                initialCenter={{
                    lat: 18.787747,
                    lng: 98.993128
                }}
                center={center}
                zoom={zoom}
                onClick={handleMapClick}
            >
                {markers && (
                    markers.map((marker, index) => (
                        <Marker
                            ref={onMarkerMounted}
                            key={index}
                            position={{lat: marker.lat, lng: marker.lng}}
                            title={marker.name}
                            name={getNewName(marker.name)}
                            id={marker.id}
                            onClick={(props, marker, e) => handleMarkerClick(props, marker, e)}
                            animation={activeMarker ? (marker.id === activeMarker.id ? '1' : '0') : '0'}
                        />
                    ))
                )}    

                <InfoWindow
                    marker={activeMarker}
                    visible={showingInfoWindow}
                    maxWidth={300}
                    onClose={(props, marker, e) => infoWindowHasClosed(props, marker, e)}
                >
                    {this.props.errMsg!=="" ? this.props.errMsg :
                        <div className="iw-container" >
                            <div className="iw-photo" >
                                <img 
                                src={img} 
                                alt={details.description ? details.description : details.name}
                                tabIndex="0"
                                />
                            </div>
                            <div className="iw-content" tabIndex="0">
                                <h4 className="iw-title">{getNewName(details.name)}</h4>
                                <p>{details.location!==undefined && details.location.address ? details.location.address : "" }</p>
                                <p>{details.hours!==undefined && details.hours.timeframes[0].days ? "Days: "+details.hours.timeframes[0].days : "" }</p>
                                <p>{details.hours!==undefined && details.hours.status ? details.hours.status : "" }</p>
                                <p>{details.rating!==undefined && details.rating ? "Rating: "+details.rating : "" }</p>
                            </div>                          
                        </div>
                    }     
                </InfoWindow> 
            </Map>
        );
    }
}
 
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCOj4AW3XChO2jkcseRXXPy9Szauf2XFSY'
})(MapContainer)