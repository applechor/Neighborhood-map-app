import React, { Component } from 'react';

class Header extends Component {
  render() {
  	const {toggleMenu, onClickMenu} = this.props

    return (
      	<div className="header" role="banner">
      		<h1 
      			className="header-title"
      			tabIndex="0"> Coffee Shops in Chiang Mai, Thailand </h1>
			<a 
				className="header-menu" 
				tabIndex="0"
				aria-label={toggleMenu==="open"?"collapse side panel when do not want search":"expand side panel for searching"}
				title={toggleMenu==="open"?"collapse side panel":"expand side panel"}
				onClick={onClickMenu}
				onKeyPress={onClickMenu}
			>&#9776;</a>
      	</div>
    );
  }
}

export default Header;