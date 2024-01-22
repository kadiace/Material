import 'pages/App.css';
import Mobile from 'pages/Mobile';
import Web from 'pages/Web';

import { useEffect, useState } from 'react';

function App() {
  const [ratio, setRatio] = useState(window.innerWidth / window.innerHeight);
  const handleResize = () => {
    setRatio(window.innerWidth / window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div
      id='root'
      draggable='false'
      style={{
        pointerEvents: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        userSelect: 'none',
      }}
    >
      {ratio < 5 / 7 ? <Mobile /> : <Web />}
    </div>
  );
}

export default App;
