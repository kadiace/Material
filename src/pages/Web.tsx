import Background from 'components/Background';

function Web() {
  return (
    <div
      id='web'
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        id='material div'
        style={{
          width: 'auto',
          height: '90%',
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
          width: 'fit-content',
          height: '90%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          justifyContent: 'center',
          marginTop: '5%',
          marginBottom: '5%',
          marginRight: '5%',
        }}
      >
        <div
          style={{
            borderLeft: '10px solid #000466',
            width: '0px',
            height: '90%',
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
            writingMode: 'vertical-rl',
          }}
        >
          <span
            style={{
              fontFamily: 'ZenAntique',
              fontSize: '5em',
              color: '#000466',
            }}
          >
            物質
          </span>
        </div>
      </div>
    </div>
  );
}

export default Web;
