import { Formik, Form, Field } from 'formik';
import { schema } from '../../schemas';
import { useDispatch } from 'react-redux';
import { addCard } from '../../redux/boards/cardOperations.js';
import Button from '../Button/Button';
import s from './EditCardForm.module.css';
import { Icon } from '../Icon/Icon.jsx';
import { getColors, ICON_COLORS } from '../../helpers';
import { useState } from 'react';
import { AddButton } from '../AddButton/AddButton.jsx';
import DatePickerForm from '../DatePicker/DatePicker.jsx';
const EditCardForm = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const { colors } = getColors();
  const [selectedColor, setSelectedColor] = useState(null);
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        priority: '',
        deadline: '',
        columnId: '',
      }}
      validationSchema={schema}
      onSubmit={values => {
        dispatch(addCard(values))
          .unwrap()
          .then(() => {
            toggleModal();
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
                      value={index}
                      onChange={() => {
                        setFieldValue('priority', index),
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
            <DatePickerForm />
          </div>
          <Button type="submit" className={s.button}>
            <AddButton width={28} height={28} iconSize={10} />
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditCardForm;
