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
  const [scale, setScale] = useState(1);
  return (
    <div
      id='outline'
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: colorOut,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        scale: `${scale}`,
      }}
      {...props}
    >
      <div
        id='dot'
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: colorIn,
          scale: '0.9',
        }}
      />
    </div>
  );
}

export default Dot;
