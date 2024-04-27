import { Formik, Form, Field } from 'formik';
import { schema } from '../../schemas';
import { useDispatch } from 'react-redux';
import { addCard } from '../../redux/boards/cardOperations.js';
import Button from '../Button/Button';
import s from './EditCardForm.module.css';
import { Icon } from '../Icon/Icon.jsx';
import { getColors, ICON_COLORS } from '../../helpers';
import { useState } from 'react';
import DatePickerForm from '../../components/DatePicker/DatePicker.jsx';
// import { useTheme } from '../../hooks/useTheme.js';
import { toast } from 'react-toastify';
import { editCard } from '../../redux/boards/cardOperations.js';

export const EditCardForm = ({ toggleModal, columnId, card }) => {
  // const { theme } = useTheme();
  const { colors } = getColors();
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <Formik
      initialValues={
        card
          ? {
              title: card.title,
              description: card.description,
              priority: card.priority,
              deadline: card.deadline,
              columnId: card.columnId,
            }
          : { title: '', description: '', priority: '', deadline: '', columnId }
      }
      validationSchema={schema}
      onSubmit={values => {
        dispatch(
          card ? editCard({ ...values, _id: card._id }) : addCard(values)
        )
          .unwrap()
          .then(() => {
            toggleModal();
          })
          .catch(error => {
            toast.info(error.message);
          });
        console.log(values);
      }}
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
            <p className={s.description_color}>Label color</p>
            <ul className={s.colorsList}>
              {colors.map((color, index) => (
                <li key={index}>
                  <label>
                    <Field
                      className={s.radioBtn}
                      type="radio"
                      name="priority"
                      value={color}
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
            <p className={s.description}>Deadline</p>
            <DatePickerForm
              onDateChange={date => setFieldValue('deadline', date)}
            />
          </div>
          <Button type="submit" className={s.button}>
            <span className={s.color_addbtn}>
              <Icon id="plus" className={s.iconPlus} size={10} />
            </span>
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
};
