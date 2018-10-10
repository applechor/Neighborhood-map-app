import React, { Component } from 'react';
//import ListItemsDetail from './ListItemsDetail'


class ListItems extends Component {

	
  render() {
  	//console.log(this.props.locations)
    return (
      <div className="showing-list">

      	<ol className="list">
      		{this.props.locations && 
      			this.props.locations.map(location => (
      			<li 
	      			key = {location.id} 
	      			className = "list-item"
	      			id = {location.id} 
	      			tabIndex = {0}
	      			aria-label = {this.props.getNewName(location.name)}
     			//onClick = {(props, e) => this.props.handleItemClick(props, location.id, e)}>
onClick = {(event) => this.props.handleItemClick(event, location.id)}>

	      			
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



{/*
	 <div className="showing-list">

      	<ol className="list">
      		{this.props.locations && 
      			this.props.locations.map(location => (
      				<ListItemsDetail 
      				key = {location.id} 
	      			className = "list-item"
	      			id = {location.id} 
	      			tabIndex = {0}
	      			aria-label = {this.props.getNewName(location.name)}
	      			onClick = {(props, location, e) => this.props.handleItemClick(this.props, location, e)}
	      			getNewName = {this.props.getNewName}
	      			locations = {this.props.locations}
	      			/>
      				

      		))}
      	</ol>
      </div>




<div className="showing-list">

      	<ol className="list">
      		{this.props.locations && 
      			this.props.locations.map(location => (
      			<li 
	      			key = {location.id} 
	      			className = "list-item"
	      			id = {location.id} 
	      			tabIndex = {0}
	      			aria-label = {this.props.getNewName(location.name)}
	      			onClick = {(props, location, e) => this.props.handleItemClick(this.props, location, e)}>
	      			
      				{this.props.getNewName(location.name)}
      			</li>

      		))}
      	</ol>
      </div>


  <div className="showing-list">

      	<ol className="list">
      		{this.props.locations && 
      			this.props.locations.map(location => (
      				<ListItemsDetail 
	      				key = {location.id}
		      			
		      			handleItemClick = {this.props.handleItemClick}
		      			locations = {this.props.locations}
	      			/>
      				

      		))}
      	</ol>
      </div>*/}