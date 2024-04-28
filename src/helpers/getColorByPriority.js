export const getColorByPriority = priority => {
  switch (priority) {
    case 'without':
      return 'rgba(22, 22, 22, 0.3)';
    case 'low':
      return '#8fa1d0';
    case 'medium':
      return '#e09cb5';
    case 'high':
      return '#bedbb0';
    default:
      return 'rgba(22, 22, 22, 0.3)';
  }
};
