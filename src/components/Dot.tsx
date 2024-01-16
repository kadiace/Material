import { PropsWithChildren, useState } from 'react';

export type DotProps = PropsWithChildren & {
  colorOut: string;
  colorIn: string;
  size: string;
};

function Dot(props: DotProps) {
  /** CONST */
  const { colorOut, colorIn, size } = props;

  /** STATE */
  const [scale, setScale] = useState(0);
  return (
    <div
      id='dot layout'
      style={{
        width: size,
        height: size,
        display: 'flex',
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
