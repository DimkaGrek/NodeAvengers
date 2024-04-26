import { Formik, Form, Field } from 'formik';

import { Icon } from '../Icon/Icon.jsx';
import {
  getColorDescription,
  getColorsFilter,
  ICON_COLORS_FILTER,
} from '../../helpers';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import s from './Filters.module.css';
import Button from '../Button/Button.jsx';

const Filters = ({ toggleModal }) => {
  const { colors } = getColorsFilter();
  const [selectedColor, setSelectedColor] = useState(null);
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ priority: '' }}
      onSubmit={values => {
        dispatch()
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
      {({ setFieldValue }) => (
        <Form className={s.form}>
          <div className={s.wrapper}>
            <div className={s.top_wrapper}>
              <p className={s.description_color}>Label color</p>
              <Button className={s.btn_all}>Show all</Button>
            </div>
            <ul className={s.colorsList}>
              {colors.map((color, index) => (
                <li key={index} className={s.elem_wrapper}>
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
                    <div className={s.elem_wrapper}>
                      <Icon
                        id={
                          selectedColor === color
                            ? `check-color-${ICON_COLORS_FILTER[color]}`
                            : color
                        }
                        className={s.icon_color}
                        size={14}
                      />
                      <span
                        className={`${s.color_name} ${
                          selectedColor === color ? s.selected_color : ''
                        }`}
                      >
                        {getColorDescription[index]}
                      </span>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Filters;
