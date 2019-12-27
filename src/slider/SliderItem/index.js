import React, { Component } from 'react';

export default class SliderItem extends Component {
  render() {
    let { count } = this.props;
    let width = 100 / count + '%';
    return (
      <li className="slider-item" style={{width: width}}>
        {this.props.children}
      </li>
    );
  }
}
