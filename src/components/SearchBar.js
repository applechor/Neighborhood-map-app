import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import ListItems from './ListItems'

class searchBar extends Component {
    state = {
        query: "",
        searchedResults: []
    }

    // handle the search text when it change
    handleSearchChange = (query) => {
        let results = this.showingLocations(query)
        this.setState({
            query: query,
            searchedResults: results
        })

        this.props.updateLocation(results, query)
    }

    // matching text with location.name
    showingLocations = (query) => {
        let showingLocations

        if(this.props.locations!==undefined && this.props.locations.length>0) {
            this.props.locations.sort(sortBy('name'))
        }
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingLocations = this.props.locations.filter((location) => match.test(location.name))
        } else {
            showingLocations = this.props.locations.name
        }
        console.log(showingLocations)
        return showingLocations;
    }

    clearQuery = () => {
        this.setState({ query: "" })
    }

    render() {
        return (
          <div className = "sidebar-search">
          
          	<input 
          		className = "search-items"
          		type = "text"
                role = "search"
                aria-label = "enter coffee shop name"
          		placeholder = "Search coffee shop name..."
          		//value={'aa'}
          		onChange = {(event) => this.handleSearchChange(event.target.value, event)}
          	/>
            <ListItems
                locations = {this.props.locations}
                getNewName = {this.props.getNewName}
                handleItemClick = {this.props.handleItemClick}
            />
          	{/*<input id="clear-list" type="button" value="Clear"/>*/}
          
          </div>
        );
    }
}

export default searchBar;