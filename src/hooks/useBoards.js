import { useSelector } from 'react-redux';

import {
  selectBoards,
  selectCurrentBoard,
  selectBoardsError,
  selectIsLoading,
} from '../redux/boards/boardsSlice';

export const useBoards = () => {
  const boards = useSelector(selectBoards);
  const currentBoard = useSelector(selectCurrentBoard);
  const isLoadingBoards = useSelector(selectIsLoading);
  const boardsError = useSelector(selectBoardsError);

  return {
    boards,
    currentBoard,
    isLoadingBoards,
    boardsError,
  };
};
