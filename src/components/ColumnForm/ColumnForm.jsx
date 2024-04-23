import { Field, Form, Formik } from 'formik';
import { AddButton } from '../AddButton/AddButton';
import { Schema } from '../../schemas';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';

import s from './ColumnForm.module.css';
import { addColumn } from '../../redux/boards/columnOperations.js';
import { useParams } from 'react-router-dom';
import { selectBoards } from '../../redux/boards/boardsSlice.js';
import { useSelector } from 'react-redux';

export const ColumnForm = ({ title, handleAddColumn, toggleModal }) => {
  const dispatch = useDispatch();
  const { boardName } = useParams();
  const boards = useSelector(selectBoards);
  const currentBoard = boards.find(board => board.name === boardName);

  const fieldValue = title ? title : '';

  return (
    <Formik
      initialValues={{
        name: fieldValue,
      }}
      validationSchema={Schema}
      onSubmit={values => {
        console.log(values);
        console.log({ ...values, boardId: currentBoard._id });
        dispatch(addColumn({ ...values, boardId: currentBoard._id }))
          .unwrap()
          .then(() => {
            handleAddColumn();
            toggleModal();
          });
      }}
    >
      {({ errors, touched }) => (
        <Form className={s.form}>
          <div>
            <Field name="name" type="text" placeholder="Title" />
            {errors.name && touched.name ? (
              <p className={s.descrError}>{errors.name}</p>
            ) : null}
            {/* {touched.title && !fieldValue && (
              <p className={s.descrError}>Please enter a title</p>
            )} */}
          </div>
          <Button
            className="button"
            type="submit"
            // onClick={() => {
            //   // if (!touched.title) return;
            //   // toggleModal();
            // }}
          >
            <AddButton width="28" height="28" iconSize="14" />{' '}
            {fieldValue ? 'Edit' : 'Add'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
