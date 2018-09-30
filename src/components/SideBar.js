import React, { Component } from 'react';
import ListItems from './ListItems'

class SideBar extends Component {
  render() {
    return (
      <div className="sidebar-search">
      
      	<input 
      		className="search-items"
      		type="text"
          role="search"
          aria-label="search items"
      		placeholder="Search..."
      		//value={'aa'}
      		//onchange={(event) => console.log(event)}
      	/>
      	
      <ListItems />
      </div>
    );
  }
}

export default SideBar;