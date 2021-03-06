import React, { Component } from 'react';

class ListItems extends Component {
	render() {
		const {toggleMenu, location, getNewName, handleItemClick} =this.props
	    return (    
			<li 
				className="list-item"
				id={location.id} 
				tabIndex={toggleMenu==="open"?"0":"-1"}
				aria-label={getNewName(location.name)}
				onClick={handleItemClick.bind(this,location.id)}
				onKeyPress={handleItemClick.bind(this,location.id)}
			>
				{getNewName(location.name)}
			</li>

	    );
	  }
	}
export default ListItems;