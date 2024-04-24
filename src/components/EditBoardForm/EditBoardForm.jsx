import { Formik, Form, Field } from 'formik';

import Button from '../Button/Button';
import { AddButton, Icon } from 'components';

import { getImages } from '../../helpers';
import { Schema } from '../../schemas';

import { useDispatch } from 'react-redux';

import s from './EditBoardForm.module.css';
import { addBoard, editBoard } from '../../redux/boards/boardsOperations.js';
import { useNavigate } from 'react-router-dom';
import { selectId } from '../../redux/auth/slice';
import { useSelector } from 'react-redux';

export const EditBoardForm = ({ board, toggleModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { images, icons } = getImages();
  const userId = useSelector(selectId);
  console.log(board);
  return (
    <Formik
      initialValues={
        board
          ? {
              userId,
              _id: board._id,
              name: board.name,
              icon: board.icon,
              backgroundImage: board.backgroundImage,
            }
          : {
              userId,
              name: '',
              icon: 0,
              backgroundImage: 0,
            }
      }
      validationSchema={Schema}
      onSubmit={values => {
        board
          ? dispatch(editBoard(values))
              .unwrap()
              .then(() => {
                toggleModal();
                navigate(`/home`);
              })
          : dispatch(addBoard(values))
              .unwrap()
              .then(() => {
                toggleModal();
                navigate(`/home/${values.name}`);
              });
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className={s.form}>
          <div className={s.wrapper}>
            <Field
              type="text"
              name="name"
              placeholder="Title"
              className={s.titleField}
            />
            {errors.name && touched.name ? (
              <p className={s.descrError}>{errors.name}</p>
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
            {<AddButton width={28} height={28} iconSize={10} />}
            {board ? 'Edit' : 'Create'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
