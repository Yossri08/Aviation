import React from 'react';
import BackgroundSlider from 'react-background-slider';

 const images = ['/images/mpo.png','/images/o.jpg'];

const App = () => {
  return (
    <BackgroundSlider
      images={images}
      duration={3} // Durée de chaque image en secondes
      transition={1} // Durée de transition entre les images
    />
  );
};

export default App;
