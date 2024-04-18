import { Formik, Form, Field } from 'formik';

import Button from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { AddButton } from '../AddButton/AddButton';

import { getImages } from '../../helpers/getImages';
import { Schema } from '../../schemas/EditBoardSchema';

import s from './EditBoardForm.module.css';

export const EditBoardForm = ({ isEdit = false }) => {
  const { images, icons } = getImages();

  return (
    <Formik
      initialValues={{
        title: '',
        icon: 0,
        backgroundImage: 0,
      }}
      validationSchema={Schema}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className={s.form}>
          <div className={s.wrapper}>
            <Field type="text" name="title" placeholder="Title" />
            {errors.title && touched.title ? (
              <p className={s.descrError}>{errors.title}</p>
            ) : null}
          </div>
          <div className={s.wrapper}>
            <p className={s.description}>Icons</p>
            <ul className={s.iconList}>
              {icons.map((icon, index) => (
                <li key={index}>
                  <label>
                    <Field
                      className={s.radioBtn}
                      type="radio"
                      name="icon"
                      value={index}
                      onChange={() => setFieldValue('icon', index)}
                    />
                    <Icon id={icon} className={s.icon} size={18} />
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.lastWrapper}>
            {' '}
            <p className={s.description}>Background</p>
            <ul className={s.imageList}>
              {images.map((image, index) => (
                <li key={index}>
                  <label>
                    <Field
                      className={s.radioBtn}
                      type="radio"
                      name="backgroundImage"
                      value={index}
                      onChange={() => setFieldValue('backgroundImage', index)}
                    />
                    <img
                      className={s.img}
                      src={image}
                      alt="background"
                      width={28}
                      height={28}
                    />
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <Button type="submit" className={s.button}>
            {!isEdit && <AddButton width={28} height={28} iconSize={18} />}
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
};
