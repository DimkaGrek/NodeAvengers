import { useState } from 'react';
import styles from './Tooltip.module.css';

const Tooltip = ({ text, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  let timeoutId;

  const handleMouseEnter = () => {
    setIsHovered(true);
    timeoutId = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    clearTimeout(timeoutId);
    setShowTooltip(false);
  };

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isHovered && showTooltip && <div className={styles.tooltip}>{text}</div>}
    </div>
  );
};

export default Tooltip;
