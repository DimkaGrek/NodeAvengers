import s from './DashboardPage.module.css';

import DashboardHeader from '../../components/DashboardHeader/DashboardHeader.jsx';
import CardsColumn from '../../components/CardsColumn/CardsColumn.jsx';
import AddColumnButton from '../../components/AddColumnButton/AddColumnButton.jsx';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBoards } from '../../redux/boards/boardsOperations';
import { getBoard } from '../../redux/boards/boardsOperations';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [cardsColumns, setCardsColumns] = useState([]);
  const { boardName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleAddColumn = () => {
    setCardsColumns([
      ...cardsColumns,
      <CardsColumn key={cardsColumns.length} />,
    ]);
  };

  const buttonLabel = cardsColumns.length ? 'Add another column' : 'Add column';

  return (
    <div className="container">
      <DashboardHeader />

      <div className={s.columnsContainer}>
        {cardsColumns.map((column, index) => (
          <div key={index}>{column}</div>
        ))}

        <AddColumnButton
          handleAddColumn={handleAddColumn}
          buttonLabel={buttonLabel}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
