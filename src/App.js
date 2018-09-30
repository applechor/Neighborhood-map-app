// eslint-disable-line no-extend-native
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import MapContainer from './components/MapContainer'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
//import ListItems from './components/ListItems'

class App extends Component {
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
                <MapContainer 
                    role="application"
                    aria-label="Google Map"
                />
                </div>
            </div>
      </div>
    );
  }
}

export default App;
