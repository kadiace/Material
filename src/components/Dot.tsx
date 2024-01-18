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
  const colorIn = 'hsla(256, 100%, 40%, 0.8)';
  const colorOut = 'hsla(61, 100%, 40%, 0.8)';
  const innerPortion = 0.8;
  const dotPosition: Position = [
    gridX * size + size / 2,
    gridY * size + size / 2,
  ];
  const hoverEffectDistance = size * 5;
  const hoverMinScale = 0.6;
  const clickEffectDistance = size * 2;
  const clickMinScale = 0;
  const interval = 50;
  const [scale, setScale] = useState(1);
  const [distance, setDistance] = useState<number>(Number.POSITIVE_INFINITY);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const getHoverScale = (currentDistance: number) => {
    return getLinearScale(currentDistance, hoverEffectDistance, hoverMinScale);
  };
  const getClickScale = (currentDistance: number) => {
    return getQuadraticScale(
      currentDistance,
      clickEffectDistance,
      clickMinScale,
    );
  };
  const handleMousePosition = (event: MouseEvent) => {
    const mousePosition: Position = [event.clientX, event.clientY];
    const currentDistance = calculateDistance(dotPosition, mousePosition);
    setDistance(currentDistance);

    /** @NOTE Click effect. */
    if (isMouseDown && distance <= clickEffectDistance) {
      setScale(
        Math.min(scale, getClickScale(distance), getHoverScale(distance)),
      );

      /** @NOTE Hover effect. */
    } else if (distance <= hoverEffectDistance) {
      setScale(Math.min(scale, getHoverScale(distance)));
    }
  };
  const handleMouseDown = (event: MouseEvent) => {
    setIsMouseDown(true);
  };
  const handleMouseUp = (event: MouseEvent) => {
    setIsMouseDown(false);
  };
  const handleTime = () => {
    /** @NOTE Click effect. */
    if (isMouseDown && distance <= clickEffectDistance) {
      const target = Math.min(getClickScale(distance), getHoverScale(distance));
      if (target > scale) {
        setScale(target - (target - scale) * (19 / 20));
      } else {
        setScale(target + (scale - target) * (1 / 4));
      }

      /** @NOTE Hover effect. */
    } else if (distance <= hoverEffectDistance) {
      const target = getHoverScale(distance);
      if (target > scale) {
        setScale(target - (target - scale) * (19 / 20));
      } else {
        setScale(target + (scale - target) / 4);
      }

      /** @NOTE Non-effect area. */
    } else if (distance > hoverEffectDistance && scale < 1) {
      const target = 1;
      setScale(target - (target - scale) * (19 / 20));
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
  }, [scale, distance, isMouseDown]);

  return (
    <div
      id='dot layout'
      draggable='false'
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        id='outline'
        draggable='false'
        style={{
          width: size,
          height: size,
          position: 'absolute',
          borderRadius: '50%',
          backgroundColor: colorOut,
          scale: `${scale * innerPortion + (1 - innerPortion)}`,
          pointerEvents: 'none',
        }}
        {...props}
      />
      <div
        id='dot'
        draggable='false'
        style={{
          width: size,
          height: size,
          position: 'absolute',
          borderRadius: '50%',
          backgroundColor: colorIn,
          scale: `${scale * innerPortion}`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export default Dot;
