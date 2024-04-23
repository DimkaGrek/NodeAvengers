import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/slice';

import s from './SharedLayout.module.css';

const SharedLayout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

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
      <main>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default SharedLayout;
