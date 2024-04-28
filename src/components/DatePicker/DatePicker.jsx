import s from './DatePicker.module.css';
import { forwardRef, useState } from 'react';
import { format, isSameDay, isBefore } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { Icon } from '../Icon/Icon';

const DatePickerForm = ({ onDateChange, disabled, card }) => {
  const [selectedDate, setSelectedDate] = useState(
    card && card.deadline ? new Date(card.deadline) : Date.now()
  );

  const CustomInput = forwardRef(({ onClick }, ref) => {
    return (
      <button onClick={onClick} ref={ref} className={s.btn} type="button">
        {format(selectedDate, 'EEEE, MMMM d')}
        <Icon id="down" className={s.icon} size={18} />
      </button>
    );
  });
  CustomInput.displayName = 'CustomInput';

  const formatDateToISOString = date => {
    return date.toISOString();
  };

  const handleDateChange = date => {
    setSelectedDate(date);

    const formattedDate = formatDateToISOString(date);
    onDateChange(formattedDate);
  };
  const filterPassedDate = date => {
    const today = new Date();
    return !isBefore(date, today) || isSameDay(date, today);
  };

  return (
    <>
      <DatePicker
        toggleCalendarOnIconClick
        calendarClassName={s.datapicker}
        selected={selectedDate}
        onChange={handleDateChange}
        customInput={<CustomInput />}
        dateFormat={'EEEE, MMMM d'}
        calendarStartDay={1}
        filterDate={filterPassedDate}
        disabled={disabled}
      />
    </>
  );
};

export default DatePickerForm;
