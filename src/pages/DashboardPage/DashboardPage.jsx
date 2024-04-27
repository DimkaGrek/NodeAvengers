import s from './DashboardPage.module.css';

import DashboardHeader from '../../components/DashboardHeader/DashboardHeader.jsx';
import CardsColumn from '../../components/CardsColumn/CardsColumn.jsx';
import Button from '../../components/Button/Button.jsx';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBoards } from '../../redux/boards/boardsOperations';
import { getBoard } from '../../redux/boards/boardsOperations';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AddButton } from '../../components/AddButton/AddButton.jsx';
import { selectCurrentBoard } from '../../redux/boards/boardsSlice.js';
import { useSelector } from 'react-redux';
import { useModal } from '../../hooks/useModal.jsx';
import { Modal } from '../../components/Modal/Modal.jsx';
import { ColumnForm } from '../../components/ColumnForm/ColumnForm.jsx';
import { getFilteredBoard } from '../../helpers';
import { selectFilter } from '../../redux/filter/slice';

const DashboardPage = () => {
  const [isAddColumnModal, toggleIsAddColumnModal] = useModal();

  const { boardName } = useParams();
  const currentBoard = useSelector(selectCurrentBoard);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('current Board?', currentBoard);
  const filter = useSelector(selectFilter);
  const [filteredBoard, setFilteredBoard] = useState([]);

  useEffect(() => {
    dispatch(getBoards())
      .unwrap()
      .then(res => {
        const selectedBoard = res.find(board => board.name === boardName);

        if (!selectedBoard) {
          navigate('/404');
          return;
        }

        dispatch(getBoard(selectedBoard._id));
      });
  }, [boardName, dispatch, navigate]);

  useEffect(() => {
    if (currentBoard) {
      setFilteredBoard(getFilteredBoard(currentBoard, filter));
    }
  }, [currentBoard, filter]);

  const buttonLabel = currentBoard?.columns?.length
    ? 'Add another column'
    : 'Add column';

  return (
    <div className="container">
      <DashboardHeader />

      <div className={s.columnsContainer}>
        {filteredBoard.columns &&
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
  );
};

export default DashboardPage;
