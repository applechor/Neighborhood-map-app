import React, { Component } from 'react';


class ListItems extends Component {

	handleItemClick = (event, location) => {

		//this.props.handleItemClick(event, location)
	console.log("location:",location)
	console.log("event:",event)
	//console.log("index:",index)
	}
  render() {
  	//console.log(this.props.locations)
    return (
      <div className="showing-list">

      	<ol className="list">
      		{this.props.locations.map(location => (
      			<li 
	      			key = {location.id} 
	      			className = "list-item"
	      			id = {location.id} 
	      			tabIndex = {0}
	      			aria-label = {this.props.getNewName(location.name)}
	      			onClick = {() => this.props.handleItemClick(location)}>
	      			
      				{this.props.getNewName(location.name)}
      			</li>

      		))}
      	</ol>
      </div>
    );
  }
}
//onClick = {this.props.handleItemClick}>
export default ListItems;