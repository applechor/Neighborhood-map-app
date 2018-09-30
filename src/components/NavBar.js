import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <div className="navbar" role="navigation">
      <h1 className="header-title"> Islands in Thailand </h1>
<a class="header_menu">&#9776;</a>
      {/*<i className="material-icons" style={{lineHeight: "inherit"}}>menu</i>*/}
      </div>
    );
  }
}

export default NavBar;