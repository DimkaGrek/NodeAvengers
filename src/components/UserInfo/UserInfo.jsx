import styles from './UserInfo.module.css';
import { Icon } from '../Icon/Icon';

export const UserInfo = () => {
  return (
    <div className={styles.wrapperUserBar}>
      <p className={styles.userName}>UserName</p>
      <div className={styles.avatarUserBox}>
        <button className={styles.buttonUserBar}>
          <Icon id="man" className={styles.defaultUserSvg} size="24" />
        </button>
      </div>
    </div>
  );
};
