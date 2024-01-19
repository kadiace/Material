import { useEffect, useState } from 'react';

type Position = [x: number, y: number];

const calculateDistance = (pos1: Position, pos2: Position) => {
  return Math.hypot(pos1[0] - pos2[0], pos1[1] - pos2[1]);
};
const getLinearScale = (
  distance: number,
  effectDistance: number,
  minScale: number,
  maxScale: number,
) => {
  return (distance / effectDistance) * (maxScale - minScale) + minScale;
};
const getQuadraticScale = (
  distance: number,
  effectDistance: number,
  minScale: number,
  maxScale: number,
) => {
  return (distance / effectDistance) ** 2 * (maxScale - minScale) + minScale;
};
// const getRootScale = (
//   distance: number,
//   effectDistance: number,
//   minScale: number,
//   maxScale: number,
// ) => {
//   return (
//     Math.sqrt(distance / effectDistance) * (maxScale - minScale) + minScale
//   );
// };

export type DotProps = {
  size: number;
  gridX: number;
  gridY: number;
};

function Dot(props: DotProps) {
  /** CONST */
  const { size, gridX, gridY } = props;
  const colorIn = 'hsla(256, 100%, 40%, 0.8)';
  const colorOut = 'hsla(61, 100%, 40%, 0.8)';
  const innerPortion = 0.8;
  const dotPosition: Position = [
    gridX * size + size / 2,
    gridY * size + size / 2,
  ];
  const defaultScale = 1;
  const hoverEffectDistance = size * 8;
  const hoverMinScale = 0.6;
  const clickEffectDistance = size * 3;
  const clickMinScale = 0;
  const clickMaxScale =
    hoverMinScale +
    ((1 - hoverMinScale) * clickEffectDistance) / hoverEffectDistance;
  const interval = 10;
  const recoverRatio = 1 / 20;
  const shrinkRatio = 1 / 4;

  /** STATE */
  const [scale, setScale] = useState(defaultScale);
  const [distance, setDistance] = useState<number>(Number.POSITIVE_INFINITY);
  const [isMouseDown, setIsMouseDown] = useState(false);

  /** LAMBDA FUNCTION */
  const getHoverScale = () => {
    return getLinearScale(
      distance,
      hoverEffectDistance,
      hoverMinScale,
      defaultScale,
    );
  };
  const getClickScale = () => {
    return getQuadraticScale(
      distance,
      clickEffectDistance,
      clickMinScale,
      clickMaxScale,
    );
  };
  const getTargetScale = () => {
    /** @NOTE Click effect. */
    if (isMouseDown && distance <= clickEffectDistance) {
      return getClickScale();
    }
    /** @NOTE Hover effect. */
    if (distance <= hoverEffectDistance) {
      return getHoverScale();
    }
    /** @NOTE Non-effect area. */
    return 1;
  };
  const changeTouchDistance = (event: TouchEvent) => {
    const distances: number[] = [];
    for (let i = 0; i < event.touches.length; i += 1) {
      const touchPosition: Position = [
        event.touches[i].clientX,
        event.touches[i].clientY,
      ];
      distances.push(calculateDistance(dotPosition, touchPosition));
    }
    setDistance(Math.min(...distances));
  };

  /** INTERVAL EVENT HANDLER */
  const handleInterval = () => {
    const target = getTargetScale();
    const diff = target - scale;
    if (diff !== 0) {
      const ratio = diff > 0 ? diff * recoverRatio : diff * shrinkRatio;
      setScale(Math.abs(ratio) < 1e-4 ? target : scale + ratio);
    }
  };

  /** MOUSE EVENT HANDLER */
  const handleMouseMove = (event: MouseEvent) => {
    const mousePosition: Position = [event.clientX, event.clientY];
    const currentDistance = calculateDistance(dotPosition, mousePosition);
    setDistance(currentDistance);

    const target = getTargetScale();
    const diff = target - scale;
    if (diff < 0) {
      const ratio = diff * shrinkRatio;
      setScale(Math.abs(ratio) < 1e-4 ? target : scale + ratio);
    }
  };
  const handleMouseDown = () => {
    setIsMouseDown(true);
  };
  const handleMouseUp = () => {
    setIsMouseDown(false);
  };
  const handleMouseOut = () => {
    setDistance(Number.POSITIVE_INFINITY);
  };

  /** TOUCH EVENT HANDLER */
  const handleTouchMove = (event: TouchEvent) => {
    changeTouchDistance(event);

    const target = getTargetScale();
    const diff = target - scale;
    if (diff < 0) {
      const ratio = diff * shrinkRatio;
      setScale(Math.abs(ratio) < 1e-4 ? target : scale + ratio);
    }
  };
  const handleTouchStart = (event: TouchEvent) => {
    changeTouchDistance(event);
    setIsMouseDown(true);
  };
  const handleTouchEnd = (event: TouchEvent) => {
    if (event.touches.length === 0) {
      setDistance(Number.POSITIVE_INFINITY);
      setIsMouseDown(false);
    } else {
      changeTouchDistance(event);
    }
  };

  /** HOOK */
  useEffect(() => {
    const time = setInterval(handleInterval, interval);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      clearInterval(time);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
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
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        userSelect: 'none',
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
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
          userSelect: 'none',
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
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
          userSelect: 'none',
        }}
      />
    </div>
  );
}

export default Dot;
