import React, { Component } from 'react';


class ListItemsDetail extends Component {

  render() {
  	//console.log(this.props.locations)
    return (
      <li
      className = "list-item"
      onClick = {() => this.props.handleItemClick(this.props)}
      >

      {this.props.name}
    </li>

      	
      			
	      			
	      			
      			
    );
  }
}
//onClick = {this.props.handleItemClick}>
export default ListItemsDetail;