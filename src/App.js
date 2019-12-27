import React from 'react';

import Slider from './slider';

const IMAGE_DATA = [
  <img src={require('./media/images/demo1.jpg')} alt="images-1" />,
  <img src={require('./media/images/demo2.jpg')} alt="images-2" />,
  <img src={require('./media/images/demo3.jpg')} alt="images-3" />
];

const App = () => {
  return (
    <Slider
      items={IMAGE_DATA}
      speed={1}
      delay={2}
      pause={false}
      autoplay={true}
      dots={true}
      arrows={true}
    />
  );
}

export default App;
