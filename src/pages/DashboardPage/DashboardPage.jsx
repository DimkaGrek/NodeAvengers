import s from './DashboardPage.module.css';

import DashboardHeader from '../../components/DashboardHeader/DashboardHeader.jsx';
import CardsColumn from '../../components/CardsColumn/CardsColumn.jsx';
import Button from '../../components/Button/Button.jsx';

import { useEffect, useState } from 'react';
import { AddButton } from '../../components/AddButton/AddButton.jsx';
import { selectCurrentBoard } from '../../redux/boards/boardsSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../hooks/useModal.jsx';
import { Modal } from '../../components/Modal/Modal.jsx';
import { ColumnForm } from '../../components/ColumnForm/ColumnForm.jsx';
import { getFilteredBoard } from '../../helpers';
import { selectFilter } from '../../redux/filter/slice';
import { useParams } from 'react-router-dom';
import { getBoard, getBoards } from '../../redux/boards/boardsOperations.js';

const DashboardPage = () => {
  const { boardName } = useParams();
  const [isAddColumnModal, toggleIsAddColumnModal] = useModal();
  const currentBoard = useSelector(selectCurrentBoard);
  const filter = useSelector(selectFilter);
  const [filteredBoard, setFilteredBoard] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards()).unwrap().then((data) =>
    {
      dispatch(getBoard({data, boardName}))
    }
    )
  }, [dispatch, boardName]);

  useEffect(() => {
    if (currentBoard) {
      setFilteredBoard(getFilteredBoard(currentBoard, filter));
    }
  }, [currentBoard, filter]);
  
  const buttonLabel = currentBoard?.columns?.length
    ? 'Add another column'
    : 'Add column';
  
  return (
    filteredBoard && (
      <div className="container">
        <DashboardHeader />
        <div className={s.columnsContainer}>
          {
            filteredBoard.columns[0]?._id &&
            filteredBoard.columns.map(column => (
            <CardsColumn key={column._id} column={column} />
          ))}

          <Button
            className={s.addColBtn}
            type="button"
            onClick={() => toggleIsAddColumnModal()}
          >
            <AddButton color="light" width={28} height={28} iconSize={14} />
            {buttonLabel}
          </Button>
        </div>
        {isAddColumnModal && (
          <Modal title={'Add column'} toggleModal={toggleIsAddColumnModal}>
            <ColumnForm toggleModal={toggleIsAddColumnModal} />
          </Modal>
        )}
      </div>
    )
  );
};

export default DashboardPage;
