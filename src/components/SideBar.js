import React, { Component } from 'react';
import SearchBar from './SearchBar'
import ListItems from './ListItems'

class SideBar extends Component {
  render() {
    return (
      <div className="sidebar-search">
      
      	<SearchBar
      		//value={'aa'}
      		//onchange={(event) => console.log(event)}
      	/>
      	{/*<input id="clear-list" type="button" value="Clear"/>*/}
      <ListItems />
      </div>
    );
  }
}

export default SideBar;