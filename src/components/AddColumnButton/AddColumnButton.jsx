import s from './AddColumnButton.module.css';
import { AddButton } from '../../components/AddButton/AddButton.jsx';

const AddColumnButton = ({ handleAddColumn }) => {
  const emptyBoardAddButtonTitle = 'Add column';
  // const fillBoardAddButtonTitle = 'Add another column';

  return (
    <div>
      <button className={s.addColBtn} onClick={handleAddColumn}>
        <AddButton color="light" width={28} height={28} iconSize={14} />
        {emptyBoardAddButtonTitle}
      </button>
    </div>
  );
};

export default AddColumnButton;
