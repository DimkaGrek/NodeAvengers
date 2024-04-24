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
import { useModal } from '../../hooks/useModal.jsx';
import { Modal } from '../../components/Modal/Modal.jsx';
import { ColumnForm } from '../../components/ColumnForm/ColumnForm.jsx';
import { AddButton } from '../../components/AddButton/AddButton.jsx';
import { selectCurrentBoard } from '../../redux/boards/boardsSlice.js';
import { useSelector } from 'react-redux';
const DashboardPage = () => {
  const [isModal, toggleIsModal] = useModal();
  const [cardsColumns, setCardsColumns] = useState([]);
  const { boardName } = useParams();
  const currentBoard = useSelector(selectCurrentBoard);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(currentBoard);

  useEffect(() => {
    dispatch(getBoards())
      .unwrap()
      .then(res => {
        console.log(res);
        const selectedBoard = res.find(board => board.name === boardName);

        if (!selectedBoard) {
          navigate('/404');
          return;
        }

        dispatch(getBoard(selectedBoard._id));
      });
  }, [boardName, dispatch, navigate]);

  // const handleAddColumn = () => {
  //   setCardsColumns([
  //     ...cardsColumns,
  //     <CardsColumn key={currentBoard.columns} />,
  //   ]);
  // };

  const buttonLabel = cardsColumns.length ? 'Add another column' : 'Add column';

  return (
    <div className="container">
      <DashboardHeader />

      <div className={s.columnsContainer}>
        {currentBoard.columns &&
          currentBoard.columns.map(column => (
            <CardsColumn key={column._id} column={column} />
          ))}

        <Button
          className={s.addColBtn}
          type="button"
          onClick={() => toggleIsModal()}
        >
          <AddButton color="light" width={28} height={28} iconSize={14} />
          {buttonLabel}
        </Button>
      </div>

      <div>
        {isModal && (
          <Modal title={'Add column'} toggleModal={toggleIsModal}>
            <ColumnForm
              toggleModal={toggleIsModal}
              // handleAddColumn={handleAddColumn}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
