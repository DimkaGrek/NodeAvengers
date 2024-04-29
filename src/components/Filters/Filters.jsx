import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Icon } from '../Icon/Icon.jsx';
import {
  getColorDescription,
  getColorsFilter,
  ICON_COLORS_FILTER,
} from '../../helpers';
import { changeFilter, selectFilter } from '../../redux/filter/slice.js';

import s from './Filters.module.css';
import Button from '../Button/Button.jsx';

const Filters = ({ toggleModal }) => {
  const selectedFilter = useSelector(selectFilter);
  const { colors } = getColorsFilter();
  const [selectedColor, setSelectedColor] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (colors.includes(selectedFilter)) {
      setSelectedColor(selectedFilter);
    }
  }, [selectedFilter, colors]);

  const handleFilterChange = color => {
    setSelectedColor(color);
    dispatch(changeFilter(color));
    toggleModal();
  };

  const handleShowAll = () => {
    setSelectedColor(null);
    dispatch(changeFilter('Show all'));
    toggleModal();
  };

  return (
    <Formik initialValues={{ priority: '' }} onSubmit={toggleModal}>
      {({ setFieldValue }) => (
        <Form className={s.form}>
          <div className={s.wrapper}>
            <div className={s.top_wrapper}>
              <p className={s.description_color}>Priority color</p>
              <Button
                className={`${s.btn_all} 
                ${selectedFilter === 'Show all' ? s.filter_checked : ''}`}
                onClick={handleShowAll}
              >
                Show all
              </Button>
            </div>
            <ul className={s.colorsList}>
              {colors.map((color, index) => (
                <li key={index} className={s.elem_wrapper}>
                  <label onClick={() => handleFilterChange(color)}>
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
                        className={`${s.color_name} 
                   
                        ${selectedFilter === color ? s.filter_checked : ''}`}
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
