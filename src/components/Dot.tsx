import { useEffect, useState } from 'react';
import {
  DotProps,
  Position,
  calculateDistance,
  getExponentialScale,
  getLogScale,
  useEventTimeout,
} from 'utils';

function Dot(props: DotProps) {
  /** CONST */
  const { size, position } = props;
  const colorIn = 'hsla(51, 100%, 94%, 1)';
  const colorOut1 = 'hsla(238, 100%, 20%, 1)';
  const colorOut2 = 'hsla(339, 73%, 45%, 1)';
  const innerPortion = 0.7;
  const defaultScale = 1;
  const hoverEffectDistance = size * 4;
  const hoverMinScale = 0.8;
  const clickEffectDistance = size * 2;
  const clickMinScale = 0;
  const clickMaxScale =
    hoverMinScale +
    ((1 - hoverMinScale) * clickEffectDistance) / hoverEffectDistance;
  const epsilon = 1e-3;
  const interval = 50;
  const recoverRatio = 1 / 10;
  const shrinkRatio = 1 / 4;

  /** STATE */
  const [scale, setScale] = useState(defaultScale);
  const [distance, setDistance] = useState<number>(Number.POSITIVE_INFINITY);
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isPause, setIsPause] = useState(false);

  /** LAMBDA FUNCTION */
  const getHoverScale = () => {
    return getLogScale(
      distance,
      hoverEffectDistance,
      hoverMinScale,
      defaultScale,
      Math.E,
    );
  };
  const getClickScale = () => {
    return getExponentialScale(
      distance,
      clickEffectDistance,
      clickMinScale,
      clickMaxScale,
      Math.E,
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
    return defaultScale;
  };
  const changeTouchDistance = (event: TouchEvent) => {
    const distances: number[] = [];
    for (let i = 0; i < event.touches.length; i += 1) {
      const touchPosition: Position = [
        event.touches[i].clientX,
        event.touches[i].clientY,
      ];
      distances.push(calculateDistance(position, touchPosition));
    }
    setDistance(Math.min(...distances));
  };

  /** INTERVAL EVENT HANDLER */
  const handleInterval = () => {
    const target = getTargetScale();
    const diff = target - scale;
    if (diff > 0 && isPause) {
      const ratio = diff * recoverRatio;
      setScale(Math.abs(ratio) < epsilon ? target : scale + ratio);
    }
    if (diff < 0) {
      const ratio = diff * shrinkRatio;
      setScale(Math.abs(ratio) < epsilon ? target : scale + ratio);
    }
  };

  /** MOUSE EVENT HANDLER */
  const handleMouseMove = (event: MouseEvent) => {
    setIsPause((prev: boolean) => false);
    const mousePosition: Position = [event.clientX, event.clientY];
    const currentDistance = calculateDistance(position, mousePosition);
    setDistance(currentDistance);

    const target = getTargetScale();
    const diff = target - scale;
    if (diff < 0) {
      const ratio = diff * shrinkRatio;
      setScale(Math.abs(ratio) < epsilon ? target : scale + ratio);
    }
  };
  const handleMouseDown = () => {
    setIsMouseDown((prev: boolean) => true);
  };
  const handleMouseUp = () => {
    setIsMouseDown((prev: boolean) => false);
  };
  const handleMouseOut = () => {
    setIsPause((prev: boolean) => true);
    setDistance(Number.POSITIVE_INFINITY);
  };

  /** TOUCH EVENT HANDLER */
  const handleTouchMove = (event: TouchEvent) => {
    setIsPause((prev: boolean) => false);
    changeTouchDistance(event);

    const target = getTargetScale();
    const diff = target - scale;
    if (diff < 0) {
      const ratio = diff * shrinkRatio;
      setScale(Math.abs(ratio) < epsilon ? target : scale + ratio);
    }
  };
  const handleTouchStart = (event: TouchEvent) => {
    changeTouchDistance(event);
    setIsMouseDown((prev: boolean) => true);
  };
  const handleTouchEnd = (event: TouchEvent) => {
    if (event.touches.length === 0) {
      setDistance(Number.POSITIVE_INFINITY);
      setIsMouseDown((prev: boolean) => false);
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
  }, [scale, distance, isMouseDown, isPause]);
  useEventTimeout(
    () => {
      setIsPause((prev: boolean) => true);
    },
    [
      'mousemove',
      'mousedown',
      'mouseup',
      'mouseout',
      'touchmove',
      'touchstart',
      'touchend',
    ],
    3 * 1000,
  );

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
          borderRadius: '30%',
          backgroundImage: `linear-gradient(135deg, ${colorOut1} 80%, ${colorOut2})`,
          scale: `${scale * innerPortion + (1 - innerPortion)}`,
        }}
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
        }}
      />
    </div>
  );
}

export default Dot;
