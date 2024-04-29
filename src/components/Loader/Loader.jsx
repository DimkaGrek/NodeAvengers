import { Circles } from 'react-loader-spinner';

import s from './Loader.module.css';

export const Loader = ({ size, classTitle }) => {
  return (
    <div
      className={
        classTitle === 'insideButton' ? s.loaderWrapper : s.loader_wrapper
      }
    >
      <Circles
        height={size}
        width={size}
        color="#ffffff"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};
