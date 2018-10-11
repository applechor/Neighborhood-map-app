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
        this.setState({
            query: query
        })
        let results = this.showingLocations(query)
        //this.props.updateLocation(results, query)

        // this.setState({
        //     searchedResults: results
        // })
    }
    //      handleSearchChange = (query) => {
    //     let results = this.showingLocations(query)
    //     this.setState({
    //         query: query,
    //         searchedResults: results
    //     })
    //     this.props.updateLocation(results, query)
    // }

    // matching text with location.name
    showingLocations = (query) => {
        console.log("query:", query)
        console.log("location:", this.props.locations)

        let filterLocations =[]
        
        if(this.props.locations!==undefined && this.props.locations.length>0) {
            this.props.locations.sort(sortBy('name'))
            //console.log("this.props.locationsSortBy:",this.props.locations)
        }
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            filterLocations = this.props.locations.filter((location) => match.test(location.name))
        } else { // if dont' have someone type
            filterLocations = this.props.locations
        }
        console.log("filterLocations:",filterLocations)
        
        
         return filterLocations;
     }

    // clearQuery = () => {
    //     this.setState({ query: "" })
    // }

    //clear everything to the starting page
   clearQuery = () => {
  //   // if the input is empty we don't want the map to rerender if we click the button
  //   if (this.state.query === '')
  //     return
  //     // if its not empty, set it back to our original state
  //   this.setState({
  //     query: '',
  //     filterResults: [...this.state.allRestaurants]
  //   })
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
          		value={this.state.query}
          		onChange = {(event) => this.handleSearchChange(event.target.value)}
          	/>
            <input 
                id="clear-list" 
                type="button" 
                value="Clear"
                onClick={this.clearQuery}
            />
            <ListItems
                locations = {this.props.locations}
                getNewName = {this.props.getNewName}
                handleItemClick = {this.props.handleItemClick}
                searchedResults={this.state.showingLocations}
            />
          	
          
          </div>
        );
    }
}

export default searchBar;