/* eslint-disable react/no-unknown-property */
import { Color, MeshProps } from '@react-three/fiber';

type DotProps = MeshProps & { colorOut: Color; colorIn: Color };

function Dot(props: DotProps) {
  const { colorOut, colorIn } = props;
  // Scale hook
  return (
    <group>
      <mesh {...props}>
        <ringGeometry args={[0.45, 0.5, 100]} />
        <meshStandardMaterial color={colorOut} />
      </mesh>
      <mesh {...props}>
        <ringGeometry args={[0, 0.45, 100]} />
        <meshStandardMaterial color={colorIn} />
      </mesh>
    </group>
  );
}

export default Dot;
