/**
 * Hook permettant d'avoir accès à la taille de la fenêtre.
 */

import { useState, useEffect } from 'react';

function getDimensions() {

  const { innerWidth: width, innerHeight: height } = window;

  return {
    window: {
      w: width,
      h: height,
    },
    neck: {
      w: 1200,
      h: 200
    },
    scale: width <= 1400 ? 0.8 : 1,
  };
}

export default function useWindowDimensions() {

  const [dimensions, setDimensions] = useState(getDimensions());

  useEffect(() => {
    function handleResize() {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
}