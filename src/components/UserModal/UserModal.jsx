import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import Resizer from 'react-image-file-resizer';
import Switch from 'react-switch';

import { Icon } from 'components';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

import { useUser } from '../../hooks/useUser';
import { updateUserThunk } from '../../redux/user/operations';
import { EditUserPassSchema, EditUserSchema } from '../../schemas';

import styles from './UserModal.module.css';
import { toast } from 'react-toastify';

export const UserModal = ({ toggleModal }) => {
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const { id, userName, userEmail, userAvatar, isLoading } = useUser();

  const dispatch = useDispatch();

  const fileInput = useRef(null);

  let avatar = userAvatar;

  const passVisibility = () => {
    setShowPass(!showPass);
  };

  const newPassVisibility = () => {
    setShowNewPass(!showNewPass);
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
            className={styles.imgModal}
            src={avatarPreview || avatar}
            alt={userName}
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
          password: '',
          newPassword: '',
        }}
        validationSchema={!isEditPassword ? EditUserSchema : EditUserPassSchema}
        onSubmit={data => {
          const user = {
            id,
            ...(data.name !== userName && { name: data.name }),
            ...(data.email !== userEmail && { email: data.email }),
            ...(avatarFile && { avatarFile }),
            ...(data.password && { password: data.password }),
            ...(data.newPassword && { newPassword: data.newPassword }),
          };

          const hasOtherProperties = Object.keys(user).some(
            key => key !== 'id'
          );

          if (hasOtherProperties) {
            dispatch(updateUserThunk(user))
              .unwrap()
              .then(res => {
                if (res.errors[0]) {
                  throw new Error('Your current password is not valid.');
                }
                toggleModal();
              })
              .catch(error => toast.error(error));
          }
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className={styles.stylesForm}>
            <div className={styles.inputWrapper}>
              <Field
                className={styles.inputStyle}
                type="text"
                name="name"
                placeholder="Name"
              />
              {errors.name && touched.name ? (
                <p className={styles.descrError}>{errors.name}</p>
              ) : null}
            </div>
            <div className={styles.inputWrapper}>
              <Field
                className={styles.inputStyle}
                type="email"
                name="email"
                placeholder="Email"
              />
              {errors.email && touched.email ? (
                <p className={styles.descrError}>{errors.email}</p>
              ) : null}
            </div>

            {isEditPassword && (
              <>
                <div className={styles.inputWrapper}>
                  <Field
                    className={styles.inputStylePassword}
                    type={showPass ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                  />
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
                  {errors.password && touched.password ? (
                    <p className={styles.descrError}>{errors.password}</p>
                  ) : null}
                </div>
                <div className={styles.inputWrapper}>
                  <Field
                    className={styles.inputStylePassword}
                    type={showNewPass ? 'text' : 'password'}
                    name="newPassword"
                    placeholder="New password"
                  />
                  <Button
                    type="button"
                    className={styles.eyeIconBtn}
                    onClick={newPassVisibility}
                  >
                    {showNewPass ? (
                      <Icon id="eye" className={styles.icon} size={18} />
                    ) : (
                      <Icon id="eye-off" className={styles.icon} size={18} />
                    )}
                  </Button>
                  {errors.newPassword && touched.newPassword ? (
                    <p className={styles.descrError}>{errors.newPassword}</p>
                  ) : null}
                </div>
              </>
            )}
            <div className={styles.switchWrapper}>
              <p className={styles.descr}>Change password</p>
              <Switch
                className="react-switch"
                onChange={() => {
                  setIsEditPassword(!isEditPassword);
                  setFieldValue('password', '');
                  setFieldValue('newPassword', '');
                }}
                checked={isEditPassword}
                height={20}
                width={35}
                offColor="#615e5e"
                onColor="#9DC888"
                uncheckedIcon={false}
                checkedIcon={false}
                activeBoxShadow="none"
              />
            </div>
            <Button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading && <Loader size={20} classTitle="insideButton" />}
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
