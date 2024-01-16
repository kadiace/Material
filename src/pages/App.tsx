/* eslint-disable react/no-unknown-property */
import Canvas from 'components/Canvas';

import 'pages/App.css';

function App() {
  return (
    <div
      id='root'
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        id='background test'
        style={{
          position: 'absolute',
          width: '1000px',
          height: '1000px',
          borderRadius: '50%',
          backgroundColor: 'black',
        }}
      />
      <Canvas />
    </div>
  );
}

export default App;
