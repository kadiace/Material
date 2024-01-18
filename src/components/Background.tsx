import { useEffect, useState } from 'react';

import Dot from './Dot';

function Background() {
  /** CONST */
  const size = 40;
  const [gridSize, setGridSize] = useState([
    Math.ceil(window.innerWidth / size),
    Math.ceil(window.innerHeight / size),
  ]);
  const handleGridResize = () => {
    setGridSize([
      Math.ceil(window.innerWidth / size),
      Math.ceil(window.innerHeight / size),
    ]);
  };

  /** HOOK */
  useEffect(() => {
    window.addEventListener('resize', handleGridResize);

    return () => {
      window.removeEventListener('resize', handleGridResize);
    };
  });

  return (
    <div
      id='background'
      draggable='false'
      style={{
        position: 'absolute',
        display: 'grid',
        width: '100%',
        height: '100%',
        gridTemplateColumns: `repeat(${gridSize[0]}, ${size}px)`,
        gridTemplateRows: `repeat(${gridSize[1]}, ${size}px)`,
        pointerEvents: 'none',
      }}
    >
      {Array(gridSize[0] * gridSize[1])
        .fill(0)
        .map((value, index) => (
          <Dot
            key={index}
            size={size}
            gridX={index % gridSize[0]}
            gridY={Math.floor(index / gridSize[0])}
          />
        ))}
    </div>
  );
}

export default Background;
