import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import {
  Icon,
  Modal,
  EditBoardForm,
  NeedHelpForm,
  ConfirmDeleteBoard,
} from 'components';

import { useModal } from '../../hooks/useModal';
import { logoutThunk } from '../../redux/auth/operations';
import { selectRefreshToken } from '../../redux/auth/slice';
import {
  selectBoards,
  selectCurrentBoard,
} from '../../redux/boards/boardsSlice';
import { getBoards } from '../../redux/boards/boardsOperations';
import { getImages } from '../../helpers';

import s from './Sidebar.module.css';
import flower from '../../assets/images/flower.png';

export const Sidebar = ({ handleOpenModalSidebar }) => {
  const [deletedBoard, setDeletedBoard] = useState(null);

  const [isModalAddBoard, toggleIsModalAddBoard] = useModal();
  const [isModalEditBoard, toggleIsModalEditBoard] = useModal();
  const [isModalNeedHelp, toggleIsModalNeedHelp] = useModal();
  const [isModalConfirmDelete, toggleIsModalConfirmDelete] = useModal();

  const boards = useSelector(selectBoards);
  const currentBoard = useSelector(selectCurrentBoard);
  const refreshToken = useSelector(selectRefreshToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  useEffect(() => {
    currentBoard !== null
      ? navigate(`/home/${currentBoard.name}`)
      : navigate(`/home`);
  }, [currentBoard]);

  const handleDeleteBoard = board => {
    setDeletedBoard(board);
    toggleIsModalConfirmDelete();
  };

  const handleClickBoard = (e, { name }) => {
    if (handleOpenModalSidebar) {
      handleOpenModalSidebar();
    }

    navigate(`/home/${name}`);
  };

  const handleLogOut = () => {
    dispatch(logoutThunk({ refreshToken }))
      .unwrap()
      .then(() => navigate('/welcome'))
      .catch(() =>
        toast.error('Something went wrong. Reload page or try again late!')
      );
  };

  return (
    <>
      <div className={s.sideBarBlock}>
        <h1 className={s.titleHidden}>Task boards page</h1>
        <NavLink className={s.navLogo} to="/">
          <Icon id="logo" className={s.svgLightning} size={32} />
          <p className={s.title}>Task Pro</p>
        </NavLink>
        {/* <div className={s.section}> */}
        <h2 className={s.myBoardTitle}>My boards</h2>

        <div className={s.boardTitleBlock}>
          <p className={s.boardTitle}>Create a new board</p>
          <button
            className={s.buttonAdd}
            aria-label="add"
            type="button"
            onClick={toggleIsModalAddBoard}
          >
            <Icon id="plus" className={s.svgPlus} size={12} />
          </button>
        </div>

        <div className={s.mainBoard}>
          {boards && (
            <ul>
              {boards.map(board => (
                <li
                  onClick={e => handleClickBoard(e, board)}
                  key={board._id}
                  className={
                    board._id === currentBoard?._id
                      ? s.boardListItemActive
                      : s.boardListItem
                  }
                >
                  <div
                    className={
                      board._id === currentBoard?._id ? s.boardActive : s.board
                    }
                  >
                    <div className={s.titleBoard}>
                      <Icon
                        id={getImages().icons[board.icon]}
                        className={s.svgProject}
                        size={18}
                      />
                      <p className={s.boardName}>{board.name}</p>
                    </div>

                    {currentBoard?._id === board?._id && (
                      <div className={s.boardIcons}>
                        <button
                          className={s.buttonIcon}
                          type="button"
                          aria-label="edit"
                          onClick={e => {
                            e.stopPropagation();
                            toggleIsModalEditBoard();
                          }}
                        >
                          <Icon id="pencil" className={s.editIcon} size={16} />
                        </button>
                        <button
                          className={s.buttonIcon}
                          type="button"
                          aria-label="delete"
                          onClick={e => {
                            e.stopPropagation();
                            handleDeleteBoard(board);
                          }}
                        >
                          <Icon id="trash" className={s.editIcon} size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={s.needHelpBlock}>
          <img
            className={s.flower}
            src={flower}
            alt="flower"
            width={54}
            height={78}
          />
          <p className={s.helpContent}>
            If you need help with <span>TaskPro</span>, check out our support
            resources or reach out to our customer support team.
          </p>
          <button
            onClick={toggleIsModalNeedHelp}
            className={s.needHelpButton}
            type="button"
            name="help"
          >
            <Icon id="help-circle" className={s.svgHelp} size={20} />
            Need help?
          </button>
        </div>
        <button
          className={s.logoutBtn}
          type="button"
          name="logout"
          onClick={handleLogOut}
        >
          <Icon id="login" className={s.svgLogout} size={32} />
          Log out
        </button>
      </div>
      {isModalAddBoard && (
        <Modal toggleModal={toggleIsModalAddBoard} title="New board">
          <EditBoardForm
            handleOpenModalSidebar={handleOpenModalSidebar}
            toggleModal={toggleIsModalAddBoard}
          />
        </Modal>
      )}
      {isModalEditBoard && (
        <Modal toggleModal={toggleIsModalEditBoard} title="Edit board">
          <EditBoardForm
            handleOpenModalSidebar={handleOpenModalSidebar}
            board={currentBoard}
            toggleModal={toggleIsModalEditBoard}
          />
        </Modal>
      )}
      {isModalNeedHelp && (
        <Modal toggleModal={toggleIsModalNeedHelp} title="Need help">
          <NeedHelpForm
            board={currentBoard}
            toggleModal={toggleIsModalNeedHelp}
          />
        </Modal>
      )}
      {isModalConfirmDelete && (
        <Modal
          title={`Are you sure you want to delete ${deletedBoard.name}?`}
          toggleModal={toggleIsModalConfirmDelete}
          pad="35px"
        >
          <ConfirmDeleteBoard
            toggleModal={toggleIsModalConfirmDelete}
            id={deletedBoard._id}
          />
        </Modal>
      )}
    </>
  );
};
