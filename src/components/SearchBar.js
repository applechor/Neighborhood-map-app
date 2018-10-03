import React, { Component } from 'react';


class searchBar extends Component {
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
      	{/*<input id="clear-list" type="button" value="Clear"/>*/}
      
      </div>
    );
  }
}

export default searchBar;