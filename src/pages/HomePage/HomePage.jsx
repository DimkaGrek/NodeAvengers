import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { EditBoardForm, Modal } from '../../components';

import { useModal } from '../../hooks/useModal';
import { getBoards } from '../../redux/boards/boardsOperations';
import { getThemesList } from '../../redux/themes/operations';
import { selectBoards } from '../../redux/boards/boardsSlice';

import s from './HomePage.module.css';

const HomePage = () => {
  const [isModalAddBoard, toggleIsModalAddBoard] = useModal();
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getThemesList());
    dispatch(getBoards())
      .unwrap()
      .catch(() =>
        toast.error('Something went wrong. Reload page or try again late!')
      );
    if (boards.length > 0) {
      navigate(`/home/${boards[0].name}`);
    }
  }, []);

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
        {isModalAddBoard && (
          <Modal toggleModal={toggleIsModalAddBoard} title="New board">
            <EditBoardForm toggleModal={toggleIsModalAddBoard} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default HomePage;
