import styles from './UserInfo.module.css';
import { Icon } from '../Icon/Icon';
import { useSelector } from 'react-redux';
import { selectAvatarURL, selectName } from '../../redux/user/slice';

export const UserInfo = ({ toggleModal }) => {
  const nameUser = useSelector(selectName);
  const avatarUrl = useSelector(selectAvatarURL);
  return (
    <div className={styles.wrapperUserBar}>
      <p className={styles.userName}>{nameUser}</p>
      <div className={styles.avatarUserBox}>
        <button className={styles.buttonUserBar} onClick={toggleModal}>
          {avatarUrl ? (
            <img
              src={`${avatarUrl}`}
              alt="user-avatar"
              width="32"
              height="32"
            />
          ) : (
            <Icon id="man" className={styles.defaultUserSvg} size="24" />
          )}
        </button>
      </div>
    </div>
  );
};
