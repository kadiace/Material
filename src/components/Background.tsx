import { useEffect, useState } from 'react';

import Dot from './Dot';

function Background() {
  /** CONST */
  const size = 40;
  const [gridSize, setGridSize] = useState([
    Math.floor(window.innerWidth / size) + 1,
    Math.floor(window.innerHeight / size) + 1,
  ]);
  const handleGridResize = () => {
    setGridSize([
      Math.floor(window.innerWidth / size) + 1,
      Math.floor(window.innerHeight / size) + 1,
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
      style={{
        position: 'absolute',
        display: 'grid',
        width: '100%',
        height: '100%',
        gridTemplateColumns: `repeat(${gridSize[0]}, ${size}px)`,
        gridTemplateRows: `repeat(${gridSize[1]}, ${size}px)`,
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
