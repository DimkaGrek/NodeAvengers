import { useDispatch, useSelector } from 'react-redux';
import { EditBoardForm } from '../../components/EditBoardForm/EditBoardForm';
import { Modal } from '../../components/Modal/Modal';
import { useModal } from '../../hooks/useModal';
import s from './HomePage.module.css';
import { useEffect } from 'react';
import { getBoards } from '../../redux/boards/boardsOperations';
import { selectCurrentBoard } from '../../redux/boards/boardsSlice';
import { getImages } from '../../helpers';
import { getBgUrls } from '../../helpers/getBgUrl';

const HomePage = () => {
  const board = useSelector(selectCurrentBoard)?.backgroundImage;
  const bgImage = getImages().bg[board];
  const backgroundImage = getBgUrls(bgImage);
  console.log(backgroundImage);

  const [isModalAddBoard, toggleIsModalAddBoard] = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  return (
    <>
      <div
        className={s.pageWrapper}
        style={{
          '--background-image-desk-1x': `url(${backgroundImage[0]})`,
          '--background-image-desk-2x': `url(${backgroundImage[1]})`,
          '--background-image-tab-1x': `url(${backgroundImage[2]})`,
          '--background-image-tab-2x': `url(${backgroundImage[3]})`,
          '--background-image-mob-1x': `url(${backgroundImage[4]})`,
          '--background-image-mob-2x': `url(${backgroundImage[5]})`,
        }}
      >
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
