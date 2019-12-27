import React, { Component } from 'react';
import SliderItem from './SliderItem';
import SliderDots from './SliderDots';
import SliderArrows from './SliderArrows';

import './index.css';

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowLocal: 0,
    };
  }

  // 向前向后多少
  turn(n) {
    var _n = this.state.nowLocal + n;
    if (_n < 0) {
      _n = _n + this.props.items.length;
    }
    if (_n >= this.props.items.length) {
      _n = _n - this.props.items.length;
    }
    this.setState({ nowLocal: _n });
  }

  // 开始自动轮播
  goPlay() {
    const { autoplay, delay } = this.props;
    if (autoplay) {
      if (typeof delay === 'number') {
        this.autoPlayFlag = setInterval(() => {
          this.turn(1);
        }, delay * 1000);
      } else if (typeof delay === 'object') {
        let count = 0;
        let sw = 0;
        let currentMii = delay[sw];
        this.autoPlayFlag = setInterval(() => {
          if (count >= currentMii) {
            sw++;
            if (sw === delay.length) { sw = 0 };
            this.turn(1);
            currentMii = delay[sw];
            count = 0;
          }
          count++;
        }, 1000);
      }
    }
  }

  // 暂停自动轮播
  pausePlay() {
    clearInterval(this.autoPlayFlag);
  }

  componentDidMount() {
    this.goPlay();
  }

  arrayEquals(arr1, arr2) {
    if (!arr2) return false;
    if (arr1.length !== arr2.length) return false;
    for (let i = 0, l = arr1.length; i < l; i++) {
      if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
        if (!arr1[i].equals(arr2[i])) return false;
      } else if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {// props更新，重新跑切换定时器
    const prevDelay = prevProps.delay;
    const thisDelay = this.props.delay;
    if (!this.arrayEquals(prevDelay, thisDelay)) {
      clearInterval(this.autoPlayFlag);
      this.goPlay();
    }
  }

  componentWillUnmount() {
    clearInterval(this.autoPlayFlag)
  }

  render() {
    let count = this.props.items.length;

    let itemNodes = this.props.items.map((item, idx) => {
      return <SliderItem count={count} key={'item' + idx}>{item}</SliderItem>;
    });

    let arrowsNode = <SliderArrows turn={this.turn.bind(this)} />;

    let dotsNode = <SliderDots turn={this.turn.bind(this)} count={count} nowLocal={this.state.nowLocal} />;

    return (
      <div
        className="slider"
        onMouseOver={this.props.pause ? this.pausePlay.bind(this) : null} onMouseOut={this.props.pause ? this.goPlay.bind(this) : null}>
        <ul style={{
          left: -100 * this.state.nowLocal + "%",
          transitionDuration: this.props.speed + "s",
          width: this.props.items.length * 100 + "%"
        }}>
          {itemNodes}
        </ul>
        {this.props.arrows ? arrowsNode : null}
        {this.props.dots ? dotsNode : null}
      </div>
    );
  }
}

Slider.defaultProps = {
  speed: 1,
  delay: 2,
  pause: true,
  autoplay: true,
  dots: true,
  arrows: true,
  items: [],
};
Slider.autoPlayFlag = null;
