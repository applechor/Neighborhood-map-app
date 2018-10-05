import React, { Component } from 'react';
import SearchBar from './SearchBar'
import ListItems from './ListItems'

class SideBar extends Component {


    render() {
        return (
           { /*
          <div className="sidebar-search">
          
          	<SearchBar
          		locations = {this.props.locations}
                updateLocation = {this.props.updateLocation}
          	/>
          	{/*<input id="clear-list" type="button" value="Clear"/>
          <ListItems />
          </div>*/}
        );
    }
}

export default SideBar;