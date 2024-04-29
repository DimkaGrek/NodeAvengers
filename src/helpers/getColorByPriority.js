export const getColorByPriority = priority => {
  switch (priority) {
    case 'without':
      return 'rgba(111, 105, 105, 0.3)';
    case 'low':
      return '#8fa1d0';
    case 'medium':
      return '#e09cb5';
    case 'high':
      return '#bedbb0';
    default:
      return 'rgba(111, 105, 105, 0.3)';
  }
};
