import { useEffect, useState } from 'react';

type Position = [x: number, y: number];

const calculateDistance = (pos1: Position, pos2: Position) => {
  return Math.hypot(pos1[0] - pos2[0], pos1[1] - pos2[1]);
};
const getLinearScale = (
  distance: number,
  effectDistance: number,
  minScale: number,
) => {
  return (distance / effectDistance) * (1 - minScale) + minScale;
};
const getQuadraticScale = (
  distance: number,
  effectDistance: number,
  minScale: number,
) => {
  return (distance / effectDistance) ** 2 * (1 - minScale) + minScale;
};
/* eslint-disable @typescript-eslint/no-unused-vars */
const getRootScale = (
  distance: number,
  effectDistance: number,
  minScale: number,
) => {
  return Math.sqrt(distance / effectDistance) * (1 - minScale) + minScale;
};

export type DotProps = {
  size: number;
  gridX: number;
  gridY: number;
};

function Dot(props: DotProps) {
  /** CONST */
  const { size, gridX, gridY } = props;
  // for debug
  //   const colorIn = '#CCF9FF';
  //   const colorOut = '#E6E6E6';
  const colorIn = 'hsla(345, 100%, 39%, 0.8)';
  const colorOut = 'hsla(256, 100%, 39%, 0.8)';
  const innerPortion = 0.8;
  const dotPosition: Position = [
    gridX * size + size / 2,
    gridY * size + size / 2,
  ];
  const hoverEffectDistance = 300;
  const hoverMinScale = 0.6;
  const clickEffectDistance = 150;
  const clickMinScale = 0;
  const interval = 50;
  const recoveryTime = 2;
  const [scale, setScale] = useState(1);
  const [mousePosition, setMousePosition] = useState<Position>([0, 0]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const getHoverScale = (distance: number) => {
    return getLinearScale(distance, hoverEffectDistance, hoverMinScale);
  };
  const getClickScale = (distance: number) => {
    return getQuadraticScale(distance, clickEffectDistance, clickMinScale);
  };
  const handleMousePosition = (event: MouseEvent) => {
    const currentMousePosition: Position = [event.clientX, event.clientY];
    setMousePosition(currentMousePosition);
    const distance = calculateDistance(dotPosition, currentMousePosition);

    /** @NOTE Click effect. */
    if (isMouseDown && distance <= clickEffectDistance) {
      setScale(Math.min(scale, getClickScale(distance)));

      /** @NOTE Hover effect. */
    } else if (distance <= hoverEffectDistance) {
      setScale(Math.min(scale, getHoverScale(distance)));
    }
  };
  const handleMouseDown = () => {
    setIsMouseDown(true);
  };
  const handleMouseUp = () => {
    setIsMouseDown(false);
  };
  const handleTime = () => {
    const distance = calculateDistance(dotPosition, mousePosition);

    /** @NOTE Click effect. */
    if (isMouseDown && distance <= clickEffectDistance) {
      setScale(
        Math.min(
          scale + interval / 1000 / recoveryTime,
          getClickScale(distance),
          getHoverScale(distance),
        ),
      );

      /** @NOTE Hover effect. */
    } else if (distance <= hoverEffectDistance) {
      setScale(
        Math.min(
          scale + interval / 1000 / recoveryTime,
          getHoverScale(distance),
        ),
      );

      /** @NOTE Non-effect area. */
    } else if (distance > hoverEffectDistance && scale < 1) {
      setScale(Math.min(scale + interval / 1000 / recoveryTime, 1));
    }
  };

  /** HOOK */
  useEffect(() => {
    const time = setInterval(handleTime, interval);
    window.addEventListener('mousemove', handleMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      clearInterval(time);
      window.removeEventListener('mousemove', handleMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [scale, mousePosition, isMouseDown]);

  return (
    <div
      id='dot layout'
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        id='outline'
        style={{
          width: size,
          height: size,
          position: 'absolute',
          borderRadius: '50%',
          backgroundColor: colorOut,
          scale: `${scale * innerPortion + (1 - innerPortion)}`,
        }}
        {...props}
      />
      <div
        id='dot'
        style={{
          width: size,
          height: size,
          position: 'absolute',
          borderRadius: '50%',
          backgroundColor: colorIn,
          scale: `${scale * innerPortion}`,
        }}
      />
    </div>
  );
}

export default Dot;
