import { useDispatch, useSelector } from 'react-redux';
import { EditBoardForm } from '../../components/EditBoardForm/EditBoardForm';
import { Modal } from '../../components/Modal/Modal';
import { useModal } from '../../hooks/useModal';
import s from './HomePage.module.css';
import { useEffect } from 'react';
import { getBoard } from '../../redux/boards/boardsOperations';
import {
  selectBoards,
  selectCurrentBoard,
} from '../../redux/boards/boardsSlice';
import { editColumn } from '../../redux/boards/columnOperations';

const HomePage = () => {
  const [isModalAddBoard, toggleIsModalAddBoard] = useModal();
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);
  const board = useSelector(selectCurrentBoard);

  useEffect(() => {
    dispatch(getBoard('6625559774dcfbe4369d69d8'));
  }, [dispatch]);

  console.log(boards);
  console.log(board);

  const addCol = () => {
    dispatch(editColumn({ id: '662648226b4e684310677dd6', name: 'hollywood' }));
  };

  return (
    <>
      <div className={s.pageWrapper}>
        <p className={s.text}>
          Before starting your project, it is essential{' '}
          <span className={s.highlightedText} onClick={addCol}>
            to create a board
          </span>{' '}
          to visualize and track all the necessary tasks and milestones. This
          board serves as a powerful tool to organize the workflow and ensure
          effective collaboration among team members.
        </p>
      </div>
      {isModalAddBoard && (
        <Modal toggleModal={toggleIsModalAddBoard} title="New board">
          <EditBoardForm />
        </Modal>
      )}
    </>
  );
};

export default HomePage;
