import React, { Component } from 'react';
//import ListItemsDetail from './ListItemsDetail'


class ListItems extends Component {

	
  render() {
    return (    
		<li 
			className = "list-item"
			id = {this.props.location.id} 
			tabIndex = {0}
			aria-label = {this.props.getNewName(this.props.location.name)}
			onClick = {this.props.handleItemClick.bind(this,this.props.location.id)}
			//onKeyPress = {this.props.handleKeyPress}
		>
			{this.props.getNewName(this.props.location.name)}
		</li>

    );
  }
}
export default ListItems;



{/*
	<div className="showing-list">

      	<ol className="list">
      		{//this.props.searchedResults && 
      			this.props.locations.map(location => (
      			<li 
	      			key = {location.id} 
	      			className = "list-item"
	      			id = {location.id} 
	      			tabIndex = {0}
	      			aria-label = {this.props.getNewName(location.name)}
     			//onClick = {(props, e) => this.props.handleItemClick(props, location.id, e)}>
					onClick = {this.props.handleItemClick.bind(this,location.id)}>

	      			
      				{this.props.getNewName(location.name)}
      			</li>

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