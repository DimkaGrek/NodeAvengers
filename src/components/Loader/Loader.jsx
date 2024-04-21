import { Circles } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loader_wrapper}>
      <Circles
        height="120"
        width="120"
        color="#ffffff"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default Loader;
