import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import Resizer from 'react-image-file-resizer';

import { Icon } from 'components';
import Button from '../Button/Button';

import { SignupSchema } from '../../schemas/RegisterSchema';
import styles from './UserModal.module.css';
import { updateUserThunk } from '../../redux/user/operations';
import { useUser } from '../../hooks/useUser';

export const UserModal = () => {
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const { id, userName, userEmail, userAvatar } = useUser();

  const dispatch = useDispatch();

  const fileInput = useRef(null);

  let avatar = userAvatar.includes('gravatar') ? null : userAvatar;
  console.log(avatar);
  const passVisibility = () => {
    setShowPass(prevState => !prevState);
  };

  const resizeFile = file =>
    new Promise((resolve, reject) => {
      const fileType = file.type;

      let format;
      if (fileType === 'image/jpeg' || fileType === 'image/jpg') {
        format = 'JPEG';
      } else if (fileType === 'image/png') {
        format = 'PNG';
      } else {
        reject(new Error('Unsupported file format'));
        return;
      }

      Resizer.imageFileResizer(
        file,
        64,
        64,
        format,
        100,
        0,
        uri => {
          resolve(uri);
        },
        'file'
      );
    });

  const handleUploadAvatar = async e => {
    const file = e.target.files[0];
    if (!file) return;

    const resizedFile = await resizeFile(file);
    const imageUrl = URL.createObjectURL(resizedFile);

    setAvatarPreview(imageUrl);
    setAvatarFile(file);
  };

  const handleRedirectClick = () => {
    fileInput.current.click();
  };

  return (
    <>
      <div className={styles.wrapperUserImage}>
        {!avatarPreview && !avatar && (
          <span className={styles.spanStyles}>
            <Icon id="man" className={styles.iconUserModal} size="58" />
          </span>
        )}
        <button
          className={styles.updateImageButton}
          onClick={handleRedirectClick}
        >
          <Icon id="plus" className={styles.iconUpdateAvatar} size="10" />
        </button>
        {(avatarPreview || avatar) && (
          <img
            src={avatarPreview || avatar}
            alt="user avatar"
            width={64}
            height={64}
          />
        )}
        <input
          className={styles.fileInput}
          ref={fileInput}
          onChange={handleUploadAvatar}
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
        />
      </div>
      <Formik
        initialValues={{
          name: userName,
          email: userEmail,
        }}
        // validationSchema={SignupSchema}
        onSubmit={data => {
          const user = { ...data, avatarFile, id };
          console.log(user);
          dispatch(updateUserThunk(user));

          // dispatch(resendEmailThunk(data))
          //   .unwrap()
          //   .then(
          //     toast.success(
          //       `Verification link was sent successfully. Please check your email.`
          //     )
          //   )
          //   .catch(error => {
          //     toast.error(error);
          //   });
        }}
      >
        <Form className={styles.stylesForm}>
          <Field
            className={styles.inputStyle}
            type="text"
            name="name"
            placeholder="Name"
          />
          <Field
            className={styles.inputStyle}
            type="email"
            name="email"
            placeholder="Email"
          />
          {isEditPassword && (
            <>
              <Field
                className={styles.inputStylePassword}
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder="Password"
              />
              <Field
                className={styles.inputStylePassword}
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder="New password"
              />
            </>
          )}
          <Button
            type="button"
            className={styles.eyeIconBtn}
            onClick={passVisibility}
          >
            {showPass ? (
              <Icon id="eye" className={styles.icon} size={18} />
            ) : (
              <Icon id="eye-off" className={styles.icon} size={18} />
            )}
          </Button>
          <Button type="submit" className={styles.submitButton}>
            <p className={styles.sendText}>Send</p>
          </Button>
        </Form>
      </Formik>
    </>
  );
};
