import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/slice';
import { selectCurrentBoard } from '../../redux/boards/boardsSlice';
import { getImages } from '../../helpers';
import { getBgUrls } from '../../helpers/getBgUrl';

import s from './SharedLayout.module.css';

const SharedLayout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const board = useSelector(selectCurrentBoard)?.backgroundImage;
  const bgImage = getImages().bg[board];
  const backgroundImage = getBgUrls(bgImage);

  if (!isLoggedIn) {
    return (
      <>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </>
    );
  }

  return (
    <div className={s.layout}>
      <Header />
      <aside>
        <Sidebar />
      </aside>
      <main
        className={s.pageWrapper}
        style={
          board && {
            '--background-image-desk-1x': `url(${backgroundImage[0]})`,
            '--background-image-desk-2x': `url(${backgroundImage[1]})`,
            '--background-image-tab-1x': `url(${backgroundImage[2]})`,
            '--background-image-tab-2x': `url(${backgroundImage[3]})`,
            '--background-image-mob-1x': `url(${backgroundImage[4]})`,
            '--background-image-mob-2x': `url(${backgroundImage[5]})`,
          }
        }
      >
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default SharedLayout;
