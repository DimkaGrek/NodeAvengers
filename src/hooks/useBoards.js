import { useSelector } from 'react-redux';

import {
  selectBoards,
  selectCurrentBoard,
  selectIsError,
  selectIsLoading,
} from '../redux/boards/boardsSlice';

export const useBoards = () => {
  const boards = useSelector(selectBoards);
  const currentBoard = useSelector(selectCurrentBoard);
  const isLoadingBoards = useSelector(selectIsLoading);
  const error = useSelector(selectIsError);

  return {
    boards,
    currentBoard,
    isLoadingBoards,
    error,
  };
};
