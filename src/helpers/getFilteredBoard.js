export const getFilteredBoard = (board, filter) => {
  if (filter === 'Show all') return board;

  if (!board || !board.columns) return board;

  const filteredColumns = board.columns.map(column => {
    const filteredCards = column.cards.filter(card => card.priority === filter);
    return { ...column, cards: filteredCards };
  });

  return { ...board, columns: filteredColumns };
};
