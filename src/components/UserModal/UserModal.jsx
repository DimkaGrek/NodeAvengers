import styles from './UserModal.module.css';
import { Icon } from '../Icon/Icon';
// import { useDispatch, useSelector } from 'react-redux';
// import { useState } from 'react';
// import { toast } from 'react-toastify';

export const UserModal = ({ onClose, isOpen }) => {
  // const dispatch = useDispatch();
  // const userName = useSelector();
  // const userAvatar = useSelector();

  // const [avatar, setAvatar] = useState(userAvatar);
  // const [avatarUrl, setAvatarUrl] = useState(userAvatar);
  // const [name, setName] = useState(userName);

  // const handleSave = async () => {
  //   try {
  //     if (name !== userName) await dispatch(updateUserInfoThunk({ name }));
  //     if (avatar !== userAvatar)
  //       await dispatch(updateUserAvatarThunk(avatarUrl));
  //     toast.success('Success');
  //   } catch (error) {
  //     toast.error('Error');
  //   }
  // };

  // const handleFileChange = event => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setAvatarUrl(file);
  //       setAvatar(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleFileRemove = async () => {
  //   try {
  //     const avatarArr = userAvatar.split('avatar/');
  //     const avatarId = avatarArr[1].split('.')[0];
  //     await dispatch(deleteUsersAvatarThunk(avatarId));
  //     setAvatar(null);
  //   } catch (e) {
  //     toast.error(e);
  //   }
  // };

  return (
    isOpen && (
      <div className={styles.backdrop} onClick={() => onClose(false)}>
        <div
          className={styles.wrapperModal}
          onClick={event => event.stopPropagation()}
        >
          <button className={styles.closeModal} onClick={() => onClose(false)}>
            <Icon id="close" className={styles.iconCloseModal} size="15" />
          </button>
          <p className={styles.titleModal}>Edit profile</p>
          <div className={styles.wrapperUserImage}>
            <span className={styles.spanStyles}>
              <Icon id="man" className={styles.iconUserModal} size="58" />
              <button className={styles.updateImageButton}>
                <Icon id="plus" className={styles.iconUpdateAvatar} size="10" />
              </button>
            </span>
          </div>
          <div className={styles.boxForInput}>
            <input className={styles.inputStyle}></input>
            <input className={styles.inputStyle}></input>
            <input className={styles.inputStyle}></input>
          </div>
          <button type="submit" className={styles.sendButtonStyles}>
            <p className={styles.textButton}>Send</p>
          </button>
        </div>
      </div>
    )
  );
};
