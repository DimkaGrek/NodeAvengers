export const getColorByPriority = priority => {
  switch (priority) {
    case 'without':
      return 'rgba(255, 255, 255, 0.3)';
    case 'low':
      return '#8fa1d0';
    case 'medium':
      return '#e09cb5';
    case 'high':
      return '#bedbb0';
    default:
      return 'rgba(255, 255, 255, 0.3)';
  }
};
