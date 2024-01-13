import Box from 'components/Box';

import 'pages/App.css';

import { Canvas } from '@react-three/fiber';

function App() {
  return (
    <div style={{ width: '50vw', height: '50vh' }}>
      <Canvas
        camera={{
          position: [0, 0, 10],
        }}
      >
        <ambientLight />
        <Box position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
