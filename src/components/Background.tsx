import Dot, { DotProps } from './Dot';

function Background() {
  const colorIn = '#CCF9FF';
  const colorOut = '#E6E6E6';
  const size = '40px';
  const dotList: DotProps[] = [];
  for (let i = 0; i < 3000; i += 1) {
    dotList.push({ colorIn, colorOut, size });
  }
  return (
    <div
      id='background'
      style={{
        display: 'grid',
        width: '100%',
        height: '100%',
        gridTemplateColumns: `repeat(auto-fill, ${size})`,
        gridTemplateRows: `repeat(auto-fill, ${size})`,
      }}
    >
      {dotList.map((elem, index) => (
        <Dot key={index} {...elem} />
      ))}
    </div>
  );
}

export default Background;
