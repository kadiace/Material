import { useLayoutEffect, useRef, useState } from 'react';

import Dot from './Dot';

function Background() {
  /** CONST */
  const myRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth / window.innerHeight < 5 / 7;
  const [dotSize, setDotSize] = useState<number>(0);
  const [gridSize, setGridSize] = useState([15, 21]);
  const [left, setLeft] = useState<number>(0);
  const [top, setTop] = useState<number>(0);

  const handleResize = (elem: HTMLElement) => () => {
    const {
      width,
      height,
      left: newLeft,
      top: newTop,
    } = elem.getBoundingClientRect();
    const newDotSize = isMobile ? width / 15 : height / 21;
    const newGridSize = isMobile
      ? [15, Math.min(30, Math.floor(height / newDotSize))]
      : [Math.min(30, Math.floor(width / newDotSize)), 21];
    setLeft(newLeft + (width - newDotSize * newGridSize[0]) / 2);
    setTop(newTop + (height - newDotSize * newGridSize[1]) / 2);
    setDotSize(newDotSize);
    setGridSize(newGridSize);
  };

  /** HOOK */
  useLayoutEffect(() => {
    const elem = myRef.current;
    if (elem) {
      handleResize(elem)();
      window.addEventListener('resize', handleResize(elem));
      return () => {
        window.removeEventListener('resize', handleResize(elem));
      };
    }
    return () => {};
  }, []);

  return (
    <div
      id='background'
      ref={myRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize[0]}, ${dotSize}px)`,
          gridTemplateRows: `repeat(${gridSize[1]}, ${dotSize}px)`,
        }}
      >
        {Array(gridSize[0] * gridSize[1])
          .fill(0)
          .map((value, index) => (
            <Dot
              key={index}
              size={dotSize}
              position={[
                left + (index % gridSize[0]) * dotSize + dotSize / 2,
                top + Math.floor(index / gridSize[0]) * dotSize + dotSize / 2,
              ]}
            />
          ))}
      </div>
    </div>
  );
}

export default Background;
