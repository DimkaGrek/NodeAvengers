import { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { useTheme } from '../../hooks/useTheme';
import { UserInfo } from '../UserInfo/UserInfo';

import styles from './Header.module.css';
import clsx from 'clsx';
import { UserModal } from '../UserModal/UserModal';
import { Modal } from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';
import Sidebar from '../Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getThemesList } from '../../redux/themes/operations';
import { selectThemesList } from '../../redux/themes/slice';
import { selectThemeId } from '../../redux/user/slice';
import { updateUserThemeThunk } from '../../redux/user/operations';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserModal, toggleIsUserModal] = useModal();
  const [isSidebarModal, setIsSidebarModal] = useState(false);

  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const themes = useSelector(selectThemesList);
  const userThemeId = useSelector(selectThemeId);

  const currentTheme = themes
    .find(element => element._id === userThemeId)
    ?.name.toLowerCase();

  const { setTheme } = useTheme();

  useEffect(() => {
    dispatch(getThemesList());
    setTheme(currentTheme);
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [dispatch, currentTheme, setTheme]);

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const handleOpenModalSidebar = () => {
    setIsSidebarModal(!isSidebarModal);
  };

  const handleChangeDrop = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyPress = event => {
    if (event.key === 'Escape') {
      setIsSidebarModal(false);
    }
  };

  const handleChangeTheme = id => {
    dispatch(updateUserThemeThunk(id));
    const currentTheme = themes
      .find(element => element._id === id)
      ?.name.toLowerCase();
    setTheme(currentTheme);
  };

  return (
    <>
      <header className={styles.sectionStyleHeader}>
        <button
          className={styles.burgerButton}
          onClick={() => handleOpenModalSidebar()}
        >
          <Icon
            id="burger-menu"
            className={styles.burgerIconStyles}
            size="20"
          />
        </button>
        {isSidebarModal && (
          <div
            className={styles.backdrop}
            onClick={() => handleOpenModalSidebar()}
          >
            <div
              className={styles.wrapperSidebarContent}
              onClick={event => event.stopPropagation()}
            >
              <Sidebar />
            </div>
          </div>
        )}
        <div className={styles.container}>
          <div
            className={styles.wrapperDrop}
            ref={dropdownRef}
            onClick={() => handleChangeDrop()}
          >
            <p className={styles.textThemeStyle}>Theme</p>
            <button
              className={clsx({
                [styles.buttonDropDown]: true,
                [styles.rotated]: isOpen,
              })}
            >
              <Icon
                id="chevron-down"
                className={styles.dropIconStyles}
                size="16"
              />
            </button>
            <ul
              className={isOpen ? styles.listDrop : styles.listNone}
              onClick={event => event.stopPropagation()}
            >
              {themes &&
                themes.map(theme => (
                  <li key={theme._id} className={styles.itemTheme}>
                    <button
                      className={styles.buttonItem}
                      onClick={() => handleChangeTheme(theme._id)}
                    >
                      {theme.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          <UserInfo toggleModal={toggleIsUserModal} />
        </div>
      </header>
      {isUserModal && (
        <Modal title="Edit profile" toggleModal={toggleIsUserModal}>
          <UserModal toggleModal={toggleIsUserModal} />
        </Modal>
      )}
    </>
  );
};
