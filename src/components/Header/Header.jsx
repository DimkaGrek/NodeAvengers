import { useState } from 'react';
import styles from './Header.module.css';
import clsx from 'clsx';
import { Icon } from '../Icon/Icon';
import { useTheme } from '../../hooks/useTheme';
import { UserInfo } from '../UserInfo/UserInfo';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from '../../redux/auth/operations';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { selectRefreshToken } from '../../redux/auth/slice';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotated, setRotated] = useState(false);
  const refreshToken = useSelector(selectRefreshToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangeDrop = () => {
    setIsOpen(!isOpen);
    setRotated(prev => !prev);
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

  const handleLogOut = async () => {
    try {
      await dispatch(logoutThunk({ refreshToken }));
      navigate('/welcome');
    } catch (error) {
      toast.error(`Something went wront please try again.`);
    }
  };
  return (
    <header className={styles.sectionStyleHeader}>
      <button className={styles.burgerButton}>
        <Icon id="burger-menu" className={styles.burgerIconStyles} size="20" />
      </button>
      <div className={styles.container}>
        <div className={styles.wrapperDrop}>
          <p className={styles.textThemeStyle}>Theme</p>
          <button
            className={clsx({
              [styles.buttonDropDown]: true,
              [styles.rotated]: rotated,
            })}
            onClick={() => handleChangeDrop()}
          >
            <Icon
              id="chevron-down"
              className={styles.dropIconStyles}
              size="16"
            />
          </button>
          <button onClick={handleLogOut}> Log out</button>
          <ul className={isOpen ? styles.listDrop : styles.listNone}>
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
          <UserInfo />
        </div>
      </div>
    </header>
  );
};
