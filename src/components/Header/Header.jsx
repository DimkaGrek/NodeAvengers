import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { Transition } from 'react-transition-group';
import { Icon, UserInfo, UserModal, Modal, Sidebar } from 'components';

import { useTheme, useModal } from '../../hooks';
import { selectThemesList } from '../../redux/themes/slice';
import { selectId, selectThemeId } from '../../redux/user/slice';
import { updateUserThemeThunk } from '../../redux/user/operations';

import styles from './Header.module.css';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserModal, toggleIsUserModal] = useModal();
  const [isSidebarModal, setIsSidebarModal] = useState(false);

  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const themes = useSelector(selectThemesList);
  const userThemeId = useSelector(selectThemeId);
  const userId = useSelector(selectId);

  const currentTheme = themes
    .find(element => element._id === userThemeId)
    ?.name.toLowerCase();

  const { setTheme } = useTheme();

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, [currentTheme, setTheme]);

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

  const handleChangeTheme = themeId => {
    const userData = {
      userId,
      themeId,
    };
    dispatch(updateUserThemeThunk(userData));
    const currentTheme = themes
      .find(element => element._id === themeId)
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
        <Transition in={isSidebarModal} timeout={100} unmountOnExit>
          {state => (
            <div
              className={`${styles.backdrop} ${
                state === 'entered' && styles.backdropEntered
              }`}
              onClick={() => handleOpenModalSidebar()}
            >
              <div
                className={`${styles.wrapperSidebarContent} ${
                  state === 'entered' && styles.wrapperSidebarContentEntered
                }`}
                onClick={event => event.stopPropagation()}
              >
                <Sidebar handleOpenModalSidebar={handleOpenModalSidebar} />
              </div>
            </div>
          )}
        </Transition>
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
                      className={clsx({
                        [styles.buttonItem]: true,
                        [styles.buttonItemActive]: theme._id === userThemeId,
                      })}
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
