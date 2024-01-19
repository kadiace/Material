/* eslint-disable react/no-unknown-property */
import Background from 'components/Background';

// import Canvas from 'components/Canvas';
import 'pages/App.css';

import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.addEventListener(
      'touchmove',
      (event: TouchEvent) => {
        event.preventDefault();
      },
      { passive: false },
    );
  }, []);
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
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        userSelect: 'none',
      }}
    >
      <Background />
      {/* <Canvas /> */}
    </div>
  );
}

export default App;
