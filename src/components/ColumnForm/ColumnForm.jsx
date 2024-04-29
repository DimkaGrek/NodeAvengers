import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AddButton, Button, Loader } from 'components';

import { Schema } from '../../schemas';
import { addColumn } from '../../redux/boards/columnOperations.js';
import {
  selectBoards,
  selectIsLoading,
} from '../../redux/boards/boardsSlice.js';
import { editColumn } from '../../redux/boards/columnOperations.js';

import s from './ColumnForm.module.css';

export const ColumnForm = ({ column, toggleModal }) => {
  const dispatch = useDispatch();
  const { boardName } = useParams();
  const boards = useSelector(selectBoards);
  const isLoading = useSelector(selectIsLoading);

  const currentBoard = boards.find(board => board.name === boardName);

  return (
    <Formik
      initialValues={{
        name: !column ? '' : column.name,
      }}
      validationSchema={Schema}
      onSubmit={values => {
        dispatch(
          column
            ? editColumn({
                id: column._id,
                boardId: currentBoard._id,
                ...values,
              })
            : addColumn({ ...values, boardId: currentBoard._id })
        )
          .unwrap()
          .then(() => {
            toggleModal();
          })
          .catch(e => toast.error(e));
      }}
    >
      {({ errors, touched }) => (
        <Form className={s.form}>
          <div>
            <Field name="name" type="text" placeholder="Title" />
            {errors.name && touched.name ? (
              <p className={s.descrError}>{errors.name}</p>
            ) : null}
          </div>
          <Button className="button" type="submit" disabled={isLoading}>
            <AddButton width="28" height="28" iconSize="14" />{' '}
            {column ? 'Edit' : 'Add'}
            {isLoading && <Loader size={20} classTitle="insideButton" />}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
