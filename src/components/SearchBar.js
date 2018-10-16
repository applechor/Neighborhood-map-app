import React, { Component } from 'react';
import ListItems from './ListItems'

class searchBar extends Component {

    handleChange = (query) => {
        this.props.handleSearchChange(query)
    }
 
    render() {    

        return (
          <div id="sidebar-search" className={this.props.toggleMenu}>
          
          	<input 
          		className = "search-items"
          		type = "text"
                role = "search"
                aria-label = "enter coffee shop name"
                tabIndex="0"
          		placeholder = "Search coffee shop name..."
          		value={this.props.query}
          		onChange = {(event) => this.handleChange(event.target.value)}
          	/>
            <input 
                id="clear-list" 
                type="button" 
                value="Clear Search"
                onClick={this.props.clearQuery}
                aria-label="clear search"
                //role="button"
            />
            <div className="showing-list">

                <ol className="list" //role="list"
                >
                    {//this.props.searchedResults && 
                        this.props.locations.map(location => (
                            <ListItems
                                key = {location.id}
                                location = {location}
                                getNewName = {this.props.getNewName}
                                handleItemClick = {this.props.handleItemClick}
                                toggleMenu={this.props.toggleMenu}
                                //role="list item"
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

export default searchBar;

{/*

    //    
 //    updateQuery = (query) => {
 //        this.setState({ query: query})
 //    }
 // // handle the search text when it change
 //    handleSearchChange = (query) => {
 //        this.updateQuery(query)

 //        let searchedResults = this.showingLocations(query)
 //        this.props.updateLocation(searchedResults, query)

 //        this.setState({
 //            searchedResults: searchedResults
 //        }, () => console.log("searchedResults:",this.state.searchedResults))
        
 //    }

    //  handleSearchChange = (query) => {
    //     let results = this.showingLocations(query)
    //     this.setState({
    //         query: query,
    //         searchedResults: results
    //     })
    //     this.props.updateLocation(results, query)
    // }

    //matching text with location.name
    // showingLocations = (query) => {
    //     console.log("query:", query)
    //     console.log("location:", this.props.locations)
    //     // if(this.props.locations!==undefined && this.props.locations.length>0) {
    // //         this.props.locations.sort(sortBy('name'))  
    // //     //console.log("this.props.locationsSortBy:",this.props.locations)
    // //     } 
    //     let filterLocations =[]
        
    //     if (query) {
    //         const match = new RegExp(escapeRegExp(query), 'i')
    //         filterLocations = this.props.locations.filter((location) => match.test(location.name))
    //     } else { // if dont' have someone type
    //         filterLocations = this.props.locations
    //     }
    //         filterLocations.sort(sortBy('name'))
    //     console.log("filterLocations:",filterLocations)
    //      return filterLocations;
    // }

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

    // if(this.props.locations!==undefined && this.props.locations.length>0) {
    //         this.props.locations.sort(sortBy('name'))  
    //     //console.log("this.props.locationsSortBy:",this.props.locations)
    //     } 
    // // if(this.state.query="") {

    // let filterLocations = this.showingLocations(this.state.query)
    // }
    //let filterLocations = this.showingLocations(this.state.query)   
        // console.log("query:", this.state.query)
        // console.log("location:", this.props.locations)

        // let filterLocations =[]
        
        // if (this.state.query) {
        //     const match = new RegExp(escapeRegExp(this.state.query), 'i')
        //     filterLocations = this.props.locations.filter((location) => match.test(location.name))
        // } else { // if dont' have someone type
        //     filterLocations = this.props.locations
        // }
        // console.log("filterLocations:",filterLocations)
        


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
                searchedResults={this.state.searchedResults}
            />
            
          
          </div>
        );
    }
*/}