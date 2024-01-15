/* eslint-disable react/no-unknown-property */
import Box from 'components/Box';
import Dot from 'components/Dot';

import 'pages/App.css';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Color } from 'three';

function App() {
  return (
    <div style={{ width: '100wh', height: '100vh' }}>
      <Canvas
        camera={{
          position: [0, 0, 10],
        }}
      >
        <ambientLight />
        <Box position={[0, 0, 0]} />
        <mesh
          name='background'
          visible
          userData={{ hello: 'hi' }} // LATER: put poem here.
          position={[0, 0, -10]}
        >
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color={new Color('hsla(0, 0%, 30%, 1)')} />
        </mesh>
        <Dot
          position={[10, 10, -10]}
          colorIn={new Color('hsla(188, 100%, 30%, 1)')}
          colorOut={new Color('hsla(30, 100%, 30%, 1)')}
        />
        {/* for debugging */}
        <OrbitControls />
        <gridHelper
          args={[200, 200]}
          position={[0, 0, -10]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <axesHelper args={[30]} />
      </Canvas>
    </div>
  );
}

export default App;
