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

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserModal, toggleIsUserModal] = useModal();
  const [isSidebarModal, setIsSidebarModal] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

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

  const { setTheme } = useTheme();

  const handleDarkThemeClick = () => {
    setTheme('dark');
  };
  const handleLightThemeClick = () => {
    setTheme('light');
  };
  const handleVioletThemeClick = () => {
    setTheme('violet');
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
              <li className={styles.itemTheme}>
                <button
                  className={styles.buttonItem}
                  onClick={handleLightThemeClick}
                >
                  Light
                </button>
              </li>
              <li className={styles.itemTheme}>
                <button
                  className={styles.buttonItem}
                  onClick={handleDarkThemeClick}
                >
                  Dark
                </button>
              </li>
              <li className={styles.itemTheme}>
                <button
                  className={styles.buttonItem}
                  onClick={handleVioletThemeClick}
                >
                  Violet
                </button>
              </li>
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
