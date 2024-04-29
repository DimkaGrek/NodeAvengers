import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { Loader, Button } from 'components';

import { deleteBoard } from '../../redux/boards/boardsOperations';
import { selectIsLoading } from '../../redux/boards/boardsSlice';

import s from './ConfirmDeleteBoard.module.css';

export const ConfirmDeleteBoard = ({ toggleModal, id }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleDelete = boardId => {
    dispatch(deleteBoard(boardId))
      .unwrap()
      .then(() => toggleModal())
      .catch(() =>
        toast.error('Something went wrong. Reload page or try again late!')
      );
  };

  return (
    <>
      <div className={s.wrapper}>
        <Button
          type="button"
          className="button"
          onClick={() => handleDelete(id)}
          disabled={isLoading}
        >
          Delete {isLoading && <Loader size={20} classTitle="insideButton" />}
        </Button>
        <Button type="button" className="button" onClick={toggleModal}>
          Cancel
        </Button>
      </div>
    </>
  );
};
