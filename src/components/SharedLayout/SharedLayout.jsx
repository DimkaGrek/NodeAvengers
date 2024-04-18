import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header/Header';

import s from './SharedLayout.module.css';

const SharedLayout = () => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoggedIn = true;

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
      <aside>Sidebar</aside>
      <main className="container">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default SharedLayout;
