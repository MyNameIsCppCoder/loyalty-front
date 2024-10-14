import React, { Component } from 'react';

class NavbarLanding extends Component {
  render() {
    return (
      <div className={'flex justify-between gap-3 px-5 py-7'}>
        <li className="text-blue-50">Начало</li>
        <li className="text-blue-50">Возможности</li>
        <li className="text-blue-50">Начало</li>
      </div>
    );
  }
}

export default NavbarLanding;