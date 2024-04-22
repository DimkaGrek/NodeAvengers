import styles from './UserModal.module.css';
import { Icon } from '../Icon/Icon';

import { useState } from 'react';
import Button from '../Button/Button';
import { Field, Form, Formik } from 'formik';

export const UserModal = () => {
  const [showPass, setShowPass] = useState(false);

  const passVisibility = () => {
    setShowPass(prevState => !prevState);
  };

  return (
    <>
      <div className={styles.wrapperUserImage}>
        <span className={styles.spanStyles}>
          <Icon id="man" className={styles.iconUserModal} size="58" />
          <button className={styles.updateImageButton}>
            <Icon id="plus" className={styles.iconUpdateAvatar} size="10" />
          </button>
        </span>
      </div>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        // validationSchema={schema}
        onSubmit={data => {
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
          console.log(data);
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
          <Button type="submit" className={styles.submitButton}>
            <p className={styles.sendText}>Send</p>
          </Button>
        </Form>
      </Formik>
    </>
  );
};
