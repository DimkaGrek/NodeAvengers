import styles from './UserInfo.module.css';
import { Icon } from '../Icon/Icon';
import { useState } from 'react';
import { UserModal } from '../UserModal/UserModal';

export const UserInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.wrapperUserBar}>
      <p className={styles.userName}>UserName</p>
      <div className={styles.avatarUserBox}>
        <button
          className={styles.buttonUserBar}
          onClick={() => setIsOpen(true)}
        >
          <Icon id="man" className={styles.defaultUserSvg} size="24" />
        </button>
        <UserModal isOpen={isOpen} onClose={setIsOpen} />
      </div>
    </div>
  );
};
