import { useDispatch, useSelector } from 'react-redux';
import { EditBoardForm } from '../../components/EditBoardForm/EditBoardForm';
import { Modal } from '../../components/Modal/Modal';
import { useModal } from '../../hooks/useModal';
import s from './HomePage.module.css';
import { useEffect } from 'react';
import { getBoards } from '../../redux/boards/boardsOperations';
import { selectBoards } from '../../redux/boards/boardsSlice';

const HomePage = () => {
  const [isModalAddBoard, toggleIsModalAddBoard] = useModal();
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  console.log(boards);

  return (
    <>
      <div className={s.pageWrapper}>
        <p className={s.text}>
          Before starting your project, it is essential{' '}
          <span className={s.highlightedText} onClick={toggleIsModalAddBoard}>
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
