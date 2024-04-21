import s from './AddColumnButton.module.css';
import { AddButton } from '../../components/AddButton/AddButton.jsx';

const AddColumnButton = ({ handleAddColumn, buttonLabel }) => {
  return (
    <div>
      <button className={s.addColBtn} onClick={handleAddColumn}>
        <AddButton color="light" width={28} height={28} iconSize={14} />
        {buttonLabel}
      </button>
    </div>
  );
};

export default AddColumnButton;
