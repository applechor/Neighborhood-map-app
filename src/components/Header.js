import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (

      	<div className="header">
      		<h1 className="header-title"
      		tabIndex="0"> Coffee Shops in Chiang Mai, Thailand </h1>
			<a 
				className="header-menu" 
				//role="navigation"
				tabIndex="0"
				aria-label={this.props.toggleMenu === "open"?"collapse side panel": "expand side panel for searching"}
				title={this.props.toggleMenu === "open"?"collapse side panel": "expand side panel"}
				onClick={this.props.onClickMenu}
				onKeyPress={this.props.onClickMenu}

			>&#9776;</a>

      		{/*<i className="material-icons" style={{lineHeight: "inherit"}}>menu</i>*/}
      </div>
    );
  }
}

export default Header;