import s from './AddColumnButton.module.css';
import { AddButton } from '../../components/AddButton/AddButton.jsx';

export const AddColumnButton = ({ handleAddColumn, buttonLabel }) => {
  return (
    <button className={s.addColBtn} onClick={handleAddColumn}>
      <AddButton color="light" width={28} height={28} iconSize={14} />
      {buttonLabel}
    </button>
  );
};
