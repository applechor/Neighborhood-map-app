// eslint-disable-line no-extend-native
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import MapContainer from './components/MapContainer'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import * as DataAPI from './utils/DataAPI'
//import * as ErrorBoundary from './components/ErrorBoundary'
//import ListItems from './components/ListItems'
        
        // {
        //  if(!res.ok) {
        //      //throw Error(res.statusText?res.statusText:"unknown network error")
        //      console.log(res.statusText?res.statusText:"unknown network error")
        //  }
        //  return res.json()
        // })

class App extends Component {
    state = {
        venues: [], // 
        allVenueId: [] // venue_id of all list item
    }

    // invoked after the component is inserted in the DOM
    componentDidMount() {

        DataAPI.getListAll()   
        .then(res => {
            if (res.meta.code === 200) {
                return (res.response.groups[0].items);
            }
        }) 
        /* --- back up 1
        .then(venues => {
            let venueId = [];
            //venues.map(venue => venues.push(venue))
            this.setState({venues})
            console.log(venues)
        })*/
/* --- back up 2
        .then(listVenues => {
            let allVenueId = []
            listVenues.map(listVenue => 
                allVenueId.push(listVenue.venue.id)
            )
            this.setState({allVenueId})
            console.log(allVenueId)
            return allVenueId;
                
        })
})*/
        .then(listVenues => {
            let allVenuesDetails = []
            listVenues.map(listVenue => 
                DataAPI.getDetail(listVenue.venue.id)
                .then(venueDetails => {
                    if(venueDetails.meta.code !== 200 || venueDetails === undefined) {
                        console.log("Error DataAPI.getDetail: "+venueDetails.meta.code +" "+ venueDetails.meta.errorDetail)
                    }
                    allVenuesDetails.push(venueDetails)

                    console.log(allVenuesDetails)
                }

                ) 
                .catch(err => console.log(err))
            )
        })
/* --- back up 2
        .then(allVenueId => {
            
                DataAPI.getDetail(venueId)//(`${allVenueId}`)
            .then(venueDetails => console.log(venueDetails))
            .catch(err => console.log(err))
        })
})*/

        .catch(err => console.log("Error DataAPI.getListAll: ", err + " or unknown network error"))
    }

    render() {
        return (

            <div className="App" role="main">
                {/*} <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                  To get started, edit <code>src/App.js</code> and save to reload.
                </p>*/}

                <header className="header"> 
                    {/*<h1 className="header-title"> Islands in Thailand </h1>*/}
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
                        venues={this.state.venues}
                    />
                {/*</ErrorBoundary>*/}
                    </div>
                </div>
          </div>
        );
    }
} 

export default App;
