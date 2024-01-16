/* eslint-disable react/no-unknown-property */

export type DotProps = JSX.Element & { colorOut: string; colorIn: string };

function Dot(props: DotProps) {
  const { colorOut, colorIn } = props;
  // Scale hook
  return (
    <div
      id='background test'
      style={{
        position: 'absolute',
        width: '1000px',
        height: '1000px',
        borderRadius: '50%',
        backgroundColor: colorOut,
      }}
      {...props}
    />
  );
}

export default Dot;
