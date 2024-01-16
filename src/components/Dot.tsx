import { PropsWithChildren } from 'react';

export type DotProps = PropsWithChildren & {
  colorOut: string;
  colorIn: string;
  size: string;
};

function Dot(props: DotProps) {
  const { colorOut, colorIn, size } = props;
  // Scale hook
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
