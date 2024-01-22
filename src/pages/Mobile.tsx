import Background from 'components/Background';

import { useEffect } from 'react';

function Mobile() {
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
      id='mobile'
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        id='material div'
        style={{
          width: '90%',
          height: 'auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '5%',
        }}
      >
        <Background />
      </div>
      <div
        id='title div'
        style={{
          width: '90%',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
          justifyContent: 'center',
          marginBottom: '5%',
          marginLeft: '5%',
          marginRight: '5%',
        }}
      >
        <div
          style={{
            borderTop: '10px solid #000466',
            width: '90%',
            height: '0px',
            position: 'absolute',
          }}
        />
        <div
          style={{
            width: 'fit-content',
            height: 'fit-content',
            backgroundColor: '#ffffff',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'ZenAntique',
              fontSize: '4em',
              color: '#000466',
              writingMode: 'sideways-lr',
            }}
          >
            物質
          </span>
        </div>
      </div>
    </div>
  );
}

export default Mobile;
