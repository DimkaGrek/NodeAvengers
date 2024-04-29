import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import { Icon, Button, Loader, DatePickerForm } from 'components';

import { useBoards } from '../../hooks';
import { schema } from '../../schemas';
import { addCard } from '../../redux/boards/cardOperations.js';
import { getColors, ICON_COLORS } from '../../helpers';
import { editCard } from '../../redux/boards/cardOperations.js';
import { selectIsLoading } from '../../redux/auth/slice.js';
import { selectCurrentBoard } from '../../redux/boards/boardsSlice.js';

import s from './EditCardForm.module.css';

export const EditCardForm = ({ toggleModal, columnId, card }) => {
  const { colors } = getColors();
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(null);
  const { isLoadingBoards } = useBoards();
  const isLoading = useSelector(selectIsLoading);
  const currentBoard = useSelector(selectCurrentBoard);

  const [isDeadlineChecked, setIsDeadlineChecked] = useState(
    card ? !!card.deadline : false
  );
  useEffect(() => {
    if (card && card.priority && !selectedColor) {
      setSelectedColor(card.priority);
    } else if (colors.length > 0 && !selectedColor) {
      setSelectedColor(colors[colors.length - 1]);
    }
  }, [card, colors, selectedColor]);

  const handleSubmit = values => {
    if (!isDeadlineChecked || !values.deadline) {
      values.deadline = new Date().toISOString();
    }

    const updCard = {
      ...(values.title !== card?.title && { title: values.title }),
      ...(values.description !== card?.description && {
        description: values.description,
      }),
      ...(values.priority !== card?.priority && { priority: values.priority }),
      ...(values.deadline !== card?.deadline && { deadline: values.deadline }),
      ...((card?.columnId && { columnId: card?.columnId }) || { columnId }),
      ...(currentBoard?._id && { boardId: currentBoard._id }),
    };

    const hasOtherProperties = Object.keys(updCard).some(
      key => key !== 'columnId' && key !== 'boardId'
    );

    if (hasOtherProperties) {
      dispatch(card ? editCard({ ...values, _id: card._id }) : addCard(values))
        .unwrap()
        .then(() => {
          toggleModal();
        })
        .catch(data => toast.error(data.message));
    } else return toast.warning('You didn`t change anyting.');
  };

  return (
    <>
      {isLoading && <Loader />}
      <Formik
        initialValues={
          card
            ? {
                title: card.title,
                description: card.description,
                priority: card.priority,
                deadline: card.deadline,
                columnId: card.columnId,
                boardId: currentBoard._id,
              }
            : {
                title: '',
                description: '',
                priority: 'without',
                deadline: null,
                columnId,
                boardId: currentBoard._id,
              }
        }
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className={s.form}>
            <div className={s.wrapper}>
              <Field
                name="title"
                type="text"
                placeholder="Title"
                className={s.title}
              />
              {errors.title && touched.title ? (
                <div className={s.input_error}>{errors.title}</div>
              ) : null}
            </div>
            <div className={s.wrapper_textarea}>
              <Field
                name="description"
                as="textarea"
                placeholder="Description"
                className={s.description_textarea}
              />
              {errors.description && touched.description ? (
                <div className={s.input_error}>{errors.description}</div>
              ) : null}
            </div>
            <div className={s.wrapper}>
              <p className={s.description_color}>
                Priority color: {selectedColor}
              </p>
              <ul className={s.colorsList}>
                {colors.map((color, index) => (
                  <li key={index}>
                    <label>
                      <Field
                        className={s.radioBtn}
                        type="radio"
                        name="priority"
                        value={color}
                        checked={selectedColor === color}
                        onChange={() => {
                          setFieldValue('priority', color);
                          setSelectedColor(color);
                        }}
                      />
                      <Icon
                        id={
                          selectedColor === color
                            ? `check-color-${ICON_COLORS[color]}`
                            : color
                        }
                        className={s.icon_color}
                        size={14}
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.wrapper_deadline}>
              <div className={s.wrapper_checkbox}>
                {' '}
                <p className={s.description}>Deadline </p>
                <Field
                  name="deadlineCheckbox"
                  className={s.checkbox}
                  type="checkbox"
                  checked={isDeadlineChecked}
                  onChange={e => {
                    console.log(e.target.checked);
                    console.log(isDeadlineChecked);
                    setIsDeadlineChecked(e.target.checked);
                  }}
                />
              </div>
              <DatePickerForm
                onDateChange={date => setFieldValue('deadline', date)}
                disabled={!isDeadlineChecked}
                card={card}
              />
            </div>
            <Button
              type="submit"
              className={s.button}
              disabled={isLoadingBoards}
            >
              <span className={s.color_addbtn}>
                <Icon id="plus" className={s.iconPlus} size={10} />
              </span>

              {card ? 'Edit' : 'Add'}
              {isLoadingBoards && (
                <Loader size={20} classTitle="insideButton" />
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
