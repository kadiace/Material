import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

/** temp */
function Loader() {
  const result = useLoader(GLTFLoader, '');
  return <primitive object={result} />;
}

export default Loader;
