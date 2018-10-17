import React, { Component } from 'react';
import ListItems from './ListItems'

class SearchBar extends Component {

    handleChange = (query) => {
        this.props.handleSearchChange(query)
    }

    render() {    
        const {toggleMenu, query, clearQuery, getNewName, handleItemClick} = this.props

        return (
          <div id="sidebar-search" className={toggleMenu}>
          	<input 
          		className="search-items"
          		type="text"
                role="search"
                aria-label="enter coffee shop name for searching"
                tabIndex="0"
          		placeholder="Search coffee shop name..."
          		value={query}
          		onChange={(event) => this.handleChange(event.target.value)}
          	/>
            <input 
                id="clear-list" 
                type="button" 
                value="Clear Search"
                onClick={clearQuery}
                aria-label="clear search"
            />
            <div className="showing-list">
                <ol className="list">
                    {this.props.locations.map(location => (
                        <ListItems
                            key={location.id}
                            location={location}
                            getNewName={getNewName}
                            handleItemClick={handleItemClick}
                        />
                    ))}
                </ol>
            </div>
            
            <div className="errMsg">
                <p>{this.props.errMsg!==""?this.props.errMsg:""}</p>
            </div>
          </div>
        );
    }
}

export default SearchBar;