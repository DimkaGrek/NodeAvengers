import s from './DashboardPage.module.css';

import DashboardHeader from '../../components/DashboardHeader/DashboardHeader.jsx';
import CardsColumn from '../../components/CardsColumn/CardsColumn.jsx';
import Button from '../../components/Button/Button.jsx';

import { useEffect } from 'react';
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
import { getImages } from '../../helpers';
import { getBgUrls } from '../../helpers/getBgUrl';

const DashboardPage = () => {
  const [isAddColumnModal, toggleIsAddColumnModal] = useModal();

  const { boardName } = useParams();
  const currentBoard = useSelector(selectCurrentBoard);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('current Board?', currentBoard);

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

  const buttonLabel = currentBoard?.columns?.length
    ? 'Add another column'
    : 'Add column';

  const board = useSelector(selectCurrentBoard)?.backgroundImage;
  const bgImage = getImages().bg[board];
  const backgroundImage = getBgUrls(bgImage);

  return (
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
    </div>
  );
};

export default DashboardPage;
