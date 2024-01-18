/* eslint-disable react/no-unknown-property */
import Background from 'components/Background';

// import Canvas from 'components/Canvas';
import 'pages/App.css';

function App() {
  return (
    <div
      id='root'
      draggable='false'
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <Background />
      {/* <Canvas /> */}
    </div>
  );
}

export default App;
