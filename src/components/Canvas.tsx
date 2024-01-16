/* eslint-disable react/no-unknown-property */
import Box from 'components/Box';

import 'pages/App.css';

// import { OrbitControls } from '@react-three/drei';
import { Canvas as Canv } from '@react-three/fiber';

function Canvas() {
  return (
    <div
      id='canvas'
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}
    >
      <Canv
        camera={{
          position: [4, -2, 3],
        }}
      >
        <ambientLight />
        <Box position={[0, 0, 0]} />
        {/* for debugging */}
        {/* <OrbitControls />
        <gridHelper
          args={[200, 200]}
          position={[0, 0, -0.01]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <axesHelper args={[30]} /> */}

        <group>
          <mesh position={[1, 2, 0]}>
            <ringGeometry args={[0.45, 0.5, 100]} />
            <meshStandardMaterial color='hsla(30, 100%, 30%, 1)' />
          </mesh>
          <mesh position={[1, 2, 0]}>
            <ringGeometry args={[0, 0.45, 100]} />
            <meshStandardMaterial color='hsla(188, 100%, 30%, 1)' />
          </mesh>
        </group>
      </Canv>
    </div>
  );
}

export default Canvas;
