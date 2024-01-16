import { useEffect, useRef, useState } from 'react';

export type DotProps = {
  colorOut: string;
  colorIn: string;
  size: number;
  gridX: number;
  gridY: number;
};

type Pos = [x: number, y: number];

function Dot(props: DotProps) {
  /** CONST */
  const { colorOut, colorIn, size, gridX, gridY } = props;
  const effectDistance = 200;
  const calculateDistance = (pos1: Pos, pos2: Pos) => {
    return Math.sqrt((pos1[0] - pos2[0]) ** 2 + (pos1[1] - pos2[1]) ** 2);
  };
  const myRef = useRef<HTMLDivElement | null>(null);
  const getElemPosition: () => Pos = () => {
    return [gridX * size + size / 2, gridY * size + size / 2];
  };
  const [scale, setScale] = useState(1);
  const handleScale = (event: MouseEvent) => {
    const mousePos: Pos = [event.clientX, event.clientY];
    const elemPos: Pos = getElemPosition();
    // console.log(elemPos);
    const distance = calculateDistance(mousePos, elemPos);
    setScale(distance > effectDistance ? 1 : distance / effectDistance);
  };

  /** HOOK */
  useEffect(() => {
    myRef.current = document.getElementById('dot layout') as HTMLDivElement;
    window.addEventListener('mousemove', handleScale);
    return () => {
      window.removeEventListener('mousemove', handleScale);
    };
  }, []);

  return (
    <div
      id='dot layout'
      style={{
        width: `${size}px`,
        height: `${size}px`,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        id='outline'
        style={{
          width: `${size}px`,
          height: `${size}px`,
          position: 'absolute',
          borderRadius: '50%',
          backgroundColor: colorOut,
          scale: `${scale * 0.8 + 0.2}`,
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
          scale: `${scale * 0.8}`,
        }}
      />
    </div>
  );
}

export default Dot;
